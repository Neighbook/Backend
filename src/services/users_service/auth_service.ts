import { KeyVaultSecret } from '@azure/keyvault-secrets';
import * as argon from 'argon2';
import * as jwt from 'jsonwebtoken';
import { Logger } from 'tslog';

import { environnement } from '../../config/environnement';
import { ServiceException } from '../../core/exeptions/base_exeption';
import { User } from '../../models/users/user';
import { userRepository } from './user_service';
import { VaultService } from './vault_service';

const logger = new Logger({ name: 'AuthService' });

export class AuthService {
	static async login(email: string, password: string) {
		const user = await userRepository
			.findOne({
				where: {
					email: email,
				},
			})
			.catch((error) => {
				logger.error('Error - service: ' + error);
			});
		if (user == null) {
			return new ServiceException('Invalid user credentials', 401);
		}
		if (!(await argon.verify(user.password, password))) {
			return new ServiceException('Invalid user credentials', 401);
		}
		const jwt_secret = await VaultService.getSecret(environnement.jwt_secret_name);
		if (jwt_secret == null) {
			logger.error('Error: JWT secret not found');
			return new ServiceException('Internal server error', 500);
		}
		if (jwt_secret.value == null) {
			logger.error('Error: JWT secret not found');
			return new ServiceException('Internal server error', 500);
		}
		const token = jwt.sign(
			{
				_user_id: user.id,
				_user_name: user.nom_utilisateur,
				_user_firstname: user.prenom,
				_user_lastname: user.nom,
			},
			jwt_secret.value,
			{
				expiresIn: environnement.jwt_token_expiration_time,
				issuer: environnement.jwt_token_issuer,
			}
		);

		return token;
	}

	static async resgiter(user: User) {
		let createdUser: User | null = null;
		await userRepository
			.save(user)
			.then((result) => {
				createdUser = result;
			})
			.catch((error) => {
				logger.error('Error - service: ' + error);
			});
		if (createdUser == null) {
			return new ServiceException('Internal server error', 500);
		}
		return await this.login(user.email, user.password);
	}

	static async verifyToken(token: string) {
		const jwt_secret = await VaultService.getSecret(environnement.jwt_secret_name);
		if (jwt_secret == null) {
			logger.error('Error: JWT secret not found');
			throw new ServiceException('Internal server error', 500);
		}
		let decoded: any = null;
		jwt.verify(token, String(jwt_secret.value), (err, decodedToken) => {
			if (err) {
				logger.error('Error - verify: ' + err);
				throw new ServiceException('Invalid token.', 400);
			}
			decoded = decodedToken;
		});
		return decoded;
	}

	static async refreshToken(token: string) {
		const jwt_secret: KeyVaultSecret | null = await VaultService.getSecret(environnement.jwt_secret_name);
		if (jwt_secret === null) {
			logger.error('Error: JWT secret not found');
			return new ServiceException('Internal server error', 500);
		}
		let decoded: any = null;
		decoded = AuthService.verifyToken(token);
		if (decoded === null) {
			throw new ServiceException('Invalid token.', 400);
		}
		const newToken = jwt.sign(
			{
				_user_id: decoded._user_id,
				_user_name: decoded._user_name,
				_user_firstname: decoded._user_firstname,
				_user_lastname: decoded._user_lastname,
			},
			jwt_secret.value as string,
			{
				expiresIn: environnement.jwt_token_expiration_time,
				issuer: environnement.jwt_token_issuer,
			}
		);

		return newToken;
	}
}
