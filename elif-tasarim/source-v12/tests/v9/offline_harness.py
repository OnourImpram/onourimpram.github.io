"""Offline content tests using local sources, with no HTTP navigation."""
from pathlib import Path
import re,posixpath
ROOT=Path(__file__).resolve().parents[2]
IMPORT=re.compile(r'''(?:from\s*|import\s*)['"]([^'"]+)['"]''')
def inject_three(page):
    data={}
    base=ROOT/'public/three'
    for p in base.rglob('*'):
        if p.suffix not in ('.mjs','.js'):continue
        code=p.read_text(); deps={}
        for match in IMPORT.finditer(code):
            spec=match.group(1)
            if spec.startswith('.'):
                name=posixpath.normpath(str(p.relative_to(base).parent/spec))
                deps[spec]=name
        data[p.relative_to(base).as_posix()]={'code':code,'deps':deps}
    return page.evaluate('''async files => {
      const urls={},visiting=new Set();
      function load(key){if(urls[key])return urls[key];if(visiting.has(key))throw Error('Cycle '+key);visiting.add(key);const f=files[key];if(!f)throw Error('Missing '+key);let code=f.code;for(const [spec,path] of Object.entries(f.deps)){const url=load(path);code=code.split("'"+spec+"'").join("'"+url+"'").split('"'+spec+'"').join('"'+url+'"')}visiting.delete(key);return urls[key]=URL.createObjectURL(new Blob([code],{type:'text/javascript'}));}
      await import(load('desk-scene.mjs'));
      window.__ELIF_TEST_MODULE_URLS__=urls;
      return window.ElifDesk3D.revision;
    }''',data)
def prepare(page,route='/'):
    page.set_content((ROOT/'preview/Elif_Tasarim.html').read_text(),wait_until='load')
    inject_three(page)
    if route!='/': page.evaluate('(r)=>location.hash="#"+r',route)
    page.wait_for_timeout(700)
