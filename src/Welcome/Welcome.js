import React from 'react'
import PropTypes from 'prop-types'
import beerMug from '../assets/beer.png'
import './Welcome.scss'

const Welcome = ({ firstLoad, closeWelcome }) => {
	const toggleClassName = firstLoad ? "modal display-block" : "modal display-none"

	return (
		<div className={toggleClassName}>
			<article className="Welcome">
				<h1 className="welcome-title">Welcome to <img src={beerMug} alt="Beer mug" className="welcome-logo" /><span className="welcome-name">brewfinder</span></h1>
				<p className="welcome-message">Are you an avid beer lover? Here at brewfinder, we provide access to hundreds of breweries in Colorado. You have the ability to search by city, filter by brewery type, or simply view them all! Click the 'view details' button on each brewery listed for more information. Also, please favorite the breweries you know and love so you can easily come back to them! Cheers!</p>
				<button onClick={(e) => closeWelcome()} className="get-started">get started</button>
			</article>
		</div>
	)
}

export default Welcome

Welcome.propTypes = {
	firstLoad: PropTypes.bool.isRequired,
	closeWelcome: PropTypes.func.isRequired
}