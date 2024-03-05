import axios from 'axios';
import { OrderEntity } from './OrderEntity';

export class OrderService {
	static async getAll(): Promise<OrderEntity[]> {
		const { data } = await axios.get<OrderEntity[]>('/order');
		return data;
	}

	static async createOrder(data: any): Promise<void> {
		await axios.post('/order', data);
	}

	static async createFollowingOrder(): Promise<void> {
		await axios.post<OrderEntity[]>('/order');
	}

	static async createClient(data: any): Promise<void> {
		await axios.post<void>('clients', data);
	}
}
