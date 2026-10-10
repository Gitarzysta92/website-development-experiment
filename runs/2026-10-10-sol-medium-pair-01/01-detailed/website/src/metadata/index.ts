import {route,type Locale} from '../navigation';
import { publicOrigin } from '../config/public';
export function metadata(id:string,locale:Locale,page:{title:string;description:string}){
 const origin=publicOrigin.replace(/\/$/,'');
 return {title:`${page.title} | Artifactory`,description:page.description,canonical:origin+route(id,locale),en:origin+route(id,'en'),pl:origin+route(id,'pl'),share:`${origin}/media/share.svg?v=1`};
}
