from pathlib import Path
import os
root=Path('elif-tasarim/source-v12').resolve()
p=root/'tests/v20/acceptance.py'
s=p.read_text()
s=s.replace("errors=[];page.on('pageerror',lambda e:errors.append(str(e)))", "errors=[];console=[];page.on('console',lambda m:console.append({'type':m.type,'text':m.text}));page.on('pageerror',lambda e:errors.append(str(e)))")
anchor="inspect=lambda:page.evaluate(\"document.querySelector('.v8-canvas-host').__elif3D.inspect()\")"
extra='''
  page.evaluate("""()=>{
    const old=HTMLCanvasElement.prototype.toBlob;
    HTMLCanvasElement.prototype.toBlob=function(callback,...args){console.log('blob-start',this.width,this.height,document.hidden);return old.call(this,b=>{console.log('blob-end',b?.size,document.hidden);callback(b)},...args)};
    const api=document.querySelector('.v8-canvas-host').__elif3D,exp=api.exportModel;
    api.exportModel=async function(format){console.log('export-start',format,document.hidden,performance.now());try{const b=await exp(format);console.log('export-end',format,b.size,performance.now());return b}catch(e){console.error('export-error',format,String(e),e.stack);throw e}};
  }""")
'''
s=s.replace(anchor,anchor+extra)
s=s.replace("page.wait_for_selector('.v20-ar-link',timeout=120000)","page.wait_for_selector('.v20-ar-link',timeout=30000)")
s=s.replace("except Exception:\n  report['failure']", "except Exception:\n  report['console']=console\n  report['runtime']=page.evaluate(\"()=>({hidden:document.hidden,state:document.visibilityState,busy:[...document.querySelectorAll('.v20-export-buttons button')].map(x=>x.innerText),ar:[...document.querySelectorAll('.v20-ar-link')].map(x=>({href:x.href,display:getComputedStyle(x).display})),status:document.querySelector('.v20-workbench-status')?.innerText})\")\n  report['failure']")
s=s.replace("finally:browser.close()", "finally:\n  (O/'console.json').write_text(json.dumps(console,ensure_ascii=False,indent=2));browser.close()")
os.chdir(root)
exec(compile(s,str(p),'exec'),{'__file__':str(p),'__name__':'__main__'})
