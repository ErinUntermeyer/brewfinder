import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { get20BreweriesByPage } from '../helpers/apiCalls'
import Header from '../Header/Header'
import Breweries from '../Breweries/Breweries'
import './App.scss'

class App extends Component {
	constructor() {
		super()
		this.state = {
			breweries: [],
			pageNumber: 1,
			warning: '',
			error: ''
		}
	}

	componentDidMount() {
		this.getBreweries()
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.pageNumber !== prevState.pageNumber) {
			this.getBreweries()
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

	changePage = direction => {
		if (direction === 'back' && this.state.pageNumber === 1) {
			this.displayWarning('You\'re on the first page!')
		} else if (direction === 'back' && this.state.pageNumber > 1) {
			this.setState({ pageNumber: this.state.pageNumber - 1 })
		} else if (direction === 'forward') {
			this.setState({ pageNumber: this.state.pageNumber + 1 })
		}
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
						<Breweries
							breweries={this.state.breweries}
							changePage={this.changePage}
						/>
					)}
				/>
				) }
				{ this.state.warning ? <p>{this.state.warning}</p> : null }
			</main>
		</div>
		)
	}
}

export default App
