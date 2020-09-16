import React from 'react'
import './Breweries.scss'

import { breweries } from '../helpers/data'

const Breweries = () => {

	const makeList = breweries => {
		return breweries.map(brewery => {
			return (
				<article className="brewery-box" key={brewery.id}>
					<h3>{brewery.name}</h3>
					<p>{brewery.city}, CO</p>
				</article>
			)
		})
	}

	return (
		<div>
			<section className="Breweries">
				{makeList(breweries)}
			</section>
			<button className="back-button">Previous 20</button>
			<button className="forward-button">Next 20</button>
		</div>
	)
}

export default Breweries