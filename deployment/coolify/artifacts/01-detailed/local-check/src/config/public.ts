export type BuildProfile = 'preview' | 'published';
export const publicConfig = Object.freeze({ profile: (process.env.SITE_PROFILE || 'preview') as BuildProfile, origin: process.env.SITE_ORIGIN || 'http://127.0.0.1:4321' });
