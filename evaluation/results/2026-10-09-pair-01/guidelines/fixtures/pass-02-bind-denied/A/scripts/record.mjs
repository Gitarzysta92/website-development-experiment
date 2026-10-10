import { implementationFingerprint } from './fingerprint.mjs';
import { appendFileSync, mkdirSync } from 'node:fs';
const [unit, action, result] = process.argv.slice(2);
if(!unit||!action||!result)throw new Error('Usage: record UNIT action result');
const fingerprint=implementationFingerprint();
const entry={time:new Date().toISOString(),unit,revision:'1.0',plan:'AF-D1 1.1',action,result,fingerprint};
mkdirSync('artifacts',{recursive:true});appendFileSync('artifacts/unit-attempts.jsonl',JSON.stringify(entry)+'\n');
appendFileSync('docs/execution-record.md',`\n### ${entry.time} ${unit} ${action}\n${result}\nImplementation SHA-256: ${fingerprint}. Contract revision 1.0; plan 1.1. Evidence: artifacts/unit-attempts.jsonl and the scoped acceptance entries.\n`);
console.log(JSON.stringify(entry));
