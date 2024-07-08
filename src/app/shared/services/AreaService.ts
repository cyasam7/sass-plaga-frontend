import axios from 'axios';
import { AreaEntity } from '../entities/AreaEntity';
import { IFormArea } from '../../main/companies/types';
import { AxiosFetcher } from '../fetcher';

export class AreaService {
	static async getByCompany(id: string): Promise<AreaEntity[]> {
		return AxiosFetcher<AreaEntity[]>({ url: `/area?companyId=${id}` });
	}

	static async save(data: IFormArea): Promise<void> {
		await axios.put(`/area`, data);
	}

	static async getById(id: string): Promise<AreaEntity> {
		const { data } = await axios.get<AreaEntity>(`/area/${id}`);
		return data;
	}

	static async deleteArea(id: string): Promise<void> {
		await axios.delete(`/area/${id}`);
	}
}
