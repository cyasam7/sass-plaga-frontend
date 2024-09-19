import axios from 'axios';
import { DeviceEntity, ICreateDeviceEntity } from '../entities/DeviceEntity';
import { AxiosFetcher } from '../fetcher';

export class DeviceService {
	static async getByCompanyAndArea(companyId: string, areaId: string): Promise<DeviceEntity[]> {
		const { data } = await axios.get<DeviceEntity[]>('/device', {
			params: {
				companyId,
				areaId
			}
		});
		return data;
	}

	static async save(values: ICreateDeviceEntity): Promise<void> {
		await AxiosFetcher({
			url: '/device',
			method: 'PUT',
			data: values
		});
	}
}
