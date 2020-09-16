import React from 'react'
import { render, screen } from '@testing-library/react'
import Breweries from './Breweries'
import { MemoryRouter } from 'react-router-dom'

describe('Breweries Component', () => {

	it('Should display a list of breweries upon load', () => {
		render(<MemoryRouter><Breweries /></MemoryRouter>)
		// const breweries
		screen.debug()
	})

})