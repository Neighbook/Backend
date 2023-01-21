import { Request, Response, NextFunction } from "express";
import { AuthService } from "../../services/users_service/auth_service";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    // berrer token
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).send("Access denied. No token provided.");
    }

    try {
        const decoded = await AuthService.verifyToken(token);
        req.body.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send("Invalid token.");
    }
}
