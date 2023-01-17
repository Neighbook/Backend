import express from 'express'
const userRoutes = express.Router()
import { UserService } from '../../services/user_service'

// User routes

userRoutes.get('/user', async (req: express.Request, res) => {
	// #swagger.tags = ['User']
	// #swagger.body = { "id": 3 }
	await UserService.getUser(req.body.id)
		.then((response) => {
			res.status(200).json(response)
		})
		.catch((error) => {
			res.status(404).json(error)
		})
})

userRoutes.get('/users', async (req: express.Request, res) => {
	// #swagger.tags = ['User']
	// #swagger.description = 'Endpoint to get all users'
	// #swagger.summary = 'Get all users'
	// #swagger.responses[200] = { description: 'Success' }
	// #swagger.responses[500] = { description: 'Internal Server Error' }
	await UserService.getUsers()
		.then((users) => {
			res.status(200).json(users)
		})
		.catch((error) => {
			res.status(404).json(error)
		})
})

userRoutes.post('/user', async (req, res) => {
	// #swagger.tags = ['User']
	// #swagger.summary = 'Create a user'
	// #swagger.description = 'Endpoint
	// #swagger.parameters['obj'] = { description: 'User object', in: 'body', required: true, type: 'object', schema: { firstName: 'string', lastName: 'string', age: 0 } }
	// #swagger.responses[201] = { description: 'User created' }
	// #swagger.responses[500] = { description: 'Internal Server Error' }
	await UserService.createUser(req.body.firstName, req.body.lastName, req.body.age).then((response) => {
		res.status(201).json({ "message": "User created", "data": response })
		}).catch((error) => {
			res.status(500).json(error)
		});
})

userRoutes.put('/user', (req: express.Request, res) => {
	// #swagger.tags = ['User']
	const response = UserService.updateUser(req.body.id, req.body.firstName, req.body.lastName, req.body.age)
	res.status(202).json(response)
})

userRoutes.delete('/user', (req: express.Request, res) => {
	// #swagger.tags = ['User']
	const response = UserService.deleteUser(req.body.id)
	res.status(204).json(response)
})

module.exports = userRoutes
