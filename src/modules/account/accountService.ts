import Account, { IAccount } from './accountModel';
import { IEntity } from '../entity/entityModel';
import { parseBool, parseNumber, parseString } from '../../utils';

export interface AccountData extends Pick<IAccount, 'balance' | 'entity_id' | 'state'> { }

class AccountService {
	private accountData: AccountData;

	constructor() {
	}

	setter(dto: Record<string, unknown>) {
		const newAccount: AccountData = {
			entity_id: parseString(dto.entity_id, 'user id'),
			balance: parseNumber(dto.balance),
			state: parseBool(dto.state)
		};
		this.accountData = newAccount;
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
