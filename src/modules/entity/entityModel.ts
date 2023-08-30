import { Schema, model, Document } from 'mongoose';

export interface Entity extends Document {
   id: string,
   firstName: string,
   lastName: string,
   identification: string,
   email: string,
   password: string,
   fiscal_relation: string,
   type: string,
   created_at: Date,
   updated_at: Date
}

const entitySchema: Schema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  identification: { type: String },
  email: { type: String },
  password: { type: String },
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

export default model<Entity>('Entity', entitySchema);