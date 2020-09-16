import React, { Component } from 'react'
import './Breweries.scss'

class Breweries extends Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	
	makeList = breweries => {
		return breweries.map(brewery => {
			return (
				<article className="brewery-box" key={brewery.id}>
					<h3>{brewery.name}</h3>
					<p>{brewery.city}, CO</p>
				</article>
			)
		})
	}

	render() {
		return (
			<div>
				<section className="Breweries">
					{this.makeList(this.props.breweries)}
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
			</div>
		)
	}
}

export default Breweries