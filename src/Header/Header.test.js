import React from 'react'
import { render, screen } from '@testing-library/react'
import Header from './Header'
import { MemoryRouter } from 'react-router-dom'

describe('Header Component', () => {

	it('Should display a title and logo', () => {
		render(<MemoryRouter><Header /></MemoryRouter>)
		const title = screen.getByRole('heading', { name: /brewfinder/i })
		const logo = screen.getByAltText(/beer mug/i)
		const tagline = screen.getByText(/experience colorado one hops at a time/i)
		expect(title).toBeInTheDocument()
		expect(logo).toBeInTheDocument()
		expect(tagline).toBeInTheDocument()
	})

	it('Should display navigation links', () => {
		render(<MemoryRouter><Header /></MemoryRouter>)
		const homeLink = screen.getByRole('link', { name: /home/i })
		const aboutLink = screen.getByRole('link', { name: /about/i })
		const favoritesLink = screen.getByRole('link', { name: /favorites/i })
		const favoritesIcon = screen.getByAltText(/two glasses clinking together/i)
		expect(homeLink).toBeInTheDocument()
		expect(aboutLink).toBeInTheDocument()
		expect(favoritesLink).toBeInTheDocument()
		expect(favoritesIcon).toBeInTheDocument()
	})
	
})