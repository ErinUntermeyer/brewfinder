import React from 'react'
import { render, screen } from '@testing-library/react'
import Header from './Header'

describe('Header Component', () => {

	it('Should display a title and logo', () => {
		render(<Header />)
		const title = screen.getByRole('heading', { name: /brewfinder/i })
		const logo = screen.getByAltText(/beer mug/i)
		expect(title).toBeInTheDocument()
		expect(logo).toBeInTheDocument()
	})
	
})