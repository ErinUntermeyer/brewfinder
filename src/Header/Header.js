import React from 'react'
import { NavLink } from 'react-router-dom'
import beerMug from '../assets/beer.png'
import cheers from '../assets/cheers.png'
import './Header.scss'

const Header = () => {
	return (
		<header className="Header">
			<div className="slogan">
				<div className="title-box">
					<img src={beerMug} alt="Beer mug" className="logo" />
					<h1 className="app-title">brewfinder</h1>
				</div>
				<h2>experience Colorado one hops at a time</h2>
			</div>
			<nav>
				<NavLink to="/"
					style={{ textDecoration: "none" }}>
					home
				</NavLink>
				<NavLink to="/about">
					about
				</NavLink>
				<NavLink to="/favorites">
					<div className="favorite-box">
						<img src={cheers} alt="Two glasses clinking together" className="cheers" />
						favorites
					</div>
				</NavLink>
			</nav>
		</header>
	)
}

export default Header