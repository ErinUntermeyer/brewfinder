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
				definitions go here
			</article>
			<article className="related-links">
				<div className="about-title-box">
					<img src={orangeRedBeer} alt="Beer mug" className="about-logo" />
					<h1>related links</h1>
				</div>
				related links go here
			</article>
			<article className="credits">
				<div className="about-title-box">
					<img src={orangeRedBeer} alt="Beer mug" className="about-logo" />
					<h1>credits</h1>
				</div>
				credits go here
			</article>
		</section>
	)
}

export default About