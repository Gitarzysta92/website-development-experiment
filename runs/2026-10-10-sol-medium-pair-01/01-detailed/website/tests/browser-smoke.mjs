import {chromium,firefox,webkit} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs';
import register from '../../compiled/routes.json' with {type:'json'};
const base='http://127.0.0.1:4321';
const findings=[];const browsers=[];
for(const [name,engine] of [['chromium',chromium],['firefox',firefox],['webkit',webkit]]){
 let browser;try{browser=await engine.launch({headless:true});browsers.push(`${name} ${browser.version()}`)}catch(e){findings.push(`${name} unavailable: ${e.message.slice(0,200)}`);continue}
 const context=await browser.newContext({viewport:{width:1440,height:900}});const page=await context.newPage();
 const ids=name==='chromium'?register.routes.map(r=>r.id):['home','artisense-technology','contact'];
 for(const id of ids){const r=register.routes.find(x=>x.id===id);for(const locale of ['en','pl']){
  const url=r.paths[locale];const resp=await page.goto(base+url);if(resp?.status()!==200)findings.push(`${name} ${url} status ${resp?.status()}`);
  const lang=await page.locator('html').getAttribute('lang');if(lang!==locale)findings.push(`${url} lang ${lang}`);
  if(await page.locator('h1').count()!==1)findings.push(`${url} h1 count`);
  if(name==='chromium'){
   const hrefs=await page.locator('a[href^="/"]').evaluateAll(a=>a.map(x=>x.getAttribute('href')));
   for(const href of hrefs){const path=href.split('?')[0].split('#')[0];if(!register.routes.some(x=>x.paths.en===path||x.paths.pl===path)&&path!=='/favicon.svg')findings.push(`${url} unknown href ${href}`)}
   const serious=(await new AxeBuilder({page}).analyze()).violations.filter(v=>['serious','critical'].includes(v.impact));if(serious.length)findings.push(`${url} axe ${serious.map(x=>x.id).join(',')}`);
  }
 }}
 if(name==='chromium'){
  for(const [width,height,url,shot] of [[1440,900,'/en/','home-wide.png'],[390,844,'/pl/','home-mobile.png'],[1440,900,'/en/projects/artisense/technology/','technology-wide.png'],[390,844,'/pl/projekty/aifield/badania-modeli-pola/','neural-mobile.png'],[390,844,'/pl/kontakt/','contact-mobile.png'],[320,568,'/pl/kontakt/','contact-small.png']]){
   await page.setViewportSize({width,height});await page.goto(base+url);const scroll=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth}));if(scroll.scroll>scroll.client+1)findings.push(`${url} ${width}px overflow ${JSON.stringify(scroll)}`);await page.screenshot({path:`artifacts/${shot}`,fullPage:true});
  }
  await page.setViewportSize({width:390,height:844});await page.goto(base+'/en/contact/?intent=partnership&project=artisense');
  if(await page.locator('#intent').inputValue()!=='partnership'||await page.locator('#project').inputValue()!=='artisense')findings.push('context preselection');
  await page.locator('#email').fill('synthetic@example.com');await page.locator('#message').fill('This is a browser synthetic test enquiry.');await page.locator('#submit-enquiry').click();await page.locator('#form-status').getByText('Test enquiry received locally. No email was sent.').waitFor({timeout:10000}).catch(async()=>findings.push(`form result ${await page.locator('#form-status').textContent()}`));
  await page.goto(base+'/pl/');await page.locator('.menu-toggle').click();if(await page.locator('.menu-toggle').getAttribute('aria-expanded')!=='true')findings.push('mobile menu open');await page.keyboard.press('Escape');if(await page.locator('.menu-toggle').getAttribute('aria-expanded')!=='false')findings.push('mobile menu escape');
 }
 await browser.close();
}
fs.writeFileSync('artifacts/browser-smoke.json',JSON.stringify({browsers,findings,at:new Date().toISOString()},null,2));
console.log(JSON.stringify({browsers,findings},null,2));if(findings.length)process.exitCode=1;
