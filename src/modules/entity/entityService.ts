import Entity, { IEntity } from './entityModel';
import bcrypt from 'bcrypt';

interface EntityPayload
  extends Omit<IEntity, 'id' | 'created_at' | 'updated_at'> {}

export class EntityService {
	async signUp(payload: EntityPayload) {
		if (payload.password.length >= 8) {
			try {
				const saltRounds = 10;
				const passwordHash = await bcrypt.hash(payload.password, saltRounds);

				const user = new Entity({
					...payload,
					password: passwordHash,
				});

				const savedUser = await user.save();

				return savedUser;
			} catch (error) {
				throw new Error(error);
			}
		}

		throw new Error(
			'User creation request rejected, submitted password is too short',
		);
	}

	async getEntities() {
		return await Entity.find({});
	}
}
