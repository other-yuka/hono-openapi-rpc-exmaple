import { OpenAPIHono } from '@hono/zod-openapi'
import { userGetRoute, userPostRoute } from './routes'

const webApp = new OpenAPIHono({
	defaultHook: async (result, c) => {
		if (!result.success) {
			return c.json(
				{
					message: `Validation Error. ${result.error}`,
				},
				400,
			)
		}
		return
	},
})

export const webRouter = webApp
	.openapi(userGetRoute, async (c) => {
		return c.json({
			user: 'users',
		})
	})
	.openapi(userPostRoute, async (c) => {
		const { name, age } = c.req.valid('json')
		const header = c.req.header()
		console.log(header)
		return c.json({
			message: `Hello, ${name}. Your age is ${age}.`,
		})
	})
