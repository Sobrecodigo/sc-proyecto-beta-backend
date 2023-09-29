import { Schema, model, Document } from 'mongoose';
import { entityTypes } from '../../types';

export interface IEntity extends Document {
	id: string;
	firstName: string;
	lastName: string;
	identification: string;
	email: string;
	password: string;
	fiscal_relation: string;
	type: keyof typeof entityTypes;
	created_at: Date;
	updated_at: Date;
}

const entitySchema: Schema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	identification: { type: String },
	email: { type: String, required: true },
	password: { type: String, required: true },
	fiscal_relation: { type: String },
	type: { type: String },
});

entitySchema.set('toJSON', {
	transform: (_document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		//NOTE: the passwordHash should not be revealed
		delete returnedObject.password;
	},
});

export default model<IEntity>('Entity', entitySchema);
