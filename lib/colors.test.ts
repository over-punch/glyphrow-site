import { describe, it, expect } from "vitest";
import { rowColor, NEUTRAL } from "./colors";

describe("rowColor", () => {
	it("is deterministic per index", () => {
		expect(rowColor(7)).toEqual(rowColor(7));
	});

	it("keeps every hue inside the warm arc (no cool cyans/blues/violets)", () => {
		// WARM_START 342 + WARM_SPAN 120 → hues in [342,360) ∪ [0,102]; i.e. never
		// in the cool zone (102, 342). Tolerance absorbs 1-decimal rounding.
		for (let i = 0; i < 500; i++) {
			const hue = Number(rowColor(i).bg.match(/hsl\(([\d.]+)/)![1]);
			const warm = hue <= 102.5 || hue >= 341.5;
			expect(warm, `index ${i} produced cool hue ${hue}`).toBe(true);
		}
	});

	it("returns near-black foreground and a valid hsl background", () => {
		const { bg, fg } = rowColor(0);
		expect(fg).toBe("#161616");
		expect(bg).toMatch(/^hsl\([\d.]+ \d+% \d+%\)$/);
	});

	it("NEUTRAL is white on near-black for colour-font bands", () => {
		expect(NEUTRAL).toEqual({ bg: "#0b0b0b", fg: "#ffffff" });
	});
});
