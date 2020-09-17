import React from 'react'
import barSign from '../assets/bar-sign.png'
import './Filter.scss'

const Filter = () => {

	return (
		<section className="Filter">
			<img src={barSign} alt="Bar sign with a beer on it" className="bar-sign"/>
			<p>filter by<br></br> brewery type</p>
			<div>
				<button>micro</button>
				<button>regional</button>
				<button>brewpub</button>
				<button>large</button>
				<br></br>
				<button>planning</button>
				<button>bar</button>
				<button>contract</button>
				<button>proprietor</button>
			</div>
		</section>
	)
	
}

export default Filter

// types: micro, regional, brewpub, large, planning, bar, contract, proprietor