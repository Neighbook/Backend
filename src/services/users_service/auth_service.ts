import * as argon from 'argon2';
import * as jwt from 'jsonwebtoken';
import { Logger } from 'tslog';

import { environnement } from '../../config/environnement';
import { ts_logconfig } from '../../config/logger';
import { ServiceException } from '../../core/exeptions/base_exeption';
import { User } from '../../models/users/user';
import { userRepository } from './user_service';
import { UserService } from './user_service';
import * as fs from 'fs';

const logger = new Logger({ ...ts_logconfig, name: 'AuthService' });
let jwt_secret = environnement.jwt_secret;
try {
    const data = fs.readFileSync(environnement.jwt_secret_file, 'utf8');
    jwt_secret = data.trim();
} catch (e) {
    logger.warn('An error occurred while reading the jwt secret file');
}
export class AuthService {
	static async healthCheck(): Promise<boolean> {
		if (!jwt_secret) {
			return false;
		}
		if (! (await UserService.healthCheck())) {
			return false;
		}
		return true;
	}

	static async login(email: string, password: string): Promise<string> {
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
			throw new ServiceException('Invalid user credentials', 401);
		}
		if (!(await argon.verify(user.password, password))) {
			throw new ServiceException('Invalid user credentials', 401);
		}

        return jwt.sign(
			{
				_user_id: user.id,
				_user_name: user.nom_utilisateur,
				_user_firstname: user.prenom,
				_user_lastname: user.nom,
			},
			jwt_secret,
			{
				expiresIn: environnement.jwt_token_expiration_time,
				issuer: environnement.jwt_token_issuer,
			}
		);
	}

	static async register(user: User): Promise<string> {
		let createdUser: User | null = null;
		const _user_password = user.password;
		await userRepository
			.save(user)
			.then((result) => {
				createdUser = result;
			})
			.catch((error) => {
				logger.error('Error - service: ' + error);
			});
		if (createdUser == null) {
			throw new ServiceException('Internal server error', 500);
		}
		return await this.login(user.email, _user_password);
	}

	static async verifyToken(token: string): Promise<string> {
		if (jwt_secret == null) {
			logger.error('Error: JWT secret not found');
			throw new ServiceException('Internal server error', 500);
		}
		let decoded: any = null;
		jwt.verify(token, String(jwt_secret), (err, decodedToken) => {
			if (err) {
				logger.error('Error - verify: ' + err);
				throw new ServiceException('Invalid token.', 400);
			}
			decoded = decodedToken;
		});
		return decoded;
	}

	static async refreshToken(token: string): Promise<string> {
		if (jwt_secret === null) {
			logger.error('Error: JWT secret not found');
			throw new ServiceException('Internal server error', 500);
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
			jwt_secret as string,
			{
				expiresIn: environnement.jwt_token_expiration_time,
				issuer: environnement.jwt_token_issuer,
			}
		);

		return newToken;
	}

	static async forgotPassword(email: string): Promise<boolean> {
		if (email == null) {
			throw new ServiceException('Invalid email.', 400);
		}
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
			throw new ServiceException('Invalid user credentials', 401);
		}

		if (jwt_secret == null) {
			logger.error('Error: JWT secret not found');
			throw new ServiceException('Internal server error', 500);
		}
		if (jwt_secret == null) {
			logger.error('Error: JWT secret not found');
			throw new ServiceException('Internal server error', 500);
		}
		// const token = jwt.sign(
		// 	{
		// 		_user_id: user.id,
		// 		_user_name: user.nom_utilisateur,
		// 		_user_firstname: user.prenom,
		// 		_user_lastname: user.nom,
		// 	},
		// 	jwt_secret.value,
		// 	{
		// 		expiresIn: environnement.jwt_token_expiration_time,
		// 		issuer: environnement.jwt_token_issuer,
		// 	}
		// );
		// const mail = {
		//     from: environnement.mail_from,
		//     to: email,
		//     subject: 'Reset password',
		//     text: 'Reset password',
		//     html: '<p>Reset password</p><a href="' +
		// environnement.front_url + '/reset-password/' + token + '">Reset password</a>',
		// };
		// await MailService.sendMail(mail);
		return true;
	}

	static async resetPassword(token: string, password: string): Promise<boolean> {
		if (jwt_secret == null) {
			logger.error('Error: JWT secret not found');
			throw new ServiceException('Internal server error', 500);
		}
		let decoded: any = null;
		jwt.verify(token, String(jwt_secret), (err, decodedToken) => {
			if (err) {
				logger.error('Error - verify: ' + err);
				throw new ServiceException('Invalid token.', 400);
			}
			decoded = decodedToken;
		});
		if (decoded === null) {
			throw new ServiceException('Invalid token.', 400);
		}
		const user = await userRepository
			.findOne({
				where: {
					id: decoded._user_id,
				},
			})
			.catch((error) => {
				logger.error('Error - service: ' + error);
			});
		if (user == null) {
			throw new ServiceException('Invalid user credentials', 401);
		}
		user.password = await argon.hash(password);
		await userRepository.save(user).catch((error) => {
			logger.error('Error - service: ' + error);
		});
		return true;
	}
}
