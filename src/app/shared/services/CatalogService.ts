import axios, { AxiosError } from 'axios';
import { ClientEntity } from '../entities/OrderEntity';
import { AxiosFetcher } from '../fetcher';
import { BusinessRow } from '../entities/BusinessEntity';

interface IQueryClient {
	phone?: string;
}

export class CatalogService {
	static async getClientsBy(query: IQueryClient): Promise<{ error?: AxiosError; payload?: ClientEntity[] }> {
		try {
			const { data } = await axios.get<ClientEntity[]>('/clients', {
				params: {
					...query
				}
			});
			return { payload: data };
		} catch (error) {
			return { error: error as AxiosError };
		}
	}

	static async getBusiness(): Promise<BusinessRow[]> {
		const data = AxiosFetcher<BusinessRow[]>({
			url: '/business',
			method: 'GET'
		});
		return data;
	}
}
