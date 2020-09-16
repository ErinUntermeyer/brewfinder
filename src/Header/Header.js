import React from 'react'
import beerMug from '../assets/beer.png'
import './Header.scss'

const Header = () => {
	return (
		<header className="Header">
			<div className="title-box">
				<img src={beerMug} alt="Beer mug" className="logo" />
				<h1 className="app-title">brewfinder</h1>
			</div>
		</header>
	)
}

export default Header