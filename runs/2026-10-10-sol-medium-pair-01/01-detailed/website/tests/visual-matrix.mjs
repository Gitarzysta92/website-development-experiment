import {chromium} from '@playwright/test';import fs from 'node:fs';import register from '../../compiled/routes.json' with {type:'json'};
const browser=await chromium.launch();const page=await browser.newPage();const findings=[];fs.mkdirSync('artifacts/pages',{recursive:true});
for(const r of register.routes)for(const [locale,width,height,shot] of [['en',1440,900,true],['pl',390,844,true],['pl',320,568,false],['pl',844,390,false]]){
 await page.setViewportSize({width,height});await page.goto('http://127.0.0.1:4321'+r.paths[locale]);const x=await page.evaluate(()=>[document.documentElement.scrollWidth,document.documentElement.clientWidth]);if(x[0]>x[1]+1)findings.push(`${r.id}/${locale} ${width} overflow ${x}`);if(shot)await page.screenshot({path:`artifacts/pages/${r.id}-${locale}-${width}.png`});
}
await browser.close();fs.writeFileSync('artifacts/visual-matrix.json',JSON.stringify({conditions:'17 EN wide; 17 PL narrow/small/short',findings},null,2));console.log(`68 viewport checks; ${findings.length} findings`);if(findings.length){console.log(findings);process.exitCode=1}
