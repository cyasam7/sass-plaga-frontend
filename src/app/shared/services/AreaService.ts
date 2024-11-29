import { AreaEntity } from '../entities/AreaEntity';
import { IFormArea } from '../../main/companies/types';
import { AxiosFetcher } from '../fetcher';

export class AreaService {
	static async getByCompany(id: string): Promise<AreaEntity[]> {
		return AxiosFetcher<AreaEntity[]>({ url: `/area?companyId=${id}` });
	}

	static async save(data: IFormArea): Promise<void> {
		await AxiosFetcher({
			url: `/area`,
			method: 'PUT',
			data
		});
	}

	static async getById(id: string): Promise<AreaEntity> {
		const area = await AxiosFetcher<AreaEntity>({
			url: `/area/${id}`,
			method: 'GET'
		});
		return area;
	}

	static async deleteArea(id: string): Promise<void> {
		await AxiosFetcher({
			url: `/area/${id}`,
			method: 'DELETE'
		});
	}
}
