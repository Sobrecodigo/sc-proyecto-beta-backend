import { parseEmail, parseEntityType, parseString } from '../../utils';
import Entity, { IEntity } from './entityModel';
import bcrypt from 'bcrypt';

interface EntityDTO
	extends Pick<IEntity,
		'firstName' | 'lastName' | 'identification' |
		'email' | 'password' | 'fiscal_relation' | 'type'> { }


const entityDTOKeys = [
	'firstName', 'lastName', 'identification',
	'email', 'password', 'fiscal_relation', 'type'
];

export class EntityService {
	private dto: EntityDTO;

	constructor() {

	}

	setter(dto?: Record<string, unknown>) {

		const newEntity: EntityDTO = {
			firstName: parseString(dto.firstName, 'firstName'),
			lastName: parseString(dto.lastName, 'lastName'),
			identification: parseString(dto.identification, 'identification'),
			email: parseEmail(dto.email),
			password: parseString(dto.password, 'password'),
			fiscal_relation: parseString(dto.fiscal_relation, 'Fiscal Relation'),
			type: parseEntityType(dto.type),
		};

		this.dto = newEntity;
	}

	async signUp() {

		if (this.dto?.password.length >= 8) {
			try {
				const saltRounds = 10;
				const passwordHash = await bcrypt.hash(this.dto.password, saltRounds);

				const entity = new Entity({
					...this.dto,
					password: passwordHash,
				});

				const savedEntity = await entity.save();

				return savedEntity;
			} catch (error) {
				throw new Error(error);
			}
		}

		throw new Error(
			'Entity creation request rejected, submitted password is too short',
		);
	}

	async update(id: string, dto: Record<string, unknown>) {
		try {
			await Entity.findById(id);
			const updateTheseProperties: Partial<EntityDTO> = {};

			for (const key of entityDTOKeys) {
				const valueToUpdate = dto[key];
				if (!valueToUpdate) {
					continue;
				}

				if (key === 'email') {
					updateTheseProperties.email = parseEmail(dto[key]);
					continue;
				}

				if (key === 'type') {
					updateTheseProperties.type = parseEntityType(dto[key]);
					continue;
				}

				updateTheseProperties[key] = parseString(dto[key], key);
			}

			const updatedRecord = await Entity.findByIdAndUpdate(id, updateTheseProperties, { new: true });

			return updatedRecord;
		} catch (error) {
			throw new Error(error);
		}
	}

	async getEntities() {
		return await Entity.find({});
	}

	async delete(id: string): Promise<void> {
		await Entity.findByIdAndRemove(id);
	}
}
