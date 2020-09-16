import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import Header from '../Header/Header'
import Breweries from '../Breweries/Breweries'
import './App.scss'

const App = () => {

	return (
		<div className="App">
			<Header />
			<main>
				<Route exact path="/" render={() => (
						<Breweries />
					)}
				/>
			</main>
		</div>
	)
}

export default App
