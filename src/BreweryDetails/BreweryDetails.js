import React from 'react'
import PropTypes from 'prop-types'
import cheers from '../assets/cheers.png'
import './BreweryDetails.scss'

const BreweryDetails = ({ show, handleClose, brewery, favoriteIds, addFavorite, removeFavorite }) => {
	const toggleClassName = show ? "modal display-block" : "modal display-none"

	const determineFavorite = () => {
		if (favoriteIds === undefined || !favoriteIds.find(id => id === brewery.id)) {
			return (
				<button onClick={(e) => addFavorite(brewery)}>
					<img src={cheers} alt="Two glasses clinking together" className="cheers-details" />
						add to favorites
				</button>
			)
		} else {
			return (
				<button onClick={(e) => removeFavorite(brewery)}>
					<img src={cheers} alt="Two glasses clinking together" className="cheers-details" />
						unfavorite
				</button>
			)
		}
	}

	return (
		<div className={toggleClassName}>
			<article className="Brewery-details">
				<h1>{brewery.name}</h1>
				<p className="type">brewery type: {brewery.brewery_type}</p>
				<h2>{brewery.street}</h2>
				<h3>{brewery.city}, CO {brewery.postal_code.slice(0, 5)}</h3>
				<p className="phone">{brewery.phone.slice(0, 3)}-{brewery.phone.slice(3, 6)}-{brewery.phone.slice(6, 11)}</p>
				<div className="details-button-box">
					<a
						href={brewery.website_url}
						target="_blank"
						rel="noopener noreferrer">
						view website
        	</a>
					{determineFavorite()}
					<button onClick={(e) => handleClose()}>close</button>
				</div>
			</article>
		</div>
	)
}

export default BreweryDetails

BreweryDetails.propTypes = {
	show: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	brewery: PropTypes.object.isRequired,
	favoriteIds: PropTypes.array,
	addFavorite: PropTypes.func.isRequired,
	removeFavorite: PropTypes.func.isRequired
}