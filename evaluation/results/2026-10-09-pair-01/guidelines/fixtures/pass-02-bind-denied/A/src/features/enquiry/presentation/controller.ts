import { formCopy } from './copy';
import type { Outcome } from '../domain/index';
const form=document.querySelector<HTMLFormElement>('[data-enquiry]');
if(form){
 const locale=form.dataset.locale==='pl'?'pl':'en';const t=formCopy[locale];const button=form.querySelector<HTMLButtonElement>('[data-submit]')!;const newButton=form.querySelector<HTMLButtonElement>('[data-new]')!;const status=form.querySelector<HTMLElement>('.form-status')!;
 button.disabled=false;
 let active:AbortController|undefined;let generation=0;let id:string|undefined;let original:string|undefined;let uncertain=false;let firstAttempt=0;let cooldown=0;
 const params=new URLSearchParams(location.search);for(const [name,allowed] of [['intent',['investment','partnership','demo','general']],['project',['artisense','aifield']]] as const){const value=params.get(name);if(value&&allowed.includes(value as never))(form.elements.namedItem(name) as HTMLSelectElement).value=value;}
 function report(state:string,message:string,focus=true){status.hidden=false;status.dataset.state=state;status.textContent=message;if(focus)status.focus();}
 function fieldError(name:string,message:string){const input=form!.elements.namedItem(name) as HTMLElement|null;input?.setAttribute('aria-invalid','true');const error=form!.querySelector<HTMLElement>(`#${name}-error`);if(error)error.textContent=message;}
 newButton.addEventListener('click',()=>{generation++;active?.abort();active=undefined;id=undefined;original=undefined;uncertain=false;firstAttempt=0;form.reset();status.hidden=true;newButton.hidden=true;button.disabled=false;button.textContent=t.send;(form.elements.namedItem('intent') as HTMLElement).focus();});
 form.addEventListener('submit',async event=>{
 event.preventDefault();if(active)return;if(Date.now()<cooldown){report('throttled',t.throttled);return;}
 for(const item of form.querySelectorAll('[aria-invalid]'))item.removeAttribute('aria-invalid');for(const error of form.querySelectorAll('.field-error'))error.textContent='';
 const data=new FormData(form);const values={intent:String(data.get('intent')),email:String(data.get('email')).trim(),message:String(data.get('message')).trim(),...(data.get('project')?{project:String(data.get('project'))}:{}),name:String(data.get('name')).trim(),organization:String(data.get('organization')).trim(),locale,website:String(data.get('website')||'')};
 let invalid=false;if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)||values.email.length>254){fieldError('email',t.invalidEmail);invalid=true;}if(Array.from(values.message).length<20||Array.from(values.message).length>5000){fieldError('message',t.invalidMessage);invalid=true;}for(const [key,max] of [['name',100],['organization',150]] as const)if(Array.from(values[key]).length>max){fieldError(key,t.required);invalid=true;}
 if(invalid){report('rejected',t.rejected);return;}
 const payload=JSON.stringify(values);if(uncertain&&payload!==original){report('conflict',t.conflict);return;}
 if(uncertain&&Date.now()-firstAttempt>=23*60*60*1000){report('unavailable',t.expired);button.disabled=true;return;}
 if(!id||(!uncertain&&payload!==original)){id=crypto.randomUUID();firstAttempt=Date.now();}original=payload;
 const request=JSON.stringify({...values,submissionId:id});const controller=new AbortController();active=controller;const current=++generation;button.disabled=true;report('submitting',t.sending,false);button.textContent=t.sending;
 const timer=setTimeout(()=>controller.abort(),12000);
 try{const response=await fetch('/api/enquiries',{method:'POST',headers:{'Content-Type':'application/json'},body:request,signal:controller.signal});const result=await response.json() as Outcome;if(current!==generation)return;
 if(result.status==='accepted'&&result.receiptId){uncertain=false;report('accepted',result.mode==='fixture'?t.accepted:t.provider);newButton.hidden=false;button.disabled=true;form.dataset.receipt=result.receiptId;}
 else {uncertain=['uncertain','pending','conflict'].includes(result.status);if(result.status==='rejected')for(const field of Object.keys(result.errors||{}))fieldError(field,field==='email'?t.invalidEmail:field==='message'?t.invalidMessage:t.required);if(result.status==='throttled')cooldown=Date.now()+(result.retryAfter||60)*1000;report(result.status,t[result.status as keyof typeof t]||t.uncertain);}
 }catch{if(current===generation){uncertain=true;report('uncertain',t.uncertain);}}
 finally{clearTimeout(timer);if(current===generation){active=undefined;if(status.dataset.state!=='accepted')button.disabled=false;button.textContent=t.send;}}
 });
 window.addEventListener('pagehide',()=>{const inFlight=!!active;generation++;active?.abort();active=undefined;if(inFlight){uncertain=true;button.disabled=false;button.textContent=t.send;report('uncertain',t.uncertain,false);}});
}
