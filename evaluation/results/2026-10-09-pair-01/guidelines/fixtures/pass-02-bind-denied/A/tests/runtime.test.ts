import { test, expect } from 'vitest';
// @ts-ignore runtime configuration is also used before TypeScript compilation.
import { configuration } from '../scripts/runtime/config.mjs';
test('preview and fixture fail closed',()=>{expect(configuration({})).toMatchObject({host:'127.0.0.1',mode:'fixture'});for(const env of [{HOST:'0.0.0.0'},{SITE_ORIGIN:'https://example.org'},{SITE_PROFILE:'published'},{SITE_ORIGIN:'http://user@127.0.0.1:4321'},{PORT:'NaN'}])expect(()=>configuration(env)).toThrow();});
