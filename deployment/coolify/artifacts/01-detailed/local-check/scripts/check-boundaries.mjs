import { readdirSync, readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
export function files(dir) {return readdirSync(dir,{withFileTypes:true}).flatMap(x=>x.isDirectory()?files(path.join(dir,x.name)):[path.join(dir,x.name)]);}
const errors=[]; const graph=new Map();
for(const file of files('src').filter(f=>/\.(ts|astro|mjs)$/.test(f))){
 const text=readFileSync(file,'utf8'); const dependencies=[];
 for(const match of text.matchAll(/(?:from\s*|import\s*)['"]([^'"]+)['"]/g)){
  const dep=match[1];
  if(file.includes('/domain/') && /astro|server|presentation|application|node:/.test(dep))errors.push(`${file}: impure domain import ${dep}`);
  if((file.includes('/presentation/') || file.includes('/components/ui/')) && /config\/server|\/server|content\//.test(dep))errors.push(`${file}: forbidden browser/UI dependency ${dep}`);
  if(dep.startsWith('.')){const base=path.normalize(path.join(path.dirname(file),dep));const target=[base,base+'.ts',base+'.astro',base+'/index.ts'].find(existsSync);if(target)dependencies.push(target);}
 }
 graph.set(file,dependencies);
}
function walk(f,trail=[]){if(trail.includes(f)){errors.push(`Cycle: ${[...trail,f].join(' -> ')}`);return;} for(const dep of graph.get(f)||[])walk(dep,[...trail,f]);}
for(const f of graph.keys())walk(f);
const output=process.env.CHECK_OUTPUT||'dist/client';
if(existsSync(output))for(const f of files(output).filter(f=>/\.(js|json|html|map)$/.test(f)))if(/RESEND_API_KEY|sourceReferences|approvalEvidence|privateNotes/.test(readFileSync(f,'utf8')))errors.push(`${f}: private field in public output`);
if(errors.length)throw new Error(errors.join('\n'));
console.log(`Boundary/cycle checks passed: ${graph.size} source modules.`);
