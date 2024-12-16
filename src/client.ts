import type { AppType } from '@/server.ts'
import { hc } from 'hono/client'

const client = hc<AppType>('http://localhost:3000/', {
	fetch: (input: RequestInfo | URL, requestInit?: RequestInit) => {
		const headers = new Headers(requestInit?.headers)
		headers.set('x-custom-header', 'x-custom-header-value')
		headers.set('Content-Type', 'application/json')

		return fetch(input, {
			...requestInit,
			headers,
		})
	},
})

// get demo
const getRes = await client.api.web.users.$get()

if (getRes.ok) {
	const data = await getRes.json()
	console.log(data)
}

// post demo
const postRes = await client.api.web.users.$post({
	json: {
		name: 'tama',
		age: 99,
	},
})

if (postRes.ok) {
	const data = await postRes.json()
	console.log(data)
}
