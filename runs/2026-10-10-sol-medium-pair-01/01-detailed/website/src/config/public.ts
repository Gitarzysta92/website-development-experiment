export const profile = process.env.AF_PROFILE === 'published' ? 'published' : 'preview';
export const publicOrigin = process.env.AF_PUBLIC_ORIGIN || 'http://127.0.0.1:4321';
