import { createHash } from 'node:crypto';
export function fingerprint(record) {
  const { editorialState, modifiedAt, reviews, privateNotes, ...reviewable } = record;
  return createHash('sha256').update(JSON.stringify(reviewable)).digest('hex');
}
export function eligible(record) {
  return record.editorialState === 'published' && ['facts','language','assets'].every(kind => record.reviews[kind] === fingerprint(record));
}
export function assertPublication(records, config) {
  let validOrigin = false;
  try { const url = new URL(config.origin); validOrigin = url.protocol === 'https:' && url.origin === config.origin && !url.username && !url.password; } catch {}
  if (!validOrigin || config.privacyApproved !== true || config.receiverApproved !== true || config.assetsApproved !== true || records.length !== 34 || new Set(records.map(r=>`${r.id}:${r.locale}`)).size !== 34 || records.some(record => !eligible(record))) {
    throw new Error('Publication blocked: reviewed facts, both languages, assets, HTTPS origin, privacy and receiver required');
  }
}
