export function serverConfig() {
  const profile = process.env.AF_PROFILE === 'published' ? 'published' : 'preview';
  const receiver = process.env.AF_RECEIVER || 'fixture';
  if (profile === 'published') throw new Error('Published profile requires human content, privacy, asset, origin and receiver approvals; no records are eligible.');
  if (receiver === 'fixture' && process.env.HOST && !['127.0.0.1','localhost','::1'].includes(process.env.HOST)) throw new Error('Fixture requires loopback binding.');
  return { profile, receiver } as const;
}
