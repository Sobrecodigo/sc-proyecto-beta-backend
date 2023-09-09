import { NextFunction, Request, Response } from 'express';

export const requireJsonContent = (request: Request, response: Response, next: NextFunction) => {
	if (request.headers['content-type'] && request.headers['content-type'] !== 'application/json') {
		return response.status(400).send('Server requires application/json');
	}
	next();
};

export const unknownEndpoint = (_request: Request, response: Response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};