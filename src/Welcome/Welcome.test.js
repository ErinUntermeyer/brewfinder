import React from 'react'
import Welcome from './Welcome'
import { MemoryRouter } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Welcome Component', () => {

	it('Should display a welcome message', () => {
		render(
			<MemoryRouter>
				<Welcome
					firstLoad={true}
					closeWelcome={jest.fn()}
				/>
			</MemoryRouter>
		)
		const title = screen.getByRole('heading', { name: /welcome to/i })
		const message = screen.getByText(/are you an avid beer lover?/i)
		expect(title).toBeInTheDocument()
		expect(message).toBeInTheDocument()
	})

	it('Should display a get started button', () => {
		render(
			<MemoryRouter>
				<Welcome
					firstLoad={true}
					closeWelcome={jest.fn()}
				/>
			</MemoryRouter>
		)
		const button = screen.getByRole('button', { name: /get started/i })
		expect(button).toBeInTheDocument()
	})

	it('Should fire the correct method when button clicked', () => {
		const closeWelcome = jest.fn()
		render(
			<MemoryRouter>
				<Welcome
					firstLoad={true}
					closeWelcome={closeWelcome}
				/>
			</MemoryRouter>
		)
		const button = screen.getByRole('button', { name: /get started/i })
		fireEvent.click(button)
		expect(closeWelcome).toBeCalledTimes(1)
	})
	
})