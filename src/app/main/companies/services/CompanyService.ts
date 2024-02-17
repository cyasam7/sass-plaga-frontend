import axios from 'axios';
import { Paginated } from 'src/app/shared-interfaces/Paginated';
import { CompanyEntity } from './CompanyEntity';

export class CompanyService {
	static async getCompanies(): Promise<Paginated<CompanyEntity>> {
		const { data } = await axios.get<Paginated<CompanyEntity>>('/company');
		return data;
	}
}
