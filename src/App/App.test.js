import React from 'react'
import App from './App'
import { MemoryRouter } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { get20BreweriesByPage, getBreweriesByType } from '../helpers/apiCalls'
import { breweries } from '../helpers/data'
jest.mock('../helpers/apiCalls')

describe('App Component', () => {
	let mockedBreweries, mockedBreweriesByType

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
				"brewery_type": "brewpub",
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
		mockedBreweriesByType = [
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
			}
		]
	})

	it('Should render a header upon load', () => {
		get20BreweriesByPage.mockResolvedValueOnce(mockedBreweries)
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

	it('Should display error if fetch is not successful', async () => {
		get20BreweriesByPage.mockRejectedValueOnce(404)
		const { findByText } = render(<MemoryRouter><App /></MemoryRouter>)
		const error = await findByText(/i\'m sorry, we could not retrieve any breweries at this time. please try again later!/i)
		expect(error).toBeInTheDocument()
	})

	it('Should allow a user to view previous/next 20 breweries', async () => {
		get20BreweriesByPage.mockClear()
		// using test data here so that breweries are greater than 20, allowing for the get20BreweriesByPage to be called twice
		get20BreweriesByPage.mockResolvedValue(breweries)
		const { findByRole } = render(<MemoryRouter><App /></MemoryRouter>)

		const forwardButton = await findByRole('button', { name: /next 20/i })
		expect(forwardButton).toBeInTheDocument()
		fireEvent.click(forwardButton)
		expect(get20BreweriesByPage).toBeCalledTimes(2)
	})

	it('Should display warning if there is no previous page', async () => {
		get20BreweriesByPage.mockResolvedValueOnce(mockedBreweries)
		const { findByText } = render(<MemoryRouter><App /></MemoryRouter>)
		const backButton = screen.getByRole('button', { name: /previous 20/i })
		fireEvent.click(backButton)
		const warning = await findByText(/you\'re on the first page!/i)
		expect(warning).toBeInTheDocument()
	})

	it('Should display warning if there is no next page', async () => {
		get20BreweriesByPage.mockResolvedValueOnce(mockedBreweries)
		const { findByText } = render(<MemoryRouter><App /></MemoryRouter>)
		const forwardButton = screen.getByRole('button', { name: /next 20/i })
		fireEvent.click(forwardButton)
		const warning2 = await findByText(/you\'re on the last page!/i)
		expect(warning2).toBeInTheDocument()
	})

	it('Should allow a user to view details of a brewery', async () => {
		get20BreweriesByPage.mockResolvedValueOnce(mockedBreweries)
		const { findAllByRole } = render(<MemoryRouter><App /></MemoryRouter>)
		const detailsButton = await findAllByRole('button', { name: /details/i })
		expect(detailsButton[0]).toBeInTheDocument()
		fireEvent.click(detailsButton[0])
		// doing getAllByRole here because the Brewery component is visible in the background of the BreweryDetails modal
		const name = screen.getAllByRole('heading', { name: /casey and khalid\'s backup plan/i })
		const address = screen.getByText(/123 turing ave/i)
		const phone = screen.getByText(/555-555-5555/i)
		expect(name[0]).toBeInTheDocument()
		expect(address).toBeInTheDocument()
		expect(phone).toBeInTheDocument()
	})

	it('Should allow a user to view the breweries website', () => {
		// need to research how to test that an outside link is fired
	})

	it('Should allow a user to close the details view and keep browsing', async () => {
		get20BreweriesByPage.mockResolvedValueOnce(mockedBreweries)
		const { findAllByRole } = render(<MemoryRouter><App /></MemoryRouter>)
		const detailsButton = await findAllByRole('button', { name: /details/i })
		expect(detailsButton[0]).toBeInTheDocument()
		fireEvent.click(detailsButton[0])
		const closeButton = screen.getByRole('button', { name: /close/i })
		expect(closeButton).toBeInTheDocument()
		fireEvent.click(closeButton)
		expect(closeButton).not.toBeInTheDocument()
	})

	it('Should allow a user to favorite/unfavorite a brewery', async () => {
		get20BreweriesByPage.mockResolvedValueOnce(mockedBreweries)
		const { findAllByRole, findByRole } = render(<MemoryRouter><App /></MemoryRouter>)
		const detailsButton = await findAllByRole('button', { name: /details/i })
		expect(detailsButton[0]).toBeInTheDocument()
		fireEvent.click(detailsButton[0])
		const favoriteButton = screen.getByRole('button', { name: /add to favorites/i })
		expect(favoriteButton).toBeInTheDocument()
		fireEvent.click(favoriteButton)
		const unfavoriteButton = await findByRole('button', { name: /unfavorite/i })
		expect(unfavoriteButton).toBeInTheDocument()
		fireEvent.click(unfavoriteButton)
		expect(await findByRole('button', { name: /add to favorites/i })).toBeInTheDocument()
	})

	it('Should allow a user to view their favorites', async () => {
		get20BreweriesByPage.mockResolvedValueOnce(mockedBreweries)
		const { findAllByRole } = render(<MemoryRouter><App /></MemoryRouter>)
		const detailsButton = await findAllByRole('button', { name: /details/i })
		expect(detailsButton[0]).toBeInTheDocument()
		fireEvent.click(detailsButton[0])
		const favoriteButton = screen.getByRole('button', { name: /add to favorites/i })
		expect(favoriteButton).toBeInTheDocument()
		fireEvent.click(favoriteButton)
		const closeButton = screen.getByRole('button', { name: /close/i })
		fireEvent.click(closeButton)
		const favorites = screen.getByRole('link', { name: /favorites/i })
		fireEvent.click(favorites)
		const name = screen.getByRole('heading', { name: /casey and khalid\'s backup plan/i })
		const address = screen.getByText(/123 turing ave/i)
		const phone = screen.getByText(/555-555-5555/i)
		expect(name).toBeInTheDocument()
		expect(address).toBeInTheDocument()
		expect(phone).toBeInTheDocument()
	})

	it('Should allow a user to unfavorite from favorites page', async () => {
		get20BreweriesByPage.mockResolvedValueOnce(mockedBreweries)
		const { findAllByRole } = render(<MemoryRouter><App /></MemoryRouter>)
		const detailsButton = await findAllByRole('button', { name: /details/i })
		fireEvent.click(detailsButton[0])
		const favoriteButton = screen.getByRole('button', { name: /add to favorites/i })
		fireEvent.click(favoriteButton)
		const closeButton = screen.getByRole('button', { name: /close/i })
		fireEvent.click(closeButton)
		const favorites = screen.getByRole('link', { name: /favorites/i })
		fireEvent.click(favorites)
		const unfavoriteButton = screen.getByRole('button', { name: /unfavorite/i })
		fireEvent.click(unfavoriteButton)
		const name = screen.queryByRole('heading', { name: /casey and khalid\'s backup plan/i })
		expect(name).not.toBeInTheDocument()
	})

	it('Should fetch breweries by type when filter button clicked', async () => {
		get20BreweriesByPage.mockResolvedValueOnce(mockedBreweries)
		getBreweriesByType.mockResolvedValueOnce(mockedBreweriesByType)
		render(<MemoryRouter><App /></MemoryRouter>)
		const microButton = screen.getByRole('button', { name: /micro/i })
		fireEvent.click(microButton)
		expect(getBreweriesByType).toBeCalledTimes(1)
	})

	it('Should allow a user to view the about page', async () => {
		get20BreweriesByPage.mockResolvedValueOnce(mockedBreweries)
		const { findByRole } = render(<MemoryRouter><App /></MemoryRouter>)
		const aboutButton = await findByRole('link', { name: /about/i })
		fireEvent.click(aboutButton)
		const summary = screen.getByRole('heading', { name: /summary/i })
		const definitions = screen.getByRole('heading', { name: /definitions/i })
		const relatedLinks = screen.getByRole('heading', { name: /related links/i })
		const credits = screen.getByRole('heading', { name: /credits/i })
		expect(summary).toBeInTheDocument()
		expect(definitions).toBeInTheDocument()
		expect(relatedLinks).toBeInTheDocument()
		expect(credits).toBeInTheDocument()
	})

})