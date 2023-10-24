import { Router, Request, Response, NextFunction } from 'express';
import { EntityService } from '../entity/entityService';
import { JWT_SECRET, unauthoraizedErrorMsg, formatRes } from '../../utils';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const authRouter = Router();
const service = new EntityService();

authRouter.post('/signup', async (request: Request, response: Response, next: NextFunction) => {
	const { body } = request;
	try {
		service.setter(body);
		const entityRecord = await service.create();

		const token = jwt.sign({ ...entityRecord.toJSON() }, JWT_SECRET, {
			expiresIn: '1h',
		});

		const prepareResponse = formatRes('success', 201, { data: { results: { token } } });

		response.json(prepareResponse);
	} catch (exception) {
		next(exception);
	}
});

authRouter.post('/login', async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const entity = await service.getByEmail(email);

	if (!entity) {
		return unauthoraizedErrorMsg('Authentication failed');
	}

	bcrypt.compare(password, entity.password, (err, result) => {
		if (err || !result) {
			return unauthoraizedErrorMsg('Invalid password');
		}

		const token = jwt.sign({ entity }, JWT_SECRET, {
			expiresIn: '1h',
		});

		res.json({ token });
	});
});


authRouter.get('/me', (req: Request, res: Response) => {
	const token = req.headers.authorization?.split(' ')[1];

	if (!token) {
		throw unauthoraizedErrorMsg('Header\'s token is invalid');
	}

	jwt.verify(token, JWT_SECRET, (err, decoded) => {
		if (err) {
			return unauthoraizedErrorMsg('Invalid token');
		}

		res.json(decoded);
	});
});



export default authRouter;