import { Router, Request, Response } from 'express';
import { EntityService } from './entityService';

const entitiesRouter = Router();
const service = new EntityService();

entitiesRouter.post('/', async (request: Request, response: Response) => {
	const { body } = request;
});
