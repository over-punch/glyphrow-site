// Next.js config for the Glyphrow showcase site.
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));

// Security headers. The CSP constrains where fonts/CSS may load from (only
// Google Fonts) and blocks framing/exfiltration vectors, while allowing the
// inline scripts/styles Next.js and Glyphrow need.
const securityHeaders = [
	{ key: "X-Content-Type-Options", value: "nosniff" },
	{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
	{ key: "X-Frame-Options", value: "SAMEORIGIN" },
	{ key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
	{
		key: "Content-Security-Policy",
		value: [
			"default-src 'self'",
			"script-src 'self' 'unsafe-inline'",
			"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
			"font-src 'self' https://fonts.gstatic.com",
			"img-src 'self' data:",
			"connect-src 'self'",
			"base-uri 'self'",
			"frame-ancestors 'none'",
		].join("; "),
	},
];

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Glyphrow ships prebuilt ESM in dist/, but transpiling it keeps Next happy
	// when consuming the package (and its CSS export).
	transpilePackages: ["glyphrow"],
	// Root file tracing at this app so nearby lockfiles aren't mistaken for the
	// workspace root (silences the multi-lockfile inference warning).
	outputFileTracingRoot: here,
	async headers() {
		return [{ source: "/:path*", headers: securityHeaders }];
	},
};

export default nextConfig;
