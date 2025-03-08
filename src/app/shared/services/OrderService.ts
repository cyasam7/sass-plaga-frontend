import axios from 'axios';
import { DatagridRowOrder, EStatusOrder, OrderEntity } from '../entities/OrderEntity';
import { AxiosFetcher } from '../fetcher';
import { ResponseId } from '../entities/UserEntity';

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

	static async createOrder(data: any): Promise<ResponseId> {
		const { data: resp } = await axios.post<ResponseId>('/order', data);
		return resp;
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

	static async deleteById(id: string): Promise<void> {
		await AxiosFetcher<DatagridRowOrder[]>({
			url: `/order/${id}`,
			method: 'DELETE'
		});
	}

	static async downloadCertificate({ daysValid, id }: { id: string; daysValid: number }): Promise<void> {
		try {
			const response = await AxiosFetcher({
				url: `/order/certificate/${id}`,
				params: {
					daysValid
				},
				method: 'GET',
				responseType: 'blob'
			});
			const blob = response as Blob;
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `${id}.pdf`;
			document.body.appendChild(a);
			a.click();
		} catch (error) {
			console.log(error);
		}
	}

	static async downloadServicesOrder(orderId: string): Promise<void> {
		try {
			const response = await AxiosFetcher({
				url: `/order/fumigation-report/${orderId}`,
				method: 'GET',
				responseType: 'blob'
			});
			const blob = response as Blob;
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `${orderId}.pdf`;
			document.body.appendChild(a);
			a.click();
		} catch (error) {
			console.log(error);
		}
	}
}
