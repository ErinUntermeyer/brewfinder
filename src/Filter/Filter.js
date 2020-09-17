import React from 'react'
import barSign from '../assets/bar-sign.png'
import './Filter.scss'

const Filter = ({ filterBreweriesByType }) => {

	return (
		<section className="Filter">
			<img src={barSign} alt="Bar sign with a beer on it" className="bar-sign"/>
			<p>filter by<br></br> brewery type</p>
			<div>
				<button onClick={(e) => filterBreweriesByType("micro")}>
					micro
				</button>
				<button onClick={(e) => filterBreweriesByType("regional")}>
					regional
				</button>
				<button onClick={(e) => filterBreweriesByType("brewpub")}>
					brewpub
				</button>
				<button onClick={(e) => filterBreweriesByType("large")}>
					large
				</button>
				<br></br>
				<button onClick={(e) => filterBreweriesByType("planning")}>
					planning
				</button>
				<button onClick={(e) => filterBreweriesByType("bar")}>
					bar
				</button>
				<button onClick={(e) => filterBreweriesByType("contract")}>
					contract
				</button>
				<button onClick={(e) => filterBreweriesByType("proprietor")}>
					proprietor
				</button>
			</div>
		</section>
	)
	
}

export default Filter

// types: micro, regional, brewpub, large, planning, bar, contract, proprietor