import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Service } from "typedi";

@Service()
export class AuthenticateMiddleware {
  private secret = process.env.JWT_SECRET||"";

  public use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token required" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, this.secret);
      (req as any).user = decoded;
      next();
    } catch {
      return res.status(401).json({ message: "Invalid token" });
    }
  }
}