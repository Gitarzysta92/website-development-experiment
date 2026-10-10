import {test,expect} from '@playwright/test';
test('no-JS contact form remains disabled and email available',async({browser},info)=>{test.skip(info.project.name!=='chromium');const context=await browser.newContext({javaScriptEnabled:false,baseURL:'http://127.0.0.1:4321'});const page=await context.newPage();await page.goto('/pl/kontakt/');await page.screenshot({path:'artifacts/screenshots/nojs-diagnostic.png',fullPage:true});await expect(page.locator('[data-submit]')).toBeDisabled();await context.close();});

test('mobile navigation does not shift content when scripts initialize',async({page},info)=>{
 test.skip(info.project.name!=='chromium');let release!:()=>void;const gate=new Promise<void>(resolve=>{release=resolve;});
 await page.route('**/_astro/*.js',async route=>{await gate;await route.continue();});
 await page.setViewportSize({width:390,height:844});
 try{await page.goto('/pl/',{waitUntil:'commit'});await expect(page.locator('h1')).toBeVisible();const initial=await page.locator('main').boundingBox();await expect(page.locator('#global-navigation')).toBeHidden();release();await expect(page.locator('[data-header]')).toHaveAttribute('data-enhanced','');expect((await page.locator('main').boundingBox())!.y).toBe(initial!.y);}finally{release();}
});
