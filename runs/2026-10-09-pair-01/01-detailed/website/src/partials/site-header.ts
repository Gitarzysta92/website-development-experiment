const header=document.querySelector<HTMLElement>('[data-header]');
if(header){
 const button=header.querySelector<HTMLButtonElement>('[data-menu]')!;
 const details=header.querySelector<HTMLDetailsElement>('details')!;
 const media=matchMedia('(max-width:72rem)');
 header.dataset.enhanced='';
 function close(returnFocus=false){delete header!.dataset.open;button.setAttribute('aria-expanded','false');details.open=false;if(returnFocus)button.focus();}
 button.addEventListener('click',()=>{if(header.hasAttribute('data-open'))close();else{header.dataset.open='';button.setAttribute('aria-expanded','true');}});
 header.addEventListener('keydown',event=>{if(event.key==='Escape'){if(details.open){details.open=false;details.querySelector('summary')?.focus();}else if(header.hasAttribute('data-open'))close(true);}});
 media.addEventListener('change',()=>{const inside=header.contains(document.activeElement);close(inside&&media.matches);});
 document.addEventListener('click',event=>{if(!header.contains(event.target as Node))details.open=false;});
 const language=header.querySelector<HTMLAnchorElement>('[data-language]');
 function updateLanguage(){if(language){const href=new URL(language.href);const hash=location.hash.slice(1);href.hash=language.dataset.sections?.split(',').includes(hash)?hash:'';language.href=href.href;}}
 updateLanguage();window.addEventListener('hashchange',updateLanguage);
}
