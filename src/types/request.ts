import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface RequestWithTokenPayload extends Request {
	user: string | JwtPayload;
}