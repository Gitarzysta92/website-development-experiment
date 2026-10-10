export function configuration(env = process.env) {
 const profile = env.SITE_PROFILE || 'preview';
 const host = env.HOST || '127.0.0.1';
 const port = Number(env.PORT || 4321);
 const origin = new URL(env.SITE_ORIGIN || `http://127.0.0.1:${port}`);
 const mode = env.ENQUIRY_MODE || 'fixture';
 if (!['preview','published'].includes(profile) || !['fixture','disabled','resend'].includes(mode)) throw new Error('Invalid profile or receiver mode');
 if (origin.username || origin.password || origin.pathname !== '/' || origin.search || origin.hash) throw new Error('Origin must be an origin');
 if (profile === 'preview' && (host !== '127.0.0.1' || origin.hostname !== '127.0.0.1' || origin.protocol !== 'http:')) throw new Error('Preview must bind IPv4 loopback');
 if (profile === 'preview' && Number(origin.port || 80) !== port) throw new Error('Preview origin and listening port must match');
 if (mode === 'fixture' && (profile !== 'preview' || host !== '127.0.0.1')) throw new Error('Fixture is preview loopback only');
 if (profile === 'published' && origin.protocol !== 'https:') throw new Error('Published origin requires HTTPS');
 if (!Number.isInteger(port) || port < 1024 || port > 65000) throw new Error('Invalid port');
 return { profile, host, port, origin: origin.origin, mode };
}
export const securityHeaders = { 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin', 'Permissions-Policy': 'camera=(), microphone=(), geolocation=()', 'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; connect-src 'self'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'; object-src 'none'" };
