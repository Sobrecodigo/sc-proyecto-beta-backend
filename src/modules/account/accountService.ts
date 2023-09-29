import Account, { IAccount } from './accountModel';
import { IEntity } from '../entity/entityModel';

export interface AccountData extends Omit<IAccount, 'id' | 'created_at' | 'updated_at'> { }

class AccountService {
	private accountData: AccountData;

	constructor() {
	}

	setter(dto: AccountData) {
		this.accountData = dto;
	}

	async create(entityId: IEntity['_id']): Promise<IAccount> {
		const account = new Account({ entity_id: entityId, ...this.accountData });
		return await account.save();
	}

	async getById(id: string): Promise<IAccount | null> {
		return await Account.findById(id);
	}

	async update(id: string): Promise<IAccount | null> {
		return await Account.findByIdAndUpdate(id, this.accountData, { new: true });
	}

	async delete(id: string): Promise<void> {
		await Account.findByIdAndRemove(id);
	}
}

export default AccountService;
