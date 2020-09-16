const baseUrl = 'https://api.openbrewerydb.org/breweries?by_state=colorado'

export const get20BreweriesByPage = pageNumber => {
	return fetch(`${baseUrl}&per_page=20&page=${pageNumber}`)
		.then(response => {
			if (response.ok) {
				return response.json()
					.then(data => {
						return data
					})
			} else {
				throw response
			}
		})
}