import { z } from '@hono/zod-openapi'

export const UserReqSchema = z.object({
	name: z.string().min(1).openapi({
		description: 'user name',
		example: 'named',
	}),
	age: z.number().min(1).openapi({
		description: 'user age',
		example: 99,
	}),
})

export const UserGetResSchema = z.object({
	user: z.string().min(1),
})

export const UserPostResSchema = z.object({
	message: z.string().min(1),
})

export const ErrorSchema = z.object({
	message: z.string().openapi({
		example: 'Bad Request',
	}),
})
