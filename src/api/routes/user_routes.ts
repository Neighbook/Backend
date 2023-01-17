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
    await UserService.getUsers()
        .then((users) => {
            res.status(200).json(users)
        })
        .catch((error) => {
            res.status(404).json(error)
        })
})

userRoutes.post('/user', async (req: express.Request, res) => {
    // #swagger.tags = ['User']
	await UserService.createUser(req.body.firstName, req.body.lastName, req.body.age).then((users) => {
		console.log(req.body.firstName)
		console.log("req.body.lastName")
		res.status(201).json(users)
	})
		.catch((error) => {
			res.status(404).json(error)
		})
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
// psql "host=db-neighbook-dev.postgres.database.azure.com port=5432 dbname=postgres user=neighbookadmin password=nZFU9mENeEJK4CM sslmode=require"

// psql postgres://neighbookadmin:nZFU9mENeEJK4CM@db-neighbook-dev.postgres.database.azure.com/postgres?sslmode=require
