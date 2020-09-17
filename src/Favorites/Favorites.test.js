import React from 'react'
import Favorites from './Favorites'
import { MemoryRouter } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Favorites Component', () => {
	let favorites

	beforeEach(() => {
		favorites = [
			{
				"id": 420,
				"name": "Catz Rule",
				"brewery_type": "very successful",
				"street": "123 Kitty Cat Ln",
				"city": "Kitty Town",
				"state": "Colorado",
				"postal_code": "80203",
				"country": "United States",
				"longitude": "-1",
				"latitude": "1",
				"phone": "5553217654",
				"website_url": "http://www.catzrule.com",
				"updated_at": "never, it's always purrfect"
			},
			{
				"id": 8675309,
				"name": "Brews and Naps",
				"brewery_type": "brewpub",
				"street": "your bed",
				"city": "Home",
				"state": "Colorado",
				"postal_code": "80206",
				"country": "United States",
				"longitude": "-110",
				"latitude": "42",
				"phone": "5555555555",
				"website_url": "http://www.naps.com",
				"updated_at": "night"
			}
		]
	})

	it('Should render favorite breweries', () => {
		render(
			<MemoryRouter>
				<Favorites
					favorites={favorites}
					removeFavorite={jest.fn()}
				/>
			</MemoryRouter>
		)
		const name = screen.getByRole('heading', { name: /catz rule/i })
		const address = screen.getByText(/123 kitty cat ln/i)
		const phone = screen.getByText(/555-321-7654/i)
		const name2 = screen.getByRole('heading', { name: /brews and naps/i })
		const address2 = screen.getByText(/your bed/i)
		const phone2 = screen.getByText(/555-555-5555/i)
		expect(name).toBeInTheDocument()
		expect(address).toBeInTheDocument()
		expect(phone).toBeInTheDocument()
		expect(name2).toBeInTheDocument()
		expect(address2).toBeInTheDocument()
		expect(phone2).toBeInTheDocument()
	})

	it('Should fire the correct method when unfavorite clicked', () => {
		const removeFavorite = jest.fn()
		render(
			<MemoryRouter>
				<Favorites
					favorites={favorites}
					removeFavorite={removeFavorite}
				/>
			</MemoryRouter>
		)
		const unfavoriteButton = screen.getAllByRole('button', { name: /unfavorite/i })
		fireEvent.click(unfavoriteButton[0])
		expect(removeFavorite).toBeCalledTimes(1)

	})

	it('Should display message if there are no favorites', () => {
		render(
			<MemoryRouter>
				<Favorites
					favorites={[]}
					removeFavorite={jest.fn()}
				/>
			</MemoryRouter>
		)
		const noFavoritesMsg = screen.getByText(/you have no favorites, go add some!/i)
		expect(noFavoritesMsg).toBeInTheDocument()
	})

})