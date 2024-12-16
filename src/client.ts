import type { AppType } from '@/server.ts'
import { hc } from 'hono/client'

const client = hc<AppType>('http://localhost:3000/')

const res = await client.users.$get()

console.log(res)