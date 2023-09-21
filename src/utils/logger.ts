import { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';

morgan.token('body', (req) => (req.method === 'POST' ? JSON.stringify(req.headers) : 'none'));

const info = () => {
	if (process.env.NODE_ENV !== 'test') {
		return morgan(':method :url :status :res[content-length] - :response-time ms :body');
	}
	return (_req: Request, _res: Response, next: NextFunction) => next();
};

const error = (...params: string[]) => {
	console.error(...params);
};

export default {
	info,
	error
};