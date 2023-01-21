import express from "express";

import { authMiddleware } from "../../../middlewares/auth/auth_middleware";
import { User } from "../../../models/users/user";
import { UserService } from "../../../services/users_service/user_service";

const userRoutes = express.Router();

// User routes

userRoutes.get("/user", authMiddleware, async (req: express.Request, res) => {
	// #swagger.tags = ['User']
	// #swagger.description = 'Endpoint to get a user'
	// #swagger.summary = 'Get a user'
	// #swagger.parameters['obj'] = { description: 'User id', in: 'body', required: true, type: 'object', schema: { id: 'number' } }
	// #swagger.responses[200] = { description: 'Success' }
	// #swagger.responses[500] = { description: 'Internal Server Error' }
	await UserService.getUser(req.body.id)
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((error) => {
			res.status(404).json(error);
		});
});

userRoutes.get("/users", authMiddleware, async (req: express.Request, res) => {
	// #swagger.tags = ['User']
	// #swagger.description = 'Endpoint to get all users'
	// #swagger.summary = 'Get all users'
	// #swagger.auth = true
	// #swagger.security = [{ "bearerAuth": [] }]
	// #swagger.responses[200] = { description: 'Success' }
	// #swagger.responses[500] = { description: 'Internal Server Error' }
	await UserService.getUsers()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((error) => {
			res.status(404).json(error);
		});
});

userRoutes.post("/user", async (req, res) => {
	// #swagger.tags = ['User']
	// #swagger.summary = 'Create a user'
	// #swagger.description = 'Endpoint
	// #swagger.parameters['obj'] = { description: 'User object', in: 'body', required: true, type: 'object', schema: { prenom: 'string', nom: 'string', sexe: 'string', nom_utilisateur: 'string', date_naissance: 'string', email: 'string', password: 'string', telephone: 'string', code_pays: 'string', photo: 'string' } }
	// #swagger.responses[200] = { description: 'User Created' }
	// #swagger.responses[500] = { description: 'Internal Server Error' }
	const user = new User();
	user.prenom = req.body.prenom;
	user.nom = req.body.nom;
	user.sexe = req.body.sexe;
	user.nom_utilisateur = req.body.nom_utilisateur;
	user.date_naissance = req.body.date_naissance;
	user.email = req.body.email;
	user.password = req.body.password;
	user.telephone = req.body.telephone;
	user.code_pays = req.body.code_pays;
	user.photo = req.body.photo;
	await UserService.createUser(user)
		.then((response) => {
			res.status(201).json({ message: "User created", data: response });
		})
		.catch((error) => {
			res.status(500).json(error);
		});
});

userRoutes.put("/user", (req: express.Request, res) => {
	// #swagger.tags = ['User']
	const response = UserService.updateUser(
		req.body.id,
		req.body.firstName,
		req.body.lastName,
		req.body.age
	);
	res.status(202).json(response);
});

userRoutes.delete("/user", (req: express.Request, res) => {
	// #swagger.tags = ['User']
	const response = UserService.deleteUser(req.body.id);
	res.status(204).json(response);
});

module.exports = userRoutes;
