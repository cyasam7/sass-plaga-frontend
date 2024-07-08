import { IUserEntity, IUserCreator, IDataGridUserRow } from '../entities/UserEntity';
import { AxiosFetcher } from '../fetcher';

export class UserService {
	static async save(values: IUserCreator): Promise<void> {
		await AxiosFetcher({ url: `/user`, data: values, method: 'PUT' });
	}

	static async getById(id: string): Promise<IDataGridUserRow> {
		return AxiosFetcher<IDataGridUserRow>({ url: `/user/${id}`, method: 'GET' });
	}

	static async getUsersDatagrid(userId: string): Promise<IDataGridUserRow[]> {
		return AxiosFetcher<IDataGridUserRow[]>({ url: `/user/datagrid`, method: 'GET', params: { userId } });
	}

	static async remove(id: string): Promise<void> {
		await AxiosFetcher<IUserEntity>({ url: `/user/${id}`, method: 'DELETE' });
	}
}
