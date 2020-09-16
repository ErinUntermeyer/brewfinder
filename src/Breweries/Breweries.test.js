import React from 'react'
import Breweries from './Breweries'
import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { get20BreweriesByPage } from '../helpers/apiCalls'
jest.mock('../helpers/apiCalls')

describe('Breweries Component', () => {

	it('Should display a list of breweries upon load', () => {
		const breweries = [
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
		render(
			<MemoryRouter>
				<Breweries
					breweries={breweries}
					changePage={jest.fn()}
				/>
			</MemoryRouter>
		)
		
		const title1 = screen.getByRole('heading', { name: /casey and khalid\'s backup plan/i })
		const title2 = screen.getByRole('heading', { name: /diners, drive-ins and devs/i })

		expect(title1).toBeInTheDocument()
		expect(title2).toBeInTheDocument()
	})

})