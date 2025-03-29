import axios, { AxiosError } from 'axios';
import { ECatalogType } from '../entities/CatalogEntities';
import { AxiosFetcher } from '../fetcher';
import { ClientEntity } from '../entities/ClientsEntities';

interface IQueryClient {
  phone?: string;
}

//It will be deprecated
export class CatalogService {
  static async getClientsBy(query: IQueryClient): Promise<{ error?: AxiosError; payload?: ClientEntity[] }> {
    try {
      const { data } = await axios.get<ClientEntity[]>('/clients', {
        params: {
          ...query
        }
      });
      return { payload: data };
    } catch (error) {
      return { error: error as AxiosError };
    }
  }
}
