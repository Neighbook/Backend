import { userRepository } from "./user_service";
import { User } from "../../models/users/user";
import * as argon from 'argon2'
import { ServiceException } from "../../core/exeptions/base_exeption";
import * as jwt from "jsonwebtoken"
import { VaultService } from "./vault_service";
import { environnement } from "../../config/environnement";

export class AuthService {
	static async login(email: string, password: string) {
		let user = await userRepository.findOne({
			where: {
				email: email,
			},
		}).catch((error) => {
			console.log('Error: ' + error)
		})
		if (user == null) {
			return new ServiceException('User not found', 404);
		}
		if (!await argon.verify(user.password, password)) {
			return new ServiceException('Wrong password', 401);
		}
		const vault_service = new VaultService()
		const jwt_secret = await vault_service.getSecret(environnement.jwt_secret_key_name)
		if (jwt_secret == null) {
			return new ServiceException('JWT secret not found', 500);
		}
		const token = jwt.sign({
			_user_id: user.id,
			_user_name: user.nom_utilisateur,
			_user_firstname: user.prenom,
			_user_lastname: user.nom
		}, jwt_secret, { expiresIn: environnement.jwt_token_expiration_time })

		return token
	}
}