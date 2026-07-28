"use client";

// CopyInstall — the install command as a pill that copies to the clipboard on
// click, mirroring the Type Tools install treatment. The trailing glyph swaps
// to a check for ~1.8s after a successful copy; a polite live region announces
// it for screen readers.

import { useState } from "react";

export default function CopyInstall({ command }: { command: string }) {
	const [copied, setCopied] = useState(false);

	const copy = () => {
		void navigator.clipboard.writeText(command).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 1800);
		});
	};

	return (
		<button
			type="button"
			className="install__pill"
			onClick={copy}
			aria-label={`Copy install command: ${command}`}
		>
			<code>{command}</code>
			{copied ? (
				// Check — copied.
				<svg className="install__icon" width="14" height="14" viewBox="0 0 13 13" fill="none" aria-hidden="true">
					<path d="M1.5 6.5l3.5 3.5 6.5-6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			) : (
				// Two overlapping sheets — copy.
				<svg className="install__icon" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
					<rect x="1" y="4" width="8" height="9" rx="1.2" stroke="currentColor" strokeWidth="1.2" />
					<path d="M4 4V2.2A1.2 1.2 0 015.2 1h6.6A1.2 1.2 0 0113 2.2v6.6A1.2 1.2 0 0111.8 10H10" stroke="currentColor" strokeWidth="1.2" />
				</svg>
			)}
			<span className="sr-only" role="status">
				{copied ? "Copied" : ""}
			</span>
		</button>
	);
}
