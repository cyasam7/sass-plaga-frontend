import axios from 'axios';
import { Paginated } from 'src/app/shared-interfaces/Paginated';
import { CompanyEntity } from './CompanyEntity';
import { IFormCompany } from '../types';

export class CompanyService {
	static async getCompanies(): Promise<Paginated<CompanyEntity>> {
		const { data } = await axios.get<Paginated<CompanyEntity>>('/company');
		return data;
	}

	static async getCompanyById(id: string): Promise<CompanyEntity> {
		const { data } = await axios.get<CompanyEntity>(`/company/${id}`);
		return data;
	}

	static async save(data: IFormCompany): Promise<void> {
		await axios.post(`/company`, data);
	}
}
