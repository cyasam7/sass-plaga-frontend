import axios, { AxiosError } from 'axios';
import {
	ClientEntity,
	FrequencyEntity,
	RecommendationEntity,
	TypePlagueEntity,
	TypeServiceEntity
} from './OrderEntity';

interface IQueryClient {
	phone?: string;
}

export class CatalogService {
	static async getAllClients(): Promise<ClientEntity[]> {
		const { data } = await axios.get<ClientEntity[]>('/clients');
		return data;
	}

	static async getClientsBy(query: IQueryClient): Promise<{ error?: AxiosError; payload?: ClientEntity[] }> {
		try {
			const { data } = await axios.get<ClientEntity[]>('/clients/query', {
				params: {
					...query
				}
			});
			return { payload: data };
		} catch (error) {
			return { error: error as AxiosError };
		}
	}

	static async getFrequency(): Promise<FrequencyEntity[]> {
		const { data } = await axios.get<FrequencyEntity[]>('frequency');
		return data;
	}

	static async getRecommendations(): Promise<RecommendationEntity[]> {
		const { data } = await axios.get<RecommendationEntity[]>('recommendation');
		return data;
	}

	static async getTypePlage(): Promise<TypePlagueEntity[]> {
		const { data } = await axios.get<TypePlagueEntity[]>('typePlague');
		return data;
	}

	static async getTypeService(): Promise<TypeServiceEntity[]> {
		const { data } = await axios.get<TypeServiceEntity[]>('typeService');
		return data;
	}
}
