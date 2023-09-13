import { Router, Request, Response, NextFunction } from 'express';
import { EntityService } from './entityService';
import { formatRes } from '../../utils';

const entitiesRouter = Router();
const service = new EntityService();

entitiesRouter.post('/', async (request: Request, response: Response, next: NextFunction) => {
	const { body } = request;
	try {
		service.setter(body);
		const entityRecord = await service.signUp();

		const prepareResponse = formatRes('success', response.statusCode, { data: { results: entityRecord.toJSON() } });

		response.json(prepareResponse);
	} catch (exception) {
		next(exception);
	}
});

entitiesRouter.get('/all', async (_request: Request, response: Response, next: NextFunction) => {
	try {
		const entities = (await service.getEntities()).map(entity => entity.toJSON());

		const prepareResponse = formatRes('success', response.statusCode, { data: { results: entities } });

		response.json(prepareResponse);
	} catch (exception) {
		next(exception);
	}
});

entitiesRouter.put('/:id', async (request: Request, response: Response, next: NextFunction) => {
	const { body } = request;
	try {
		const updatedEntity = await service.update(request.params.id, body);

		const prepareResponse = formatRes('success', response.statusCode, { data: { results: updatedEntity.toJSON() } });

		response.json(prepareResponse);
	} catch (exception) {
		next(exception);
	}
});


export default entitiesRouter;