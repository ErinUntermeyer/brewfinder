import React from 'react'
import './Breweries.scss'

const Breweries = ({ breweries, changePage }) => {
	const breweryList = breweries.map(brewery => {
		return (
			<article className="brewery-box" key={brewery.id}>
				<h3>{brewery.name}</h3>
				<p>{brewery.city}, CO</p>
			</article>
		)
	})

	return (
		<div>
			<section className="Breweries">
				{breweryList}
			</section>
			<button
				className="back-button"
				onClick={(e) => changePage('back')}>
				Previous 20
			</button>
			<button
				className="forward-button"
				onClick={(e) => changePage('forward')}>
				Next 20
			</button>
		</div>
	)
}

export default Breweries