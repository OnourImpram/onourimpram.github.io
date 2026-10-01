/** Only the background changes. Reading/actions remain stationary and pausable. */
export const HERO_FIRST_DELAY=2200;
export const HERO_INTERVAL=3200;
export const HERO_FADE=600;
/** Do not blank the current scene or await a broken decode indefinitely. */
export async function decodeHeroFrame(getImage:()=>HTMLImageElement|null,timeout=5000):Promise<boolean>{
 const until=Date.now()+timeout;
 while(Date.now()<until){
  const image=getImage();if(!image)return false;
  if(image.complete&&image.naturalWidth>0){
   const source=image.currentSrc||image.src;let timer:ReturnType<typeof setTimeout>|undefined;
   try{
    const ready=await Promise.race([Promise.resolve(image.decode()).then(()=>true,()=>false),new Promise<boolean>(resolve=>{timer=setTimeout(()=>resolve(false),Math.max(0,until-Date.now()))})]);
    if(ready&&source===(image.currentSrc||image.src)&&image.naturalWidth>0)return true;
   }catch{}finally{if(timer!==undefined)clearTimeout(timer)}
  }
  if(Date.now()<until)await new Promise<void>(resolve=>setTimeout(resolve,Math.min(80,until-Date.now())));
 }
 return false;
}
