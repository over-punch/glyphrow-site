// Glyphrow showcase home page: an explanation of the library up top, a live
// hero, then an infinite scroll of Google Fonts each driven by Glyphrow.

import Hero from "@/components/Hero";
import FontScroll from "@/components/FontScroll";
import CopyInstall from "@/components/CopyInstall";

const REPO = "https://github.com/quitequinn/glyphrow";

export default function Home() {
	return (
		<main>
			<section className="intro">
				<p className="eyebrow">Open-source · dependency-free · accessible</p>

				<h1 className="sr-only">Glyphrow</h1>
				<div className="hero">
					<Hero />
				</div>
				<p className="hero__hint" aria-hidden="true">
					↑ Click the wordmark and drag the controls — it&rsquo;s a real Glyphrow instance.
				</p>

				<p className="lede">
					<strong>Glyphrow</strong> is a type tester for the web: a tiny vanilla-JS core
					with an optional React wrapper, no dependencies, and native, keyboard- and
					screen-reader-accessible controls. Composable OpenType features, variable-font
					axes, auto-fit sizing — drop it on any element and start testing type.
				</p>

				<div className="install">
					<CopyInstall command="npm install glyphrow" />
					<nav className="install__links" aria-label="Project links">
						<a href="https://www.npmjs.com/package/glyphrow">
							npm <span aria-hidden="true">↗</span>
						</a>
						<a href={REPO}>
							GitHub <span aria-hidden="true">↗</span>
						</a>
					</nav>
				</div>

				<p className="stats">
					<span>TypeScript</span>
					<span>zero dependencies</span>
					<span>vanilla or React</span>
					<span>~5&nbsp;kB core</span>
					<span>ISC</span>
				</p>
			</section>

			<section className="showcase" aria-label="Live demo">
				<p className="showcase__note">
					A live demo of what you can build. Every band below is a real, editable
					Glyphrow — Google Fonts, colour fonts, OpenType features, variable axes,
					auto-fit. Click into any one and drag its controls.
				</p>
				<FontScroll />
			</section>

			<footer className="foot">
				<span>
					Glyphrow — by <a href="https://overpunch.ca/">Quinn Keaveney</a>
				</span>
				<a href={REPO}>Source on GitHub</a>
			</footer>
		</main>
	);
}
