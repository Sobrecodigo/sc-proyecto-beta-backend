import express from 'express';
import mongoose from 'mongoose';
import { DATABASE_URI, PORT, errorHandler, requestLogger, requireJsonContent } from './utils';
import bodyParser from 'body-parser';
import entitiesRouter from './modules/entity/entityController';
import { unknownEndpoint } from './utils';
import accountRouter from './modules/account/accountController';

const app = express();

const serverConnected = async () => {
	try {
		await mongoose.connect(DATABASE_URI, {});
		console.log('connected to mongo DataBase');
	} catch (error) {
		console.log('error connection to MongoDB:', error.message);
	}
};

serverConnected();

// parse application/json
app.use(bodyParser.json());
app.use(requestLogger);
app.use(requireJsonContent);
app.use('/api/entity', entitiesRouter);
app.use('/api/account', accountRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});