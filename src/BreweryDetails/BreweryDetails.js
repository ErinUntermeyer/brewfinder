import React from 'react'
import './BreweryDetails.scss'

const BreweryDetails = ({ show, handleClose, brewery }) => {
	const toggleClassName = show ? "modal display-block" : "modal display-none"

	return (
		<div className={toggleClassName}>
			<article className="Brewery-details">
				<h1>{brewery.name}</h1>
				<h2>{brewery.street}</h2>
				<h3>{brewery.city}, CO {brewery.postal_code.slice(0, 5)}</h3>
				<p>{brewery.phone.slice(0, 3)}-{brewery.phone.slice(3, 6)}-{brewery.phone.slice(6, 11)}</p>
				<button onClick={(e) => handleClose()}>close</button>
			</article>
		</div>
	)
}

export default BreweryDetails