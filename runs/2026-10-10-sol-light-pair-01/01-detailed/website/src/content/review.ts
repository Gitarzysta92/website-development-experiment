import {createHash} from 'node:crypto';
import type {PageView} from './index';
export type Approval={state:'draft'|'reviewed';digest?:string;reviewer?:string};
export type ReviewRecord={facts:Approval;en:Approval;pl:Approval;assets:Approval};
export function digest(value:unknown){return createHash('sha256').update(JSON.stringify(value)).digest('hex')}
export function copyDigest(view:PageView){return digest({title:view.title,lead:view.lead,description:view.description,sections:view.sections})}
const valid=(approval:Approval,current:string)=>approval.state==='reviewed'&&approval.digest===current&&!!approval.reviewer;
export function reviewState(en:PageView,pl:PageView,media:unknown,record:ReviewRecord){return {factsValid:valid(record.facts,copyDigest(en)),enValid:valid(record.en,copyDigest(en)),plValid:valid(record.pl,copyDigest(pl)),assetsValid:valid(record.assets,digest(media))}}
export function publicEligible(en:PageView,pl:PageView,media:unknown,record:ReviewRecord){return Object.values(reviewState(en,pl,media,record)).every(Boolean)}
