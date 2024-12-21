import axios from 'axios';
import { ClientEntity } from '../entities/ClientsEntities';

export interface ISaveClient {
	id: string | null;
	name: string;
	address: string;
	phone: string;
}

export class ClientService {
	static async getById(id: string): Promise<ClientEntity> {
		const { data } = await axios.get<ClientEntity>(`/clients/${id}`);
		return data;
	}

	static async save(data: ISaveClient): Promise<void> {
		await axios.post(`/clients`, data);
	}
}
