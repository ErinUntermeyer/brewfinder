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

	const changePage = direction => {
		if (direction === 'back' && pageNumber > 1) {
			setPageNumber(pageNumber - 1)
		} else if (direction === 'forward') {
			setPageNumber(pageNumber + 1)
		}
	}

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

	useEffect(() => {
		getBreweryList(pageNumber)
	}, [pageNumber])

	return (
		<div>
			<section className="Breweries">
				{makeList(breweries)}
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