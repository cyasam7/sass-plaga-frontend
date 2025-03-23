import axios from 'axios';
import { AxiosFetcher } from '../fetcher';
import { Device } from 'src/app/main/clients/types';
import { DeviceFormData } from 'src/app/main/clients/Forms/DeviceForm/types';

export class DeviceService {
  static async getByQuery(query: { areaId: string; clientId: string; branchId: string }): Promise<Device[]> {
    const { data } = await axios.get<Device[]>('/device', {
      params: query
    });
    return data;
  }

  static async save(values: DeviceFormData): Promise<void> {
    await AxiosFetcher({
      url: '/device',
      method: 'POST',
      data: values
    });
  }

  static async remove(id: string): Promise<void> {
    await AxiosFetcher({
      url: `/device/${id}`,
      method: 'DELETE'
    });
  }

  static async updateStatusActive(id: string, value: boolean): Promise<void> {
    await AxiosFetcher({
      url: `/device/statusActive/${id}`,
      method: 'PATCH',
      data: {
        value
      }
    });
  }
}
