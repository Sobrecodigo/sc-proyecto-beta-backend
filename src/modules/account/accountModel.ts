import { Document, Schema, model } from 'mongoose';
import { IEntity } from '../entity/entityModel';

export interface IAccount extends Document {
	id: string;
	entity_id: IEntity['_id'];
	balance: number;
	state: boolean;
	created_at: Date;
	updated_at: Date;
}

const accountSchema = new Schema<IAccount>({
	entity_id: {
		type: Schema.Types.ObjectId,
		ref: 'Entity',
		required: true,
		unique: true
	},
	balance: {
		type: Number,
		required: true,
	},
	state: {
		type: Boolean,
		required: true,
	},
});

export default model<IAccount>('Account', accountSchema);
