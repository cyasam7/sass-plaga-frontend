import axios from 'axios';
import { DeviceEntity } from './DeviceEntity';

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
}
