import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { get20BreweriesByPage, getBreweriesByType } from '../helpers/apiCalls'
import Header from '../Header/Header'
import Breweries from '../Breweries/Breweries'
import Filter from '../Filter/Filter'
import Favorites from '../Favorites/Favorites'
import About from '../About/About'
import './App.scss'

class App extends Component {
	constructor() {
		super()
		this.state = {
			breweries: [],
			pageNumber: 1,
			favoriteIds: [],
			favoriteBreweriesData: [],
			type: "all",
			warning: '',
			error: ''
		}
	}

	componentDidMount() {
		this.getBreweries()
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.pageNumber !== prevState.pageNumber && this.state.type === "all") {
			this.getBreweries()
		}
		if (this.state.pageNumber !== prevState.pageNumber && this.state.type !== "all") {
			this.filterBreweriesByType(this.state.type)
		}
		if (this.state.type !== prevState.type && this.state.type === "all") {
			this.setState({ pageNumber: 1 })
			this.getBreweries()
		}
		if (this.state.type !== prevState.type) {
			this.setState({ pageNumber: 1 })
			this.filterBreweriesByType(this.state.type)
		}
	}

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

	addFavorite = async brewery => {
		if (!this.state.favoriteIds.find(id => id === brewery.id)) {
			this.setState({ favoriteIds: [...this.state.favoriteIds, brewery.id] })
		}
		this.setState({ favoriteBreweriesData: [...this.state.favoriteBreweriesData, brewery] })
	}

	removeFavorite = brewery => {
		this.setState({ favoriteIds: this.state.favoriteIds.filter(favorite => favorite !== brewery.id) })
		this.setState({ favoriteBreweriesData: this.state.favoriteBreweriesData.filter(favorite => favorite.id !== brewery.id) })
	}

	displayWarning = message => {
		this.setState({ warning: message })
		setTimeout(() => {
			this.setState({ warning: '' })
		}, 1000)
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
								{this.state.warning ? <p className="warning">{this.state.warning}</p> : <p className= "warning-space">.</p>}
						<Breweries
							breweries={this.state.breweries}
							changePage={this.changePage}
							favoriteIds={this.state.favoriteIds}
							addFavorite={this.addFavorite}
							removeFavorite={this.removeFavorite}
						/>
					</>
				)} />
				) }
				<Route exact path ="/favorites" render={() => (
					<Favorites
						favoriteBreweriesData={this.state.favoriteBreweriesData}
						removeFavorite={this.removeFavorite}
					/>
				)} />
				<Route exact path ="/about" render={() => (
					<About />
				)} />
			</main>
		</div>
		)
	}
}

export default App
