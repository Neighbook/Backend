import { Request, Response, NextFunction } from 'express';
import { Logger } from 'tslog';

import { ts_logconfig } from '../../config/logger';
import { AuthService } from '../../services/users_service/auth_service';
import { UserService } from '../../services/users_service/user_service';

const logger = new Logger({ ...ts_logconfig, name: 'AuthMiddleWare' });
export async function authMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void | Response> {
	const token_payload = req.headers.authorization?.split(' ');
	if (token_payload == null) {
		return res.status(401).send('Access denied. No token provided.');
	}
	if (token_payload.length != 2) {
		return res.status(401).send('Access denied. No token provided.');
	}
	if (token_payload[0] != 'Bearer') {
		return res.status(401).send('Access denied. No token provided.');
	}
	const token = token_payload[1];
	if (!token) {
		return res.status(401).send('Access denied. No token provided.');
	}
	try {
		const decoded = await AuthService.verifyToken(token);
		req.body.user = decoded;
	} catch (ex) {
		return res.status(400).send('Invalid token.');
	}
	logger.info('User: ' + req.body.user);
	if ((await UserService.getDUser(req.body.user._user_id)) === null) {
		return res.status(400).send('Invalid token.');
	}
	next();
}

export async function managedResourceMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void | Response> {
	const user = req.body.user;
	if (!user) {
		return res.status(401).send('Access denied. No token provided.');
	}
	const user_id = req.params.user_id ? req.params.user_id : req.body.user._user_id;
	if (!user_id) {
		return res.status(400).send('Bad request. No user_id provided.');
	}
	if (user._user_id != user_id) {
		return res.status(403).send('Access denied. You do not have permission to access this resource.');
	}
	next();
}
