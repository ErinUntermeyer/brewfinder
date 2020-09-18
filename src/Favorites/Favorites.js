import React from 'react'
import PropTypes from 'prop-types'
import cheers from '../assets/cheers.png'
import './Favorites.scss'

// import { favorites } from '../helpers/data'

const Favorites = ({ favorites, removeFavorite }) => {

	const favoritesList = favorites.map(favorite => {
		return (
			<article className="favorites-box" key={favorite.id}>
				<h1>{favorite.name}</h1>
				<h2>{favorite.street}</h2>
				<h3>{favorite.city}, CO {favorite.postal_code.slice(0, 5)}</h3>
				<p>{favorite.phone.slice(0, 3)}-{favorite.phone.slice(3, 6)}-{favorite.phone.slice(6, 11)}</p>
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
			{favorites.length === 0 ?
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
	favorites: PropTypes.array.isRequired,
	removeFavorite: PropTypes.func.isRequired
}