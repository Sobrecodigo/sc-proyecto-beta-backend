import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import { DATABASE_URI, PORT } from './utils';

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

app.get('/', (req: Request, res: Response) => {
	res.send('Hello, Proyecto Beta!');
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
