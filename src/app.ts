import express from 'express';
import mongoose from 'mongoose';
import { DATABASE_URI, PORT, requireJsonContent } from './utils';
import bodyParser from 'body-parser';
import entitiesRouter from './modules/entity/entityController';
import { unknownEndpoint } from './utils';

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
app.use(requireJsonContent);
app.use('/api/entity', entitiesRouter);
app.use(unknownEndpoint);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
