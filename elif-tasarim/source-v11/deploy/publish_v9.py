#!/usr/bin/env python3
"""Guarded local publication helper. Requires your normal Git authentication.
No credentials are read from files, embedded in arguments, or printed.
Default mode verifies the package only. --publish is an explicit write request.
"""
from __future__ import annotations
import argparse,hashlib,json,shutil,subprocess,sys,tempfile
from datetime import datetime,timezone
from pathlib import Path,PurePosixPath

PACKAGE=Path(__file__).resolve().parents[1]
EXPECTED_MAIN='2b9ee083f56cd59eca049c627be7e79f40680c91'
ROOT_BLOB='501229ef0c1d25dbc4554e27ca089b03e590c7e0'
ALLOWED_REPOSITORY='onourimpram/onourimpram.github.io'


def git(repo:Path,*args:str)->str:
    return subprocess.check_output(['git','-C',str(repo),*args],text=True,stderr=subprocess.STDOUT).strip()


def safe_relative(name:str)->PurePosixPath:
    p=PurePosixPath(name)
    if p.is_absolute() or not p.parts or '..' in p.parts or '\\' in name or ':' in name:
        raise ValueError(f'Unsafe package path {name!r}')
    return p


def verify_package(root:Path)->dict:
    dist=root/'dist';manifest=json.loads((dist/'release-v9.json').read_text(encoding='utf-8'))
    if manifest.get('release')!='v9-dual-shelf-atelier' or manifest.get('indexable') is not False:
        raise ValueError('Unexpected release or indexing configuration')
    for name,expected in manifest['files'].items():
        p=dist.joinpath(*safe_relative(name).parts)
        if p.is_symlink() or not p.is_file():raise ValueError(f'Invalid publication file {name}')
        data=p.read_bytes()
        if len(data)!=expected['bytes'] or hashlib.sha256(data).hexdigest()!=expected['sha256']:
            raise ValueError(f'Publication checksum mismatch {name}')
    return manifest


def validate_remote(value:str)->None:
    remote=value.lower().strip().removesuffix('.git')
    allowed={'https://github.com/'+ALLOWED_REPOSITORY,'git@github.com:'+ALLOWED_REPOSITORY,'ssh://git@github.com/'+ALLOWED_REPOSITORY}
    if remote not in allowed:raise ValueError('Origin must be the specified OnourImpram GitHub repository')


def publish(repo:Path,package:Path)->str:
    manifest=verify_package(package)
    repo=repo.resolve(strict=True)
    if Path(git(repo,'rev-parse','--show-toplevel')).resolve()!=repo:
        raise ValueError('--repo must identify the repository root')
    validate_remote(git(repo,'remote','get-url','origin'))
    if git(repo,'status','--porcelain'):
        raise ValueError('Working tree is not clean. No files were changed.')
    git(repo,'fetch','--no-tags','origin','main')
    if git(repo,'rev-parse','origin/main')!=EXPECTED_MAIN:
        raise ValueError('Remote main changed after the approved V8 baseline. Review the newer work before proceeding.')
    if git(repo,'hash-object','index.html')!=ROOT_BLOB:
        raise ValueError('Personal homepage differs from the protected baseline')
    target=repo/'elif-tasarim'
    if target.is_symlink() or any(p.is_symlink() for p in target.rglob('*')):
        raise ValueError('The target contains a symlink. No files were changed.')
    branch='elif-v9-release-'+datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')
    git(repo,'switch','-c',branch,'origin/main')
    temporary=Path(tempfile.mkdtemp(prefix='.elif-v9-staging-',dir=repo))
    try:
        shutil.copytree(package/'dist',temporary,dirs_exist_ok=True)
        source=temporary/'source-v9';source.mkdir()
        for name in ['src','public','tools','tests','docs','deploy']:
            if (package/name).is_dir():
                shutil.copytree(package/name,source/name,ignore=shutil.ignore_patterns('__pycache__','*.pyc','node_modules','*.woff','*.woff2','*.ttf','*.otf'))
        for name in ['package.json','package-lock.json','README.md']:
            if (package/name).is_file():shutil.copy2(package/name,source/name)
        if target.exists():shutil.rmtree(target)
        temporary.replace(target)
        if git(repo,'hash-object','index.html')!=ROOT_BLOB:
            raise ValueError('Personal homepage check failed before staging')
        git(repo,'add','--','elif-tasarim')
        paths=git(repo,'diff','--cached','--name-only').splitlines()
        if not paths or any(not p.startswith('elif-tasarim/') for p in paths):
            raise ValueError('Only the Elif subtree may be included in this release')
        git(repo,'commit','-m','release(elif): V9 dual-sided Three.js atelier and editorial refinement')
        commit=git(repo,'rev-parse','HEAD')
        # Never use --force. A concurrent remote update causes this push to fail safely.
        git(repo,'push','origin','HEAD:refs/heads/main')
        print('Git push completed. Commit:',commit)
        print('This is not yet proof that GitHub Pages has finished deployment.')
        print('Check the public release-v9.json and the Three.js studio before announcing the release.')
        print('Expected manifest entries:',len(manifest['files']))
        return commit
    finally:
        if temporary.exists():shutil.rmtree(temporary)


def main()->int:
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--repo',type=Path);parser.add_argument('--publish',action='store_true');parser.add_argument('--check-only',action='store_true');args=parser.parse_args()
    try:
        manifest=verify_package(PACKAGE);print('Verified publication files:',len(manifest['files']))
        if not args.publish or args.check_only:
            print('Check only. No repository or public site was changed.');return 0
        if args.repo is None:parser.error('--repo is required with --publish')
        publish(args.repo,PACKAGE);return 0
    except (ValueError,OSError,subprocess.CalledProcessError) as exc:
        print('Stopped:',exc,file=sys.stderr);return 1

if __name__=='__main__':raise SystemExit(main())
