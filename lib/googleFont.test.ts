import { describe, it, expect, beforeEach } from "vitest";
import { loadGoogleFont } from "./googleFont";

// The module-level dedup Set persists across tests, so each test uses a distinct
// family name to avoid cross-test collisions.
describe("loadGoogleFont", () => {
	beforeEach(() => {
		document.head.innerHTML = "";
	});

	it("injects a stylesheet link with spaces as + in the family", () => {
		loadGoogleFont("Open Sans");
		const link = document.head.querySelector("link");
		expect(link?.rel).toBe("stylesheet");
		expect(link?.getAttribute("href")).toContain("family=Open+Sans");
	});

	it("dedupes repeat calls for the same family", () => {
		loadGoogleFont("Dedupe Me");
		loadGoogleFont("Dedupe Me");
		expect(document.head.querySelectorAll('link[href*="Dedupe+Me"]')).toHaveLength(1);
	});

	it("treats a family and its axis spec as distinct requests", () => {
		loadGoogleFont("Axis Test");
		loadGoogleFont("Axis Test", "wght@100..900");
		expect(document.head.querySelectorAll('link[href*="Axis+Test"]')).toHaveLength(2);
	});

	it("URL-encodes reserved characters so they can't break out of the query", () => {
		loadGoogleFont("Evil&text=secret");
		const link = Array.from(document.head.querySelectorAll("link")).find((l) =>
			l.getAttribute("href")!.includes("Evil"),
		);
		const href = link!.getAttribute("href")!;
		expect(href).not.toContain("&text=secret");
		expect(href).toContain("Evil%26text%3Dsecret");
	});
});
