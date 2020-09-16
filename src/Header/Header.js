import React from 'react'
import beerMug from '../assets/beer.png'
import './Header.scss'
import { NavLink } from 'react-router-dom'

const Header = () => {
	return (
		<header className="Header">
			<div className="title-box">
				<img src={beerMug} alt="Beer mug" className="logo" />
				<h1 className="app-title">brewfinder</h1>
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
					favorites
				</NavLink>
			</nav>
		</header>
	)
}

export default Header