import { NextFunction, Request, Response, Router } from 'express';
import AccountService, { AccountData } from './accountService';
import { IEntity } from '../entity/entityModel';
import { formatRes } from '../../utils';

const accountRouter = Router();
const accountService = new AccountService();

accountRouter.post('/', async (request: Request, response: Response, next: NextFunction) => {
	try {
		const dto: AccountData = request.body;
		accountService.setter(dto);
		const entityId: IEntity['_id'] = request.body.entity_id;
		const accountRecord = await accountService.create(entityId);
		const formattedResponse = formatRes('success', 201, { data: { results: accountRecord.toJSON() } });
		return response.status(201).json(formattedResponse);
	} catch (exception) {
		next(exception);
	}
});

accountRouter.get('/:id', async (request: Request, response: Response, next: NextFunction) => {
	try {
		const accountRecord = await accountService.getById(request.params.id);
		const formattedResponse = formatRes('success', response.statusCode, { data: { results: accountRecord.toJSON() } });
		return response.json(formattedResponse);
	} catch (exception) {
		next(exception);
	}
});

accountRouter.put('/:id', async (request: Request, response: Response, next: NextFunction) => {
	try {
		const dto: AccountData = request.body;
		const accountRecord = await accountService.update(request.params.id, dto);
		const formattedResponse = formatRes('success', response.statusCode, { data: { results: accountRecord.toJSON() } });
		return response.json(formattedResponse);
	} catch (exception) {
		next(exception);
	}
});

accountRouter.delete('/:id', async (request: Request, response: Response, next: NextFunction) => {
	try {
		await accountService.deleteById(request.params.id);
		const formattedResponse = formatRes('success', 204, {});
		return response.json(formattedResponse);
	} catch (exception) {
		next(exception);
	}
});

export default accountRouter;