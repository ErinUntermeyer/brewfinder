import React from 'react'
import './Breweries.scss'

import { breweries } from '../helpers/data'

const Breweries = () => {
	// have 'breweries' be props passed in from App - any array of breweries will display the same. so you can filter
	const breweriesList = breweries.map(brewery => {
		return (
			<article className="brewery-box" key={brewery.id}>
				<h3>{brewery.name}</h3>
				<p>{brewery.city}, CO</p>
			</article>
		)
	})
	
	return (
		<section className="Breweries">
			{breweriesList}
		</section>
	)
}

export default Breweries