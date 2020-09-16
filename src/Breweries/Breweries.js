import React, {useState, useEffect } from 'react'
import { get20BreweriesByPage } from '../helpers/apiCalls'
import './Breweries.scss'

const Breweries = () => {
	const [breweries, setBreweries] = useState([])
	const [warning, setWarning] = useState('')
	const [error, setError] = useState('')
	const [pageNumber, setPageNumber] = useState(1)

	const getBreweryList = pageNumber => {
		get20BreweriesByPage(pageNumber)
			.then(data => {
				setBreweries(data)
			})
			.catch(error => {
				setError('I\'m sorry, we could not retrieve any breweries at this time. Please try again later!')
			})
	}

	const displayWarning = message => {
		setWarning(message)
		setTimeout(() => {
			setWarning('')
		}, 3000)
	}

	const changePage = direction => {
		if (direction === 'back' && pageNumber === 1) {
			displayWarning('You\'re on the first page!')
		} else if (direction === 'back' && pageNumber > 1) {
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
		error ? <h1 className="error">{error}</h1> : (
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
			<p>{error}</p>
		</div>
		)
	)
}

export default Breweries