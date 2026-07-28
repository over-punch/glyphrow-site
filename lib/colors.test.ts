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

	it("varies lightness between adjacent bands (colour-blind / greyscale safe)", () => {
		// Hue is the axis red-green colour blindness collapses, so neighbours must
		// also differ in lightness to stay distinguishable. Bands cycle 78/70/62%.
		const light = (i: number) => Number(rowColor(i).bg.match(/ (\d+)%\)$/)![1]);
		for (let i = 0; i < 50; i++) {
			expect(Math.abs(light(i) - light(i + 1)), `bands ${i}/${i + 1}`).toBeGreaterThanOrEqual(6);
		}
	});

	it("NEUTRAL is white on near-black for colour-font bands", () => {
		expect(NEUTRAL).toEqual({ bg: "#0b0b0b", fg: "#ffffff" });
	});
});
