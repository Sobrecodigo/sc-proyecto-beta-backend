import { config } from 'dotenv';

config();

export const { PORT } = process.env;
export const { DATABASE_URI } = process.env;
export const { NODE_ENV } = process.env;
