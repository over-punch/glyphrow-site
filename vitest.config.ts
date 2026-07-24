import { defineConfig } from "vitest/config";

// jsdom so googleFont's <link> injection can be exercised; tests live next to
// the pure lib modules they cover.
export default defineConfig({
	test: {
		environment: "jsdom",
		include: ["lib/**/*.test.ts"],
	},
});
