import Account, { IAccount } from './accountModel';
import { IEntity } from '../entity/entityModel';
import { notFoundErrorMsg, parseBool, parseNumber } from '../../utils';

export interface AccountData extends Pick<IAccount, 'balance' | 'state'> { }

const accountDTOKeys = ['balance', 'state'];


class AccountService {
	private accountData: AccountData;

	constructor() {
	}

	setter(dto: Record<string, unknown>) {
		const newAccount: AccountData = {
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
		const account = await Account.findById(id);

		if (account) return account;
		throw notFoundErrorMsg('Account record with this ID doesn\'t exist');
	}

	async update(id: string, dto: Record<string, unknown>): Promise<IAccount | null> {
		const record = await Account.findById(id);

		if (record) {
			const updateTheseProperties: Partial<AccountData> = {};

			for (const key of accountDTOKeys) {
				const valueToUpdate = dto[key];
				if (!valueToUpdate) {
					continue;
				}

				if (key === 'balance') {
					updateTheseProperties.balance = parseNumber(dto[key]);
					continue;
				}

				if (key === 'state') {
					updateTheseProperties.state = parseBool(dto[key]);
					continue;
				}

			}

			const updatedRecord = await Account.findByIdAndUpdate(id, updateTheseProperties, { new: true });

			return updatedRecord;
		}

		throw notFoundErrorMsg('Entity record with this ID doesn\'t exist');

	}

	async deleteById(id: string): Promise<void> {
		const deletedAccount = await Account.findByIdAndRemove(id);
		if (deletedAccount) return;
		throw notFoundErrorMsg('Account record with this ID doesn\'t exist');
	}

	async deleteOne(entityId: string): Promise<void> {
		const deletedEntityAcccount = await Account.findOneAndRemove({ entity_id: entityId });
		if (deletedEntityAcccount) return;
		throw notFoundErrorMsg('Account record with this ID doesn\'t exist');
	}
}

export default AccountService;
