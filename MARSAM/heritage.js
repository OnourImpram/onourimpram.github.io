/** Progressive, local-only bibliography filters. No analytics or submitted personal data. */
const normalizeText=(value='')=>String(value).replace(/İ/g,'i').replace(/I/g,'i').toLocaleLowerCase('tr').replace(/ı/g,'i').normalize('NFD').replace(/\p{Diacritic}/gu,'').replace(/[\u0640\u064b-\u065f\u0670]/g,'').replace(/[أإآٱ]/g,'ا').replace(/ى/g,'ي');
const root=document.querySelector('[data-bibliography]');
if(root){
 const form=root.querySelector('[data-bib-form]'),q=root.querySelector('[data-bib-query]'),author=root.querySelector('[data-bib-author]'),year=root.querySelector('[data-bib-year]'),cards=[...root.querySelectorAll('[data-bib-record]')];
 const params=new URLSearchParams(location.search);
 q.value=(params.get('q')||'').slice(0,160);
 for(const [control,key]of [[author,'author'],[year,'year']])if([...control.options].some(o=>o.value===params.get(key)))control.value=params.get(key);
 function update(sync=false){
  const query=normalizeText(q.value.trim());let count=0;
  for(const card of cards){
   let names=[];try{names=JSON.parse(card.dataset.authors);}catch{}
   const show=(!query||card.dataset.search.includes(query))&&(!author.value||names.includes(author.value))&&(!year.value||card.dataset.year===year.value);
   card.hidden=!show;if(show)count++;
  }
  root.querySelector('[data-bib-count]').textContent=count+' '+root.dataset.resultsLabel;
  root.querySelector('[data-bib-empty]').hidden=count!==0;
  if(sync){const next=new URL(location.href);next.search='';if(q.value.trim())next.searchParams.set('q',q.value.trim());if(author.value)next.searchParams.set('author',author.value);if(year.value)next.searchParams.set('year',year.value);history.replaceState(null,'',next);}
 }
 form.addEventListener('input',()=>update(true));form.addEventListener('change',()=>update(true));form.addEventListener('submit',ev=>{ev.preventDefault();update(true);});form.addEventListener('reset',()=>{requestAnimationFrame(()=>update(true));});update();
}
