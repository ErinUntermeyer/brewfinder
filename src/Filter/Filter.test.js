import React from 'react'
import Filter from './Filter'
import { MemoryRouter } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Filter Component', () => {

	it('Should display filter buttons', () => {
		render(
			<MemoryRouter>
				<Filter
					setStateByType={jest.fn()}
					type={'type'}
					filterBreweriesByCity={jest.fn()}
					city={'Denver'}
					clearCityFromState={jest.fn()}
				/>
			</MemoryRouter>
		)
		const description = screen.getByText(/filter by/i)
		const micro = screen.getByRole('button', { name: /micro/i })
		const brewpub = screen.getByRole('button', { name: /brewpub/i })
		const regional = screen.getByRole('button', { name: /regional/i })
		const large = screen.getByRole('button', { name: /large/i })
		const contract = screen.getByRole('button', { name: /contract/i })
		const proprietor = screen.getByRole('button', { name: /proprietor/i })
		const all = screen.getByRole('button', { name: /all/i })
		expect(description).toBeInTheDocument()
		expect(micro).toBeInTheDocument()
		expect(brewpub).toBeInTheDocument()
		expect(regional).toBeInTheDocument()
		expect(large).toBeInTheDocument()
		expect(contract).toBeInTheDocument()
		expect(proprietor).toBeInTheDocument()
		expect(all).toBeInTheDocument()
	})

	it('Should fire the correct method when type button clicked', () => {
		const setStateByType = jest.fn()
		render(
			<MemoryRouter>
				<Filter
					setStateByType={setStateByType}
					type={'micro'}
					filterBreweriesByCity={jest.fn()}
					city={'Denver'}
					clearCityFromState={jest.fn()}
				/>
			</MemoryRouter>
		)
		const micro = screen.getByRole('button', { name: /micro/i })
		fireEvent.click(micro)
		expect(setStateByType).toBeCalledTimes(1)
		expect(setStateByType).toBeCalledWith('micro')
	})

	it('Should display a search field for city name', () => {
		render(
			<MemoryRouter>
				<Filter
					setStateByType={jest.fn()}
					type={'micro'}
					filterBreweriesByCity={jest.fn()}
					city={'Denver'}
					clearCityFromState={jest.fn()}
				/>
			</MemoryRouter>
		)
		const searchField = screen.getByRole('textbox')
		expect(searchField).toBeInTheDocument()
	})

	it('Should fire the correct methods when search button clicked', () => {
		const filterBreweriesByCity = jest.fn()
		render(
			<MemoryRouter>
				<Filter
					setStateByType={jest.fn()}
					type={'micro'}
					filterBreweriesByCity={filterBreweriesByCity}
					city={'Denver'}
					clearCityFromState={jest.fn()}
				/>
			</MemoryRouter>
		)
		const searchButton = screen.getByRole('button', { name: /search/i })
		fireEvent.click(searchButton)
		expect(filterBreweriesByCity).toBeCalledTimes(1)
	})

	it('Should display the search input below search field', async () => {
		const { findByText } = render(
			<MemoryRouter>
				<Filter
					setStateByType={jest.fn()}
					type={'micro'}
					filterBreweriesByCity={jest.fn()}
					city={'Denver'}
					clearCityFromState={jest.fn()}
				/>
			</MemoryRouter>
		)
		const searchField = screen.getByRole('textbox')
		fireEvent.change(searchField, { target: { value: /denver/i } })
		const searchButton = screen.getByRole('button', { name: /search/i })
		fireEvent.click(searchButton)
		const description = await findByText(/current city: denver/i)
		expect(description).toBeInTheDocument()
	})

})