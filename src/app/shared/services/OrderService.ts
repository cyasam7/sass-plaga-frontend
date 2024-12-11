import axios from 'axios';
import { DatagridRowOrder, EStatusOrder, OrderEntity } from '../entities/OrderEntity';
import { AxiosFetcher } from '../fetcher';

export interface IQueryOrder {
	clientId?: string;
}

export class OrderService {
	static async getAll(query?: IQueryOrder): Promise<OrderEntity[]> {
		const { data } = await axios.get<OrderEntity[]>('/order', {
			params: query ?? {}
		});
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
		await AxiosFetcher({
			url: `/order/status/${id}`,
			method: 'PATCH',
			data: {
				status
			}
		});
	}

	static async updateOrderAssigned(data: { orderId: string; userId: string }): Promise<void> {
		await AxiosFetcher({
			url: `/order/assign-user/${data.orderId}`,
			method: 'PATCH',
			data: {
				userId: data.userId
			}
		});
	}

	static async getDatagridOrders(): Promise<DatagridRowOrder[]> {
		const data = await AxiosFetcher<DatagridRowOrder[]>({
			url: `/order/datagrid`,
			method: 'GET'
		});
		return data;
	}
}
