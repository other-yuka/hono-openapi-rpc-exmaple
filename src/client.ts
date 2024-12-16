import type { AppType } from '@/server.ts'
import { hc } from 'hono/client'

const client = hc<AppType>('http://localhost:3000/', {
    fetch: (input: RequestInfo | URL, requestInit?: RequestInit) => {
        const headers = new Headers(requestInit?.headers)
        headers.set('x-custom-header', 'x-custom-header-value')
        return fetch(input, {
            ...requestInit,
            headers,
        })
    },
})

const res = await client.api.users.$post({
    json: {
        name: 'yuka',
        age: 99,
    },
})

if (res.ok) {
    const data = await res.json()
    console.log(data)
}