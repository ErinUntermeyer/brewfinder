import React from 'react'
import Filter from './Filter'
import { MemoryRouter } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Filter Component', () => {

	it('Should display text and buttons', () => {
		render(
			<MemoryRouter>
				<Filter
					setStateByType={jest.fn()}
					type={'type'}
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

	it('Should fire the correct method when button clicked', () => {
		const setStateByType = jest.fn()
		render(
			<MemoryRouter>
				<Filter
					setStateByType={setStateByType}
					type={'micro'}
				/>
			</MemoryRouter>
		)
		const micro = screen.getByRole('button', { name: /micro/i })
		fireEvent.click(micro)
		expect(setStateByType).toBeCalledTimes(1)
		expect(setStateByType).toBeCalledWith('micro')
	})

})