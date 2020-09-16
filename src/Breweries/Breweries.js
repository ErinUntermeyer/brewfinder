import React, {useState, useEffect } from 'react'
import './Breweries.scss'

import { get20BreweriesByPage } from '../helpers/apiCalls'

const Breweries = () => {
	const [breweries, setBreweries] = useState([])
	const [error, setError] = useState('')
	const [pageNumber, setPageNumber] = useState(1)

	const getBreweryList = pageNumber => {
		get20BreweriesByPage(pageNumber)
			.then(data => {
				setBreweries(data)
			})
			.catch(error => {
				setError(error)
			})
	}

	useEffect(() => {
		getBreweryList(pageNumber)
	}, [])

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