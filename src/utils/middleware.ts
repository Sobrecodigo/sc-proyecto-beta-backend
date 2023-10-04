import { NextFunction, Request, Response } from 'express';
import logger from './logger';
import { Error } from 'mongoose';
import { formatRes } from './helper';
import { statusCodeKeys } from '../constants';

export const requireJsonContent = (request: Request, response: Response, next: NextFunction) => {
	if (request.headers['content-type'] && request.headers['content-type'] !== 'application/json') {
		return response.status(400).send('Server requires application/json');
	}
	next();
};

export const errorHandler = (error: Error, _request: Request, response: Response, next: NextFunction) => {
	logger.error(error.message);
	const isCastError = (error: Error): error is Error.CastError => error.name === 'CastError';
	const isValidationError = (error: Error): error is Error.ValidationError => error.name === 'ValidationError';
	const formatSendError = (code: number, message: string) => formatRes('error', code, { message });

	if (error.name === 'Error') {
		const [key, message] = error.message.split('-');
		const statusCode = statusCodeKeys[key];
		return response.status(statusCode).send(formatSendError(statusCode, message));
	}
	if (isCastError(error) && error.kind === 'ObjectId') {
		return response.status(400).send(formatSendError(400, 'malformatted id'));
	} if (isValidationError(error)) {
		return response.status(400).json(formatSendError(400, error.message));
	} if (error.name === 'JsonWebTokenError') {
		return response.status(401).json(formatSendError(401, 'invalid token'));
	}

	next(error);
};


export const unknownEndpoint = (_request: Request, response: Response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

export const requestLogger = logger.info();