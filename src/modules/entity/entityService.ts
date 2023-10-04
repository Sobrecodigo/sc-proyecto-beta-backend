import { notFoundErrorMsg, parseEmail, parseEntityType, parseString, validationErrorMsg } from '../../utils';
import AccountService from '../account/accountService';
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
	private accountService = new AccountService();

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

				this.accountService.setter({
					balance: 0,
					state: true
				});

				await this.accountService.create(savedEntity.id);

				return savedEntity;
			} catch (error) {
				throw new Error(error);
			}
		}
		throw validationErrorMsg('Entity creation request rejected, submitted password is too short');
	}

	async update(id: string, dto: Record<string, unknown>) {
		const record = await Entity.findById(id);

		if (record) {
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
		}

		throw notFoundErrorMsg('Entity record with this ID doesn\'t exist');

	}

	async getEntities() {
		return await Entity.find({});
	}

	async delete(id: string): Promise<void> {
		const removedEntity = await Entity.findByIdAndRemove(id);
		await this.accountService.deleteOne(removedEntity.id);
	}
}
