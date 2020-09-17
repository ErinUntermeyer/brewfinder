import React, { Component } from 'react'
import BreweryDetails from '../BreweryDetails/BreweryDetails'
import './Breweries.scss'

class Breweries extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showDetails: false,
			brewery: null
		}
	}

	showDetails = () => {
		this.setState({ showDetails: true })
	}

	hideDetails = () => {
		this.setState({ showDetails: false })
	}

	makeBreweryList = () => {
		return this.props.breweries.map(brewery => {
			return (
				<article className="brewery-box" key={brewery.id}>
					<h3>{brewery.name}</h3>
					<p>{brewery.city}, CO</p>
					<button
						className="details-button"
						onClick={() => {
							this.showDetails()
							this.setState({ brewery: brewery })
						}}>
						details
					</button>
				</article>
			)
		})
	}

	render() {
		return (
			<div>
				<section className="Breweries">
					{this.makeBreweryList()}
				</section>
				<button
					className="back-button"
					onClick={(e) => this.props.changePage('back')}>
					Previous 20
				</button>
				<button
					className="forward-button"
					onClick={(e) => this.props.changePage('forward')}>
					Next 20
				</button>
				{ this.state.brewery ? (
				<BreweryDetails
					show={this.state.showDetails}
					handleClose={this.hideDetails}
					brewery={this.state.brewery}
				/> ) : null }
			</div>
		)
	}
}

export default Breweries