import { describe, it, expect } from "vitest";
import { PRESETS } from "./presets";

describe("PRESETS invariants", () => {
	it("every preset has at least one sample", () => {
		for (const p of PRESETS) {
			expect(p.samples.length, p.label).toBeGreaterThan(0);
		}
	});

	it("no two colour-font presets sit adjacent (including wrap-around)", () => {
		const n = PRESETS.length;
		for (let i = 0; i < n; i++) {
			const here = PRESETS[i].colorFont === true;
			const next = PRESETS[(i + 1) % n].colorFont === true;
			expect(here && next, `adjacent colour fonts at ${i} and ${(i + 1) % n}`).toBe(false);
		}
	});

	it("colour-font presets pin a font", () => {
		for (const p of PRESETS) {
			if (p.colorFont) expect(p.font, p.label).toBeTruthy();
		}
	});
});
