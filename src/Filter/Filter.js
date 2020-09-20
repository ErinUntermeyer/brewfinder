import React, { Component } from 'react'
import PropTypes from 'prop-types'
import barSign from '../assets/bar-sign.png'
import search from '../assets/search.png'
import './Filter.scss'

class Filter extends Component {
	constructor(props) {
		super(props)
		this.state = {
			input: ''
		}
	}

	handleInput = e => {
		const inputValue = e.target.value
		this.setState({ input: inputValue })
	}

	clearInput = () => {
		this.setState({ input: '' })
	}

	handleSubmit= e => {
		e.preventDefault()
		this.props.filterBreweriesByCity(this.state.input)
		this.clearInput()
	}

	render() {
		return (
			<div className="Filter-Search-container">
				<section className="Filter">
					<img src={barSign} alt="Bar sign with a beer on it" className="bar-sign"/>
					<p>filter by<br></br> brewery type</p>
					<div>
						<button onClick={(e) => this.props.setStateByType("micro")}>
							micro
						</button>
						<button onClick={(e) => this.props.setStateByType("brewpub")}>
							brewpub
						</button>
						<button onClick={(e) => this.props.setStateByType("regional")}>
							regional
						</button>
						<br></br>
						<button onClick={(e) => this.props.setStateByType("large")}>
							large
						</button>
						<button onClick={(e) => this.props.setStateByType("contract")}>
							contract
						</button>
						<button onClick={(e) => this.props.setStateByType("proprietor")}>
							proprietor
						</button>
						<button onClick={(e) => this.props.setStateByType("")}>
							all
						</button>
						{this.props.type !== "" && <p className="current-filter">current filter: {this.props.type}</p>}
					</div>
				</section>
				<p className="or">OR</p>
				<section className="Search">
					<img src={search} alt="Magnifying glass with city in it" className="search-icon" />
					<form
						className='search-form'
						onSubmit={(e) => this.handleSubmit(e)}>
						<label htmlFor="search">search by city</label>
						<input
							className="search-input"
							type="text"
							id="search"
							value={this.state.input}
							onChange={(e) => this.handleInput(e)}/>
						<button type="submit" className="search-button">search</button>
						<button onClick={(e) => this.props.clearCityFromState()} className="clear-button">reset</button>
						{this.props.city !== "" && <p className="current-filter">current city: {this.props.city}</p>}
					</form>
				</section>
			</div>
		)
	}
}

export default Filter

Filter.propTypes = {
	setStateByType: PropTypes.func.isRequired,
	type: PropTypes.string.isRequired,
	filterBreweriesByCity: PropTypes.func.isRequired,
	city: PropTypes.string.isRequired,
	clearCityFromState: PropTypes.func.isRequired,
}