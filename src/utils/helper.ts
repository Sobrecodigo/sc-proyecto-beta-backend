import { BAD_REQUEST, NOT_FOUND, UNAUTHORAIZED, statusCodeKeys } from '../constants';
import { entityTypes } from '../types';
import { DataResponse, ResponseObject } from '../types';

// NOTE: uncomment when parsing dates from DTO payloads is needed.
/*const isDate = (date: string): boolean => {
	return Boolean(Date.parse(date));
};*/

const isString = (text: unknown): text is string => {
	return typeof text === 'string' || text instanceof String; //to make absolutely sure It's a string
};

const isNumber = (value: unknown): value is number => typeof value === 'number';

const isEmail = (email: string) => {
	// eslint-disable-next-line no-useless-escape
	return email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
};

const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';


const buildErrorMsg = (status: keyof typeof statusCodeKeys) => (msg: string) => new Error(`${status}-${msg}`);

export const validationErrorMsg = buildErrorMsg(BAD_REQUEST);

export const notFoundErrorMsg = buildErrorMsg(NOT_FOUND);

export const UnauthorizedErrorMsg = buildErrorMsg(UNAUTHORAIZED);

export const parseEmail = (email: unknown): string => {
	if (!email || !isString(email)) {
		throw validationErrorMsg('Incorrect or missing entity\'s email');
	}
	if (!isEmail(email)) {
		throw validationErrorMsg('Email doesn\'t have the proper format');
	}
	return email;
};

export const parseNumber = (value: unknown): number => {
	if (!isNumber(value)) {
		throw validationErrorMsg('Provided value is not a number');
	}
	return value;
};

export const parseString = (value: unknown, key: string): string => {
	if (!value || !isString(value)) {
		throw validationErrorMsg(`Incorrect or missing property: ${key}`);
	}
	return value;
};

export const parseEntityType = (entityType: unknown): keyof typeof entityTypes => {
	if (!entityType || !isString(entityType)) {
		throw validationErrorMsg('Incorrect or missing entity\'s type value');
	}

	if (!entityTypes[entityType]) {
		throw validationErrorMsg('Type submitted is not a valid value');
	}

	return entityTypes[entityType];
};

export const parseBool = (value: unknown): boolean => {
	if (!value || !isBoolean(value)) {
		throw validationErrorMsg('Not a valid boolean value');
	}
	return value;
};

export const objectKeys = <Obj extends object>(obj: Obj): (keyof Obj)[] => {
	return Object.keys(obj) as (keyof Obj)[];
};

export type ResponseContent = {
	data?: DataResponse,
	message?: string,
	meta?: string
}

export const formatRes = (
	status: ResponseObject['status'],
	statusCode: number,
	responseContent: ResponseContent
): ResponseObject => ({
	status,
	code: statusCode,
	...responseContent,
});