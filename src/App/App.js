import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { get20BreweriesByPage, getBreweriesByType } from '../helpers/apiCalls'
import Header from '../Header/Header'
import Breweries from '../Breweries/Breweries'
import Filter from '../Filter/Filter'
import Favorites from '../Favorites/Favorites'
import './App.scss'

class App extends Component {
	constructor() {
		super()
		this.state = {
			breweries: [],
			pageNumber: 1,
			favorites: [],
			type: "all",
			warning: '',
			error: ''
		}
	}

	// componentDidMount() {
	// 	this.getBreweries()
	// }

	// componentDidUpdate(prevProps, prevState) {
	// 	if (this.state.pageNumber !== prevState.pageNumber && this.state.type === "all") {
	// 		this.getBreweries()
	// 	}
	// 	if (this.state.pageNumber !== prevState.pageNumber && this.state.type !== "all") {
	// 		this.filterBreweriesByType(this.state.type)
	// 	}
	// 	if (this.state.type !== prevState.type && this.state.type === "all") {
	// 		this.setState({ pageNumber: 1 })
	// 		this.getBreweries()
	// 	}
	// 	if (this.state.type !== prevState.type) {
	// 		this.setState({ pageNumber: 1 })
	// 		this.filterBreweriesByType(this.state.type)
	// 	}
	// }

	getBreweries = () => {
		get20BreweriesByPage(this.state.pageNumber)
			.then(data => {
				this.setState({ breweries: data })
			})
			.catch(error => {
				this.setState({ error: 'I\'m sorry, we could not retrieve any breweries at this time. Please try again later!' })
			})
	}

	filterBreweriesByType = type => {
		getBreweriesByType(type, this.state.pageNumber)
			.then(data => {
				this.setState({ breweries: data })
			})
			.catch(error => {
				this.setState({ error: 'I\'m sorry, we could not retrieve any breweries at this time. Please try again later!' })
			})
	}

	setStateByType = type => {
		this.setState({ type: type })
	}

	changePage = direction => {
		if (direction === 'back' && this.state.pageNumber === 1) {
			this.displayWarning('You\'re on the first page!')
		} else if (direction === 'back' && this.state.pageNumber > 1) {
			this.setState({ pageNumber: this.state.pageNumber - 1 })
		} else if (direction === 'forward' && this.state.breweries.length < 20) {
			this.displayWarning('You\'re on the last page!')
		} else if (direction === 'forward') {
			this.setState({ pageNumber: this.state.pageNumber + 1 })
		}
	}

	addFavorite = brewery => {
		if (!this.state.favorites.includes(brewery)) {
			this.setState({ favorites: [...this.state.favorites, brewery] })
		}
	}

	removeFavorite = brewery => {
		this.setState({ favorites: this.state.favorites.filter(favorite => favorite !== brewery) })
	}

	displayWarning = message => {
		this.setState({ warning: message })
		setTimeout(() => {
			this.setState({ warning: '' })
		}, 3000)
	}

	render() {
		return (
		<div className="App">
			<Header />
			<main>
				{ this.state.error ? <h1 className="error">{this.state.error}</h1> : (
				<Route exact path="/" render={() => (
					<>
						<Filter 
							setStateByType={this.setStateByType}
							type={this.state.type}
						/>
						<Breweries
							breweries={this.state.breweries}
							changePage={this.changePage}
							favorites={this.state.favorites}
							addFavorite={this.addFavorite}
							removeFavorite={this.removeFavorite}
						/>
					</>
				)} />
				) }
				{ this.state.warning ? <p>{this.state.warning}</p> : null }
				<Route exact path ="/favorites" render={() => (
					<Favorites
						favorites={this.state.favorites}
						removeFavorite={this.removeFavorite}
					/>
				)} />
			</main>
		</div>
		)
	}
}

export default App
