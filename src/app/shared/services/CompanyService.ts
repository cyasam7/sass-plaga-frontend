import axios from 'axios';
import { CompanyEntity } from '../entities/CompanyEntity';
import { IFormCompany } from '../../main/companies/types';

export class CompanyService {
	static async getCompanies(): Promise<CompanyEntity[]> {
		const { data } = await axios.get<CompanyEntity[]>('/company');
		return data;
	}

	static async getCompanyById(id: string): Promise<CompanyEntity> {
		const { data } = await axios.get<CompanyEntity>(`/company/${id}`);
		return data;
	}

	static async save(data: IFormCompany): Promise<void> {
		await axios.post(`/company`, data);
	}

	static async delete(id: string): Promise<void> {
		await axios.delete(`/company/${id}`);
	}
}
