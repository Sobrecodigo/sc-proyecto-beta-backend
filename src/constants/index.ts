export const NOT_FOUND = 'Not Found';
export const BAD_REQUEST = 'Bad Request';
export const UNAUTHORAIZED = 'Unauthoraized';


export const statusCodeKeys = {
	[NOT_FOUND]: 404,
	[BAD_REQUEST]: 400,
	[UNAUTHORAIZED]: 401
} as const;