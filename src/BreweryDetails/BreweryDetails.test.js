import React from 'react'
import BreweryDetails from './BreweryDetails'
import { MemoryRouter } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('BreweryDetails Component', () => {
	let brewery

	beforeEach(() => {
		brewery = {
			"id": 1234,
			"name": "Just the brew you're looking for",
			"brewery_type": "large",
			"street": "555 Brew St",
			"city": "Boulder",
			"state": "Colorado",
			"postal_code": "80301",
			"country": "United States",
			"longitude": "-105",
			"latitude": "40",
			"phone": "1234567890",
			"website_url": "http://www.brewrific.com",
			"updated_at": "now"
		}
	})

	it('Should display the details of a brewery', () => {
		render(
			<MemoryRouter>
				<BreweryDetails
					show={true}
					handleClose={jest.fn()}
					brewery={brewery}
					favorites={[]}
					addFavorite={jest.fn()}
					removeFavorite={jest.fn()}
				/>
			</MemoryRouter>)
		const name = screen.getByRole('heading', { name: /just the brew you\'re looking for/i})
		const address = screen.getByText(/555 brew st/i)
		const phone = screen.getByText(/123-456-7890/i)
		expect(name).toBeInTheDocument()
		expect(address).toBeInTheDocument()
		expect(phone).toBeInTheDocument()
	})

	it('Should display three links', () => {
		render(
			<MemoryRouter>
				<BreweryDetails
					show={true}
					handleClose={jest.fn()}
					brewery={brewery}
					favorites={[]}
					addFavorite={jest.fn()}
					removeFavorite={jest.fn()}
				/>
			</MemoryRouter>)
			const websiteLink = screen.getByRole('link', { name: /view website/i})
			const favoriteButton = screen.getByRole('button', { name: /add to favorites/i})
			const closeButton = screen.getByRole('button', { name: /close/i})
			expect(websiteLink).toBeInTheDocument()
			expect(favoriteButton).toBeInTheDocument()
			expect(closeButton).toBeInTheDocument()
	})
	
})