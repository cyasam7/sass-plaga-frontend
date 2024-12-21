import axios, { AxiosError } from 'axios';
import { ECatalogType } from '../entities/CatalogEntities';
import { AxiosFetcher } from '../fetcher';
import { ClientEntity } from '../entities/ClientsEntities';

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

	static async getCatalogType<T>(catalogType: ECatalogType): Promise<T[]> {
		const data = await AxiosFetcher<T[]>({
			url: '/catalogs',
			method: 'GET',
			params: {
				catalogType
			}
		});
		return data;
	}

	static async getCatalogTypeById<T>(data: { id: string; catalogType: ECatalogType }): Promise<T> {
		const { catalogType, id } = data;
		return AxiosFetcher<T>({
			url: `/catalogs/${id}`,
			method: 'GET',
			params: {
				catalogType
			}
		});
	}

	static async deleteCatalogTypeById<T>(data: { id: string; catalogType: ECatalogType }): Promise<T> {
		const { catalogType, id } = data;
		return AxiosFetcher<T>({
			url: `/catalogs/${id}`,
			method: 'DELETE',
			params: {
				catalogType
			}
		});
	}

	static async save(data: { type: ECatalogType; data: unknown }): Promise<void> {
		const { data: body, type } = data;
		await AxiosFetcher({
			url: '/catalogs',
			method: 'PUT',
			data: body,
			params: {
				catalogType: type
			}
		});
	}
}
