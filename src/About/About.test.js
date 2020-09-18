import React, { memo } from 'react'
import About from './About'
import { MemoryRouter } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('About Component', () => {

	it('Should display four sections of information', () => {
		render(<MemoryRouter><About /></MemoryRouter>)
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