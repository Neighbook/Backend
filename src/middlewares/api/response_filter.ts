import { Request, Response, NextFunction } from 'express';

export async function responeFilterMiddleware(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	next();
}
