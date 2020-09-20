import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
						view details
					</button>
				</article>
			)
		})
	}

	render() {
		return (
			<>
			<div className="page-button-box">
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
			</div>
			<section className="Breweries">
				{this.makeBreweryList()}
			</section>
			{ this.state.brewery && this.state.showDetails ? (
				<BreweryDetails
					show={this.state.showDetails}
					handleClose={this.hideDetails}
					brewery={this.state.brewery}
					favoriteIds={this.props.favoriteIds}
					addFavorite={this.props.addFavorite}
					removeFavorite={this.props.removeFavorite}
				/>
			) : null }
			</>
		)
	}
}

export default Breweries

Breweries.propTypes = {
	breweries: PropTypes.array.isRequired,
	changePage: PropTypes.func.isRequired,
	favoriteIds: PropTypes.array,
	addFavorite: PropTypes.func.isRequired,
	removeFavorite: PropTypes.func.isRequired
}