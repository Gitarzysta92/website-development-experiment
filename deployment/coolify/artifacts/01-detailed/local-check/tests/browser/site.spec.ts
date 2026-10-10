import {test,expect,type Page} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {routes,routeFor,type Locale,legacyAnchors} from '../../src/navigation/index';
async function sendLocal(page:Page,locale:Locale){
 await page.locator('#email').fill('acceptance@example.test');
 await page.locator('#message').fill('Synthetic local acceptance journey; no external delivery requested.');
 await page.locator('[data-submit]').click();
 await expect(page.locator('.form-status')).toHaveAttribute('data-state','accepted');
 await expect(page.locator('.form-status')).toContainText(locale==='en'?'No email was sent.':'Nie wysłano e-maila.');
 const receipt=await page.locator('form').getAttribute('data-receipt');
 await expect.poll(()=>JSON.parse(readFileSync('artifacts/receipts.json','utf8')).some((r:{receiptId:string})=>r.receiptId===receipt)).toBe(true);
}
for(const locale of ['en','pl'] as const){
 test(`CP-AIFIELD complete branch ${locale}`,async({page},info)=>{
  test.skip(info.project.name!=='chromium');
  await page.goto(routeFor('aifield',locale));
  for(const id of ['aifield-design','aifield-ai','aifield-neural','aifield-validation'] as const){
   await page.locator(`#project-links a[href="${routeFor(id,locale)}"]`).click();
   await expect(page.locator('#project-links a[aria-current]')).toHaveAttribute('href',routeFor(id,locale));
   await expect(page.locator('.project-context')).toContainText('AIFIELD');
  }
  await page.locator(`main a[href="${routeFor('artisense-validation',locale)}"]`).first().click();
  await page.locator(`main a[href="${routeFor('aifield-validation',locale)}"]`).first().click();
  await page.locator('main .button').last().click();
  await expect(page.locator('#intent')).toHaveValue('demo');
  await expect(page.locator('#project')).toHaveValue('aifield');
  await page.locator('#intent').selectOption('general');
  await expect(page.locator('#intent')).toHaveValue('general');
 });
 test(`CP-COMPANY investor and partner receipts ${locale}`,async({page},info)=>{
  test.skip(info.project.name!=='chromium');
  await page.goto(routeFor('home',locale));
  await page.locator(`main a[href="${routeFor('investors',locale)}"]`).first().click();
  await page.locator(`main a[href="${routeFor('artisense',locale)}"]`).first().click();
  await page.locator(`#project-links a[href="${routeFor('artisense-validation',locale)}"]`).click();
  await page.locator('main .button').last().click();
  await expect(page.locator('#intent')).toHaveValue('investment');
  await expect(page.locator('#project')).toHaveValue('artisense');
  await sendLocal(page,locale);
  await page.goto(routeFor('aifield-design',locale));
  await page.locator(`main a[href="${routeFor('aifield-validation',locale)}"]`).first().click();
  await page.locator(`main a[href="${routeFor('partnerships',locale)}"]`).first().click();
  await page.locator('main .button').last().click();
  await expect(page.locator('#intent')).toHaveValue('partnership');
  await page.locator('#project').selectOption('aifield');
  await sendLocal(page,locale);
 });
}
test('critical demo receipt journey across browsers',async({page,browser},info)=>{
 writeFileSync(`artifacts/browser-version-${info.project.name}.json`,JSON.stringify({browser:info.project.name,version:browser.version(),platform:process.platform,arch:process.arch},null,2));
 await page.goto('/en/projects/aifield/');
 await page.locator('#project-links a[href="/en/projects/aifield/design-simulation/"]').click();
 await page.locator('main a[href="/en/projects/aifield/examples-validation/"]').first().click();
 await page.locator('main .button').last().click();
 await expect(page.locator('#intent')).toHaveValue('demo');
 await sendLocal(page,'en');
});
test('recovery actual 308 404 headers and historic fragments',async({page,request},info)=>{
 test.skip(info.project.name!=='chromium');
 const registry=JSON.parse(readFileSync('content/shared/routes.json','utf8'));
 for(const [from,to] of Object.entries(registry.redirects)){
  const response=await request.get(from+'?intent=general',{maxRedirects:0});
  expect(response.status()).toBe(308);expect(response.headers().location).toBe(to+'?intent=general');
  expect((await request.get(response.headers().location,{maxRedirects:0})).status()).toBe(200);
 }
 for(const locale of ['en','pl'] as const){
  await page.setViewportSize({width:390,height:844});
  const response=await page.goto(`/${locale}/not-a-page-%3Cscript%3E/`);
  expect(response?.status()).toBe(404);await expect(page.locator('html')).toHaveAttribute('lang',locale);
  expect(await page.locator('link[rel=canonical]').count()).toBe(0);
  await expect(page.locator('h1')).toHaveText(locale==='pl'?'Nie znaleziono tej strony.':'This page could not be found.');
  for(const id of ['home','projects','contact'] as const)await expect(page.locator(`main a[href="${routeFor(id,locale)}"]`)).toBeVisible();
  expect((await new AxeBuilder({page}).analyze()).violations.filter(v=>['serious','critical'].includes(v.impact||''))).toEqual([]);
  await page.screenshot({path:`artifacts/screenshots/${locale}-404-390.png`,fullPage:true});
 }
 await page.setViewportSize({width:1440,height:900});
 for(const anchor of legacyAnchors){
  await page.goto(`/artisense-module/#${anchor}`);
  await expect(page).toHaveURL(new RegExp(`/pl/projekty/artisense/#${anchor}$`));
  const target=page.locator('#'+anchor);await expect(target).toBeVisible();
  await expect.poll(async()=>{const box=await target.boundingBox();const header=await page.locator('[data-header]').boundingBox();return box!.y>=header!.y+header!.height-1 && box!.y<900;}).toBe(true);
 }
 const headers=(await request.get('/en/')).headers();expect(headers['cache-control']).toBe('no-store');expect(headers['x-robots-tag']).toContain('noindex');expect(headers['content-security-policy']).toContain("frame-ancestors 'none'");expect(headers['x-content-type-options']).toBe('nosniff');
 for(const path of ['/inputs/','/compiled/','/knowledge/','/content/','/docs/','/.env','/checks-components/en/'])expect((await request.get(path)).status()).toBe(404);
 expect((await request.get('/en/',{headers:{Host:'attacker.example'}})).status()).toBe(403);
 const api=await request.get('/api/enquiries');expect(api.status()).toBe(405);expect(api.headers()['cache-control']).toBe('no-store');
 const staticUrl=await page.locator('script[src]').first().getAttribute('src');expect((await request.get(staticUrl!)).headers()['cache-control']).toContain('immutable');
});
test('all actual links assets locale sections and incoming hierarchy',async({page,request},info)=>{
 test.skip(info.project.name!=='chromium');
 const checked=new Set<string>();const incoming=new Map<string,number>();
 for(const route of routes)for(const locale of ['en','pl'] as const){
  const path=route.paths[locale];await page.goto(path);
  const alternate=await page.locator('[data-language]').getAttribute('href');expect(new URL(alternate!,'http://127.0.0.1:4321').pathname).toBe(route.paths[locale==='en'?'pl':'en']);
  const links=await page.locator('a[href],img[src],script[src],link[rel=stylesheet]').evaluateAll(nodes=>nodes.map(el=>el.getAttribute('href')||el.getAttribute('src')||''));
  for(const link of links){if(!link.startsWith('/'))continue;const url=new URL(link,'http://127.0.0.1:4321');incoming.set(url.pathname,(incoming.get(url.pathname)||0)+1);if(checked.has(link))continue;checked.add(link);const response=await request.get(url.pathname+url.search);expect(response.status(),link).toBe(200);if(url.hash){const body=await response.text();expect(body).toContain(`id="${url.hash.slice(1)}"`);}}
 }
 for(const route of routes)for(const path of Object.values(route.paths))expect(incoming.get(path)||0,path).toBeGreaterThan(0);
 await page.goto('/en/projects/aifield/neural-field-research/#boundaries');await page.locator('[data-language]').click();await expect(page).toHaveURL(/\/pl\/projekty\/aifield\/badania-modeli-pola\/#boundaries$/);await page.goBack();await page.reload();await expect(page).toHaveURL(/#boundaries$/);
 const popup=page.context().waitForEvent('page');await page.locator('main a[href="/en/projects/aifield/design-simulation/"]').first().click({button:'middle'});const tab=await popup;await tab.waitForLoadState();await expect(tab.locator('h1')).toContainText('Connect the structure');await tab.close();
 mkdirSync('artifacts',{recursive:true});writeFileSync('artifacts/link-check.json',JSON.stringify({routes:34,checked:[...checked],incoming:Object.fromEntries(incoming)},null,2));
});
test('company detail text reflow touch and warm fallback',async({page,browser},info)=>{
 test.skip(info.project.name!=='chromium');
 for(const path of ['/pl/inwestorzy/','/pl/projekty/aifield/badania-modeli-pola/']){
  await page.setViewportSize({width:1280,height:900});await page.goto(path);
  await page.evaluate(()=>{for(const el of document.querySelectorAll<HTMLElement>('p,a,button,h1,h2,h3,strong,summary'))el.style.fontSize=(parseFloat(getComputedStyle(el).fontSize)*2)+'px';});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.goto(path);await page.setViewportSize({width:320,height:225});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 }
 const touch=await browser.newContext({hasTouch:true,viewport:{width:390,height:844},baseURL:'http://127.0.0.1:4321'});const p=await touch.newPage();await p.goto('/pl/projekty/aifield/badania-modeli-pola/');await p.locator('[data-menu]').tap();await expect(p.locator('[data-menu]')).toHaveAttribute('aria-expanded','true');await p.keyboard.press('Escape');await p.locator('[data-project-toggle]').tap();await expect(p.locator('#project-links a[aria-current]')).toBeVisible();await p.screenshot({path:'artifacts/screenshots/touch-project-menu.png'});await touch.close();
 await page.setViewportSize({width:1440,height:900});await page.goto('/en/');await page.reload();const warm=await page.evaluate(()=>performance.getEntriesByType('resource').map((r:any)=>({name:r.name,transfer:r.transferSize,duration:r.duration})));writeFileSync('artifacts/resources/warm-home.json',JSON.stringify(warm,null,2));
 await page.route('**/*',route=>['image','font'].includes(route.request().resourceType())?route.abort():route.continue());await page.goto('/en/');await expect(page.locator('h1')).toBeVisible();expect(await page.locator('main [role=img]').count()).toBeGreaterThan(0);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
