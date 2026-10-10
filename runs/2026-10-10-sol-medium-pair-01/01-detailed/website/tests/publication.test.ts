import {it,expect} from 'vitest';
import {publicationEligible} from '../src/content/publication';
it('requires every independent approval and a secure public origin',()=>{
 const approved={editorialState:'published',factsReviewed:true,enReviewed:true,plReviewed:true,assetsCleared:true,privacyApproved:true,receiverConfigured:true,origin:'https://artifactory.tech'};
 expect(publicationEligible(approved)).toBe(true);
 for(const key of ['factsReviewed','enReviewed','plReviewed','assetsCleared','privacyApproved','receiverConfigured'])expect(publicationEligible({...approved,[key]:false})).toBe(false);
 expect(publicationEligible({...approved,editorialState:'draft'})).toBe(false);
 expect(publicationEligible({...approved,origin:'http://localhost'})).toBe(false);
});
