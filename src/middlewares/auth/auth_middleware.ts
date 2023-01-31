import { Request, Response, NextFunction } from 'express';

import { AuthService } from '../../services/users_service/auth_service';

export async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
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
		next();
	} catch (ex) {
		res.status(400).send('Invalid token.');
	}
}
