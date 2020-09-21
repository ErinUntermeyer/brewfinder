import React from 'react'
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

	it('Should display information in each section', () => {
		render(<MemoryRouter><About /></MemoryRouter>)
		const summarySection = screen.getByText(/designed for avid beer lovers/i)
		const definitionsSection = screen.getByText(/combination of a brewery and/i)
		const relatedLinksSection = screen.getByRole('link', { name: /durango brew train/i })
		const creditsSection = screen.getByRole('link', { name: /open brewery db/i })
		expect(summarySection).toBeInTheDocument()
		expect(definitionsSection).toBeInTheDocument()
		expect(relatedLinksSection).toBeInTheDocument()
		expect(creditsSection).toBeInTheDocument()
	})

	it('Should allow a user to view related links', () => {
		render(<MemoryRouter><About /></MemoryRouter>)
		const coloradoBeerEvents = screen.getByRole('link', { name: /colorado beer events/i })
		const durangoBrewTrain = screen.getByRole('link', { name: /durango brew train/i })
		const denverBeerTrail = screen.getByRole('link', { name: /denver beer trail/i })
		const coloradoBeerFests = screen.getByRole('link', { name: /colorado beer festivals/i })
		expect(coloradoBeerEvents.getAttribute('href')).toBe('https://coloradobeer.org/events/')
		expect(durangoBrewTrain.getAttribute('href')).toBe('https://www.colorado.com/events/durango-brew-train')
		expect(denverBeerTrail.getAttribute('href')).toBe('https://www.denver.org/restaurants/denver-bars-clubs/denver-beer-trail/')
		expect(coloradoBeerFests.getAttribute('href')).toBe('https://beerfests.com/us/colorado-beer-festivals/')
	})
	
})