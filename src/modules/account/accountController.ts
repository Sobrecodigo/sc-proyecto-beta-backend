import { NextFunction, Request, Response, Router } from 'express';
import AccountService, { AccountData } from './accountService';
import { IEntity } from '../entity/entityModel';
import { formatRes } from '../../utils';

const accountRouter = Router();
const accountService = new AccountService();

accountRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const dto: AccountData = req.body;
		accountService.setter(dto);
		const entityId: IEntity['_id'] = req.body.entity_id;
		const accountRecord = await accountService.create(entityId);
		const formattedResponse = formatRes('success', 201, { data: { results: accountRecord.toJSON() } });
		return res.status(201).json(formattedResponse);
	} catch (error) {
		next(error);
	}
});

accountRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const accountRecord = await accountService.getById(req.params.id);
		const formattedResponse = formatRes('success', res.statusCode, { data: { results: accountRecord.toJSON() } });
		return res.json(formattedResponse);
	} catch (error) {
		next(error);
	}
});

accountRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const dto: AccountData = req.body;
		accountService.setter(dto);
		const accountRecord = await accountService.update(req.params.id);
		const formattedResponse = formatRes('success', res.statusCode, { data: { results: accountRecord.toJSON() } });
		return res.json(formattedResponse);
	} catch (error) {
		next(error);
	}
});

accountRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
	try {
		await accountService.delete(req.params.id);
		const formattedResponse = formatRes('success', 204, {});
		return res.json(formattedResponse);
	} catch (error) {
		next(error);
	}
});

export default accountRouter;