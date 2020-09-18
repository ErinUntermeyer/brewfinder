import React from 'react'
import PropTypes from 'prop-types'
import cheers from '../assets/cheers.png'
import './Favorites.scss'

// import { favorites } from '../helpers/data'

const Favorites = ({ favoriteBreweriesData, removeFavorite }) => {

	const favoritesList = favoriteBreweriesData.map(favorite => {
		return (
			<article className="favorites-box" key={favorite.id}>
				<h1>{favorite.name}</h1>
				<p className="fav-type">brewery type: {favorite.brewery_type}</p>
				<h2>{favorite.street}</h2>
				<h3>{favorite.city}, CO {favorite.postal_code.slice(0, 5)}</h3>
				<p className="fav-phone">{favorite.phone.slice(0, 3)}-{favorite.phone.slice(3, 6)}-{favorite.phone.slice(6, 11)}</p>
				<div className="buttons-box">
					<a
						href={favorite.website_url}
						target="_blank"
						rel="noopener noreferrer">
						website
					</a>
					<button onClick={(e) => removeFavorite(favorite)}>
						<img src={cheers} alt="Two glasses clinking together" className="favorite-cheers" />
						unfavorite
					</button>
				</div>
			</article>
		)
	})

	return (
		<div>
			{favoriteBreweriesData.length === 0 ?
			<h1 className="no-favorites-msg">Currently, you have no favorites. Go add some!</h1> :
			<section className="Favorites">
				{favoritesList}
			</section>
			}
		</div>
	)
}

export default Favorites

Favorites.propTypes = {
	favoriteBreweriesData: PropTypes.array,
	removeFavorite: PropTypes.func.isRequired
}