import React from 'react'
import App from './App'
import { MemoryRouter } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { get20BreweriesByPage } from '../helpers/apiCalls'
jest.mock('../helpers/apiCalls')

describe('App Component', () => {
	let mockedBreweries

	beforeEach(() => {
		mockedBreweries = [
			{
				"id": 1234,
				"name": "Casey and Khalid's Backup Plan",
				"brewery_type": "micro",
				"street": "123 Turing Ave",
				"city": "Denver",
				"state": "Colorado",
				"postal_code": "80203",
				"country": "United States",
				"longitude": "-100",
				"latitude": "40",
				"phone": "5555555555",
				"website_url": "http://www.backupplan.com",
				"updated_at": "now"
			},
			{
				"id": 4321,
				"name": "Diners, Drive-ins and Devs",
				"brewery_type": "brewpup",
				"street": "555 Fuhgetaboutit",
				"city": "Denver",
				"state": "Colorado",
				"postal_code": "80206",
				"country": "United States",
				"longitude": "-110",
				"latitude": "42",
				"phone": "5555555555",
				"website_url": "http://www.devs.com",
				"updated_at": "always"
			}
		]
	})

	it('Should render a header upon load', () => {
		get20BreweriesByPage.mockResolvedValue(mockedBreweries)
		render(<MemoryRouter><App /></MemoryRouter>)
		const title = screen.getByRole('heading', { name: /brewfinder/i })
		const tagline = screen.getByRole('heading', { name: /experience colorado one hops at a time/i })
		const navButton = screen.getByRole('link', { name: /home/i })
		expect(title).toBeInTheDocument()
		expect(tagline).toBeInTheDocument()
		expect(navButton).toBeInTheDocument()
	})

	it('Should fetch a brewery list upon load', async () => {
		get20BreweriesByPage.mockResolvedValueOnce(mockedBreweries)
		const { findByRole } = render(<MemoryRouter><App /></MemoryRouter>)
		const title1 = await findByRole('heading', { name: /casey and khalid\'s backup plan/i })
		const title2 = await findByRole('heading', { name: /diners, drive-ins and devs/i })
		expect(title1).toBeInTheDocument()
		expect(title2).toBeInTheDocument()
	})

	it.skip('Should allow a user to view previous/next 20 breweries', async () => {
		//researching aftereach cleanup
		get20BreweriesByPage.mockResolvedValue(mockedBreweries)
		render(<MemoryRouter><App /></MemoryRouter>)
		const forwardButton = screen.getByRole('button', { name: /next 20/i })
		fireEvent.click(forwardButton)
		expect(get20BreweriesByPage).toBeCalledTimes(2)
	})

})