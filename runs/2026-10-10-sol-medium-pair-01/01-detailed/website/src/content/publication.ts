export type ApprovalView={editorialState:string;factsReviewed:boolean;enReviewed:boolean;plReviewed:boolean;assetsCleared:boolean;privacyApproved:boolean;receiverConfigured:boolean;origin:string};
export function publicationEligible(x:ApprovalView){
 return x.editorialState==='published'&&x.factsReviewed&&x.enReviewed&&x.plReviewed&&x.assetsCleared&&x.privacyApproved&&x.receiverConfigured&&/^https:\/\/[a-z0-9.-]+$/i.test(x.origin);
}
