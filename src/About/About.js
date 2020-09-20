import React from 'react'
import orangeRedBeer from '../assets/orangeRed-beer.png'
import './About.scss'

const About = () => {
	return (
		<section className="About">
			<article className="summary">
				<div className="about-title-box">
					<img src={orangeRedBeer} alt="Beer mug" className="about-logo" />
					<h1>summary</h1>
				</div>
				<p><span className="title-word">brewfinder</span> was designed for the avid beer lovers in the state of Colorado! This application allows any beer lover to search for breweries based on the type of brewery they are interested in, or simply view them all. Click the 'view details' button on each brewery listed to see their address, phone number and a link to their website. Also, please favorite the breweries you know and love so you can easily come back to them! Cheers!</p>
			</article>
			<article className="definitions">
				<div className="about-title-box">
					<img src={orangeRedBeer} alt="Beer mug" className="about-logo" />
					<h1>definitions</h1>
				</div>
				<p><span className="title-word">micro:</span> brewery that produces less than 15,000 barrels of beer annually.<br></br></p>
				<p><span className="title-word">brewpub:</span> combination of a brewery and a restaurant. Most, if not all, of the brewing is done on site and if their beer sales grow to exceed 50% of total sales, they are bumped into the microbrewery category.<br></br></p>
				<p><span className="title-word">regional:</span> brewery that produces between 15,000 and 6,000,000 barrels of beer annually.<br></br></p>
				<p><span className="title-word">large:</span> once a brewery sells more than 500,000 barrels of beer, they earn their title as "large" brewery.<br></br></p>
				<p><span className="title-word">contract:</span> a business that hires another brewery to produce it's beer.  The contract brewing company handles all marketing, sales and distribution while the brewery does the brewing and packaging.<br></br></p>
				<p><span className="title-word">proprietor:</span> a proprietor, typically called an alternating proprietor, is a licensed tenant brewery that takes possession of a shared brewery while also brewing.<br></br></p>
			</article>
			<article className="related-links">
				<div className="about-title-box">
					<img src={orangeRedBeer} alt="Beer mug" className="about-logo" />
					<h1>related links</h1>
				</div>
				<p>
				<a
					href="https://coloradobeer.org/events/"
					target="_blank"
					rel="noopener noreferrer">
					Colorado Beer Events
				</a>
				<br></br>
				<a
					href="https://www.colorado.com/events/durango-brew-train"
					target="_blank"
					rel="noopener noreferrer">
					Durango Brew Train
				</a>
				<br></br>
				<a
					href="https://www.denver.org/restaurants/denver-bars-clubs/denver-beer-trail/"
					target="_blank"
					rel="noopener noreferrer">
					Denver Beer Trail
				</a>
				<br></br>
				<a
					href="https://beerfests.com/us/colorado-beer-festivals/"
					target="_blank"
					rel="noopener noreferrer">
					Colorado Beer Festivals
				</a>
				<br></br>
				</p>
			</article>
			<article className="credits">
				<div className="about-title-box">
					<img src={orangeRedBeer} alt="Beer mug" className="about-logo" />
					<h1>credits</h1>
				</div>
				<p>
					developed by:
					<a
						href="https://github.com/ErinUntermeyer"
						target="_blank"
						rel="noopener noreferrer">
						Erin Untermeyer
					</a>
					<br></br>
					data sourced from:
					<a
						href="https://www.openbrewerydb.org/"
						target="_blank"
						rel="noopener noreferrer">
						Open Brewery DB
					</a>
					<br></br>
					icons:
					<a
						href="https://www.flaticon.com/home"
						target="_blank"
						rel="noopener noreferrer">
						Flat Icon
					</a>
				</p>
			</article>
		</section>
	)
}

export default About