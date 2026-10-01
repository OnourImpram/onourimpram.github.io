from pathlib import Path
import subprocess,json
r=Path.cwd();patch=Path('../../.github/elif-hero');baseline='026d7bda0e324c90b9c79a95ece6dbae1744ef15'
for name in ['src/pages/Home.tsx','tools/build-v23.cjs','tests/seo/contracts.cjs','package.json','package-lock.json']:
 assert (r/name).read_bytes()==subprocess.check_output(['git','show',baseline+':elif-tasarim/source-v12/'+name]),('Source changed',name)
p=r/'src/pages/Home.tsx';s=p.read_text();a=s.index('export class Home');b=s.index(' render(){',a);s=s[:a]+(patch/'controller.txt').read_text()+s[b:];a=s.index(' <section className="v6-hero v232-carousel"');b=s.index('\n <section id="bitirdigimiz-isler"',a);s=s[:a]+(patch/'section.txt').read_text()+s[b:];p.write_text(s)
p=r/'tools/build-v23.cjs';s=p.read_text().replace("'src/seo.css']","'src/seo.css','src/hero-refinement.css']").replace('v23.3-seo-content','v23.4-hero-discovery').replace("baseline:'72923f20ee73011178b57fe1703b841e997ec562'","baseline:'026d7bda0e324c90b9c79a95ece6dbae1744ef15'");p.write_text(s)
for name in ['package.json','package-lock.json']:
 p=r/name;s=p.read_text().replace('0.23.3','0.23.4')
 if name=='package.json':
  v=json.loads(s);v['scripts']['test']+=' tests/hero/*.cjs';s=json.dumps(v,ensure_ascii=False,indent=2)+'\n'
 p.write_text(s)
for p in (r/'tests').rglob('*'):
 if p.is_file() and p.suffix in ['.cjs','.py','.mjs']:p.write_text(p.read_text().replace('0.23.3','0.23.4').replace('v23.3-seo-content','v23.4-hero-discovery'))
p=r/'tests/seo/contracts.cjs';s=p.read_text().replace('global.window={clearInterval(){},setInterval(){return 1}}','global.window={clearInterval(){},setInterval(){return 1},clearTimeout(){},setTimeout(){return 1}}');p.write_text(s)
