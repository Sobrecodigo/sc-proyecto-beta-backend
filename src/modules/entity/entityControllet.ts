import { Router, Request, Response, NextFunction } from 'express';
import { EntityService } from './entityService';

const entitiesRouter = Router();
const service = new EntityService();

entitiesRouter.post('/', async (request: Request, response: Response, next: NextFunction) => {
	const { body } = request;
	try {
		service.setter(body);
		const entityRecord = await service.signUp();
		response.json(entityRecord.toJSON());
	} catch (exception) {
		next(exception);
	}
});

entitiesRouter.get('/all', async (_request: Request, response: Response, next: NextFunction) => {
	try {
		const entities = await service.getEntities();
		response.json(entities);
	} catch (exception) {
		next(exception);
	}
});

entitiesRouter.put('/:id', async (request: Request, response: Response, next: NextFunction) => {
	const { body } = request;
	try {
		const updatedEntity = await service.update(request.params.id, body);
		response.json(updatedEntity.toJSON());
	} catch (exception) {
		next(exception);
	}
});


export default entitiesRouter;