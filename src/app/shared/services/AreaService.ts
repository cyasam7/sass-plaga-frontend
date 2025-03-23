import { Area } from 'src/app/main/clients/types';
import { AxiosFetcher } from '../fetcher';

export class AreaService {
  static async getByCompany(id: string): Promise<Area[]> {
    return AxiosFetcher<Area[]>({ url: `/area?companyId=${id}` });
  }

  static async save(data: any, id?: string): Promise<void> {
    await AxiosFetcher({
      url: `/area`,
      method: 'POST',
      data
    });
  }

  static async getById(id: string): Promise<Area> {
    const area = await AxiosFetcher<Area>({
      url: `/area/${id}`,
      method: 'GET'
    });
    return area;
  }

  static async remove(id: string): Promise<void> {
    await AxiosFetcher({
      url: `/area/${id}`,
      method: 'DELETE'
    });
  }

  static async getByBranch(branchId: string): Promise<Area[]> {
    const area = await AxiosFetcher<Area[]>({
      url: `/area`,
      method: 'GET',
      params: {
        branchId
      }
    });
    return area;
  }
}
