import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { get20BreweriesByPage, getBreweriesByType, getBreweriesByCity } from '../helpers/apiCalls'
import Header from '../Header/Header'
import Welcome from '../Welcome/Welcome'
import About from '../About/About'
import Favorites from '../Favorites/Favorites'
import Breweries from '../Breweries/Breweries'
import Filter from '../Filter/Filter'
import './App.scss'

class App extends Component {
	constructor() {
		super()
		this.state = {
			breweries: [],
			pageNumber: 1,
			favoriteIds: [],
			favoriteBreweriesData: [],
			type: '',
			city: '',
			warning: '',
			error: '',
			firstLoad: true
		}
	}

	componentDidMount() {
		this.getBreweries()
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.pageNumber !== prevState.pageNumber && this.state.type === '' && this.state.city === '') {
			this.getBreweries()
		}
		if (this.state.pageNumber !== prevState.pageNumber && this.state.type !== '' && this.state.city === '') {
			this.filterBreweriesByType(this.state.type)
		}
		if (this.state.pageNumber !== prevState.pageNumber && this.state.city !== '' && this.state.type === '') {
			this.filterBreweriesByCity(this.state.city)
		}
		if (this.state.type !== prevState.type && this.state.type === '') {
			this.setState({ pageNumber: 1 })
			this.getBreweries()
		}
		if (this.state.type !== prevState.type) {
			this.setState({ pageNumber: 1 })
			this.filterBreweriesByType(this.state.type)
		}
		if (this.state.city !== prevState.city) {
			this.setState({ pageNumber: 1 })
			this.filterBreweriesByCity(this.state.city)
		}
	}

	componentWillUnmount = () => {
		clearTimeout(this.interval)
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
		this.setState({ type: type, city: '' })
	}

	filterBreweriesByCity = city => {
		getBreweriesByCity(city, this.state.pageNumber)
			.then(data => {
				if (data.length > 0) {
					this.setState({ breweries: data, city: city, type: '' })
				} else if (data.length === 0) {
					this.setState({ breweries: data, city: 'invalid entry', type: '' })
				}
			})
			.catch(error => {
				this.setState({ error: 'I\'m sorry, we could not retrieve any breweries at this time. Please try again later!' })
			})
	}

	clearCityFromState = () => {
		this.setState({ city: '' })
	}

	closeWelcome = () => {
		this.setState({ firstLoad: false })
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
		this.interval = setTimeout(() => {
			this.setState({ warning: '' })
		}, 1000)
	}

	render() {
		return (
		<div className="App">
			<Header />
			<main>
				{ this.state.firstLoad ?
				<Welcome
					firstLoad={this.state.firstLoad}
					closeWelcome={this.closeWelcome}
				/> : null }
				{ this.state.error || this.state.firstLoad ? <h1 className="error">{this.state.error}</h1> : (
				<Route exact path="/" render={() => (
					<>
						<Filter 
							setStateByType={this.setStateByType}
							type={this.state.type}
							filterBreweriesByCity={this.filterBreweriesByCity}
							city={this.state.city}
							clearCityFromState={this.clearCityFromState}
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
