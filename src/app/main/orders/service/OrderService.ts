import axios from 'axios';
import { EStatusOrder, OrderEntity } from './OrderEntity';

export class OrderService {
	static async getAll(): Promise<OrderEntity[]> {
		const { data } = await axios.get<OrderEntity[]>('/order');
		return data;
	}

	static async createOrder(data: any): Promise<void> {
		await axios.post('/order', data);
	}

	static async createFollowingOrder(data: { id: string; observations: string; date: Date }): Promise<void> {
		await axios.post<OrderEntity[]>('/order/followUp', data);
	}

	static async createClient(data: any): Promise<void> {
		await axios.post<void>('clients', data);
	}

	static async getById(id: string): Promise<OrderEntity> {
		const { data } = await axios.get<OrderEntity>(`/order/${id}`);
		return data;
	}

	static async updateStatus(id: string, status: EStatusOrder): Promise<void> {
		await axios.patch<OrderEntity>(`/order/${id}`, { status });
	}
}
