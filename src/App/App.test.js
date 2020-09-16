import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App Component', () => {

	it('Should render a header upon load', () => {
		render(<App />)
		const title = screen.getByRole('heading', { name: /brewfinder/i })
		expect(title).toBeInTheDocument()
	})

})