import axios from 'axios';
import { BusinessRow, CompanyEntity, IFormSaveBusiness } from '../entities/BusinessEntity';

export class BusinessService {
	static async getBy(): Promise<BusinessRow[]> {
		const { data } = await axios.get<BusinessRow[]>('/business');
		return data;
	}

	static async getCompanyById(id: string): Promise<CompanyEntity> {
		const { data } = await axios.get<CompanyEntity>(`/company/${id}`);
		return data;
	}

	static async save(data: IFormSaveBusiness): Promise<void> {
		await axios.post(`/business`, data);
	}

	static async delete(id: string): Promise<void> {
		await axios.delete(`/company/${id}`);
	}
}
