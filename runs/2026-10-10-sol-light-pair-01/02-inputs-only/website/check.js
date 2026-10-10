import assert from 'node:assert/strict';
import {routes,path,copy} from './content.js';
assert.equal(Object.keys(routes).length,17);
for(const id of Object.keys(routes)){for(const lang of ['en','pl']){assert(copy[lang][id],`${lang} ${id} copy missing`);assert(copy[lang][id].t);assert(copy[lang][id].d);assert(path(id,lang).startsWith(`/${lang}/`))}}
console.log('17 page IDs, 34 localized routes and content entries verified.');
