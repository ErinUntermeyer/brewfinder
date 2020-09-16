import React from 'react'
import { render } from '@testing-library/react'
import Breweries from './Breweries'
import { MemoryRouter } from 'react-router-dom'

describe('Breweries Component', () => {

	it('Should', () => {
		render(<MemoryRouter><Breweries /></MemoryRouter>)

	})

})