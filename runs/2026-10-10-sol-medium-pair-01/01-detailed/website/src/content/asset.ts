import registry from '../../content/assets/registry.json';
import type {Locale} from '../navigation';
export function publicAsset(id:string,locale:Locale){const asset=registry.find(x=>x.id===id);if(!asset)throw new Error(`Missing asset ${id}`);return {caption:asset.captions[locale],alt:asset.alts[locale]}}
