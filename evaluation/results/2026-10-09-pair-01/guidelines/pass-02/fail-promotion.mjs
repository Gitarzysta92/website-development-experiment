import fs from 'node:fs';
import fsp from 'node:fs/promises';
import path from 'node:path';
import {syncBuiltinESMExports} from 'node:module';
function fail(from,to){
 if(['.dist-candidate','.build-temp'].includes(path.basename(String(from)))&&path.basename(String(to))==='dist'){
  fs.writeFileSync(process.env.EVAL_FAULT_MARKER,JSON.stringify({from:String(from),to:String(to),code:'EACCES'}));
  const error=new Error('Synthetic evaluation: candidate promotion denied');error.code='EACCES';throw error;
 }
}
const sync=fs.renameSync;fs.renameSync=function(from,to){fail(from,to);return sync.apply(this,arguments);};
const asyncRename=fsp.rename;fsp.rename=async function(from,to){fail(from,to);return asyncRename.apply(this,arguments);};
syncBuiltinESMExports();
