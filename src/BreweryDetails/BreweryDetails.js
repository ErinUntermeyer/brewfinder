import React from 'react'
import PropTypes from 'prop-types'
import cheers from '../assets/cheers.png'
import './BreweryDetails.scss'

const BreweryDetails = ({ show, handleClose, brewery, favorites, addFavorite, removeFavorite }) => {
	
	const toggleClassName = show ? "modal display-block" : "modal display-none"
	
	const determineFavorite = () => {
		// bug here if you change pages and go back, the button doesn't say unfavorite if it's included in the favorites array
		if (favorites === undefined || !favorites.includes(brewery)) {
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
				<h2>{brewery.street}</h2>
				<h3>{brewery.city}, CO {brewery.postal_code.slice(0, 5)}</h3>
				<p>{brewery.phone.slice(0, 3)}-{brewery.phone.slice(3, 6)}-{brewery.phone.slice(6, 11)}</p>
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
	favorites: PropTypes.array.isRequired,
	addFavorite: PropTypes.func.isRequired,
	removeFavorite: PropTypes.func.isRequired
}