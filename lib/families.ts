// A curated list of Google Fonts families, spanning sans, serif, mono, display
// and handwriting, so the infinite scroll shows real typographic variety. The
// scroll loops this list, so it need not be exhaustive — just varied.

export const FAMILIES: string[] = [
	// Sans
	"Inter", "Roboto", "Open Sans", "Work Sans", "DM Sans", "Manrope", "Poppins",
	"Nunito", "Nunito Sans", "Rubik", "Karla", "Mulish", "Sora", "Space Grotesk",
	"Public Sans", "Archivo", "Archivo Narrow", "Barlow", "Barlow Condensed",
	"Figtree", "Onest", "Instrument Sans", "Hanken Grotesk", "Schibsted Grotesk",
	"Albert Sans", "Bricolage Grotesque", "Plus Jakarta Sans", "Lexend", "Outfit",
	"Epilogue", "Red Hat Display", "IBM Plex Sans", "Overpass", "Cabin", "Assistant",
	"Josefin Sans", "Jost", "Quicksand", "Comfortaa", "Montserrat", "Raleway",
	"Oswald", "Fira Sans", "Titillium Web", "Kanit", "Prompt", "Chivo", "Hind",
	"Signika", "Questrial", "Mukta", "Saira", "Saira Condensed", "Antonio",
	// Serif
	"Playfair Display", "Fraunces", "Lora", "Merriweather", "PT Serif", "Bitter",
	"Crimson Pro", "Crimson Text", "Cormorant", "Cormorant Garamond", "EB Garamond",
	"Libre Baskerville", "Source Serif 4", "Newsreader", "Spectral", "Bodoni Moda",
	"DM Serif Display", "DM Serif Text", "Instrument Serif", "Zilla Slab", "Domine",
	"Frank Ruhl Libre", "Vollkorn", "Alegreya", "Noto Serif", "Petrona", "Gelasio",
	"Literata", "Piazzolla", "Young Serif", "Playfair", "Rozha One", "Marcellus",
	"Cardo", "Sorts Mill Goudy", "Old Standard TT", "Prata", "Tinos", "Besley",
	// Mono
	"JetBrains Mono", "Fira Code", "IBM Plex Mono", "Space Mono", "Roboto Mono",
	"Source Code Pro", "Inconsolata", "DM Mono", "Overpass Mono", "Martian Mono",
	"Ubuntu Mono", "Cousine", "Anonymous Pro", "Red Hat Mono", "Spline Sans Mono",
	// Display
	"Bebas Neue", "Anton", "Righteous", "Alfa Slab One", "Abril Fatface",
	"Staatliches", "Teko", "Passion One", "Bungee", "Monoton", "Fjalla One",
	"Archivo Black", "Syne", "Unbounded", "Big Shoulders Display", "Climate Crisis",
	"Roboto Serif", "Familjen Grotesk", "Sedgwick Ave", "Bungee Shade", "Rubik Mono One",
	"Bowlby One", "Titan One", "Luckiest Guy", "Bangers", "Racing Sans One",
	// Handwriting / script
	"Caveat", "Dancing Script", "Pacifico", "Kalam", "Shadows Into Light",
	"Satisfy", "Sacramento", "Great Vibes", "Permanent Marker", "Amatic SC",
	"Gochi Hand", "Indie Flower", "Homemade Apple", "Rock Salt", "Yellowtail",
];

// Families that ship a variable `wght` axis on Google Fonts. Only these get a
// `wght@100..900` request — a range request 400s for a non-variable family, so
// this list is deliberately conservative: an omitted variable font simply
// renders synthesised weights rather than causing a failed request.
export const VARIABLE_FAMILIES = new Set<string>([
	"Inter", "Roboto", "Work Sans", "DM Sans", "Manrope", "Sora", "Space Grotesk",
	"Public Sans", "Archivo", "Archivo Narrow", "Figtree", "Onest", "Instrument Sans",
	"Hanken Grotesk", "Schibsted Grotesk", "Albert Sans", "Bricolage Grotesque",
	"Plus Jakarta Sans", "Lexend", "Outfit", "Epilogue", "Red Hat Display", "Overpass",
	"Josefin Sans", "Jost", "Nunito", "Nunito Sans", "Rubik", "Mulish", "Raleway",
	"Montserrat", "Oswald", "Chivo", "Saira", "Saira Condensed", "Signika",
	"Familjen Grotesk", "Syne", "Unbounded", "Big Shoulders Display",
	"Fraunces", "Lora", "Merriweather", "Bitter", "Crimson Pro", "EB Garamond",
	"Source Serif 4", "Newsreader", "Spectral", "Bodoni Moda", "Literata", "Piazzolla",
	"Playfair Display", "Playfair", "Vollkorn", "Alegreya", "Roboto Serif", "Besley",
	"Frank Ruhl Libre", "Petrona", "Domine",
	"JetBrains Mono", "Fira Code", "Roboto Mono", "Source Code Pro", "Martian Mono",
	"Red Hat Mono", "Spline Sans Mono", "Roboto Flex",
]);

// Families that ship an italic — only these get an `ital@1` request (others 400
// on it). Conservative for the same reason; a text font not listed here just
// renders a synthesised slant on the italic rows.
export const ITALIC_FAMILIES = new Set<string>([
	"Inter", "Roboto", "Work Sans", "DM Sans", "Manrope", "Nunito", "Nunito Sans",
	"Rubik", "Mulish", "Raleway", "Montserrat", "Poppins", "Josefin Sans", "Jost",
	"Public Sans", "Archivo", "Overpass", "Cabin", "Assistant", "Fira Sans",
	"Titillium Web", "Barlow", "Barlow Condensed", "Hind", "Mukta", "Chivo", "Epilogue",
	"Plus Jakarta Sans", "Lora", "Merriweather", "PT Serif", "Bitter", "Crimson Pro",
	"Crimson Text", "Cormorant", "Cormorant Garamond", "EB Garamond", "Libre Baskerville",
	"Source Serif 4", "Newsreader", "Spectral", "Alegreya", "Vollkorn", "Domine",
	"Frank Ruhl Libre", "Noto Serif", "Petrona", "Gelasio", "Literata", "Piazzolla",
	"Cardo", "Old Standard TT", "Tinos", "Besley", "IBM Plex Sans", "IBM Plex Mono",
	"Inconsolata", "Anonymous Pro", "Cousine", "Ubuntu Mono",
]);
