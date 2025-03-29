import { IApplicationType } from 'src/app/main/catalogs/components/types';
import { AxiosFetcher } from '../../fetcher';

export class ApplicationTypeService {
  static getById(id: string): Promise<IApplicationType> {
    return AxiosFetcher<IApplicationType>({
      url: `application-types/${id}`
    });
  }

  static byQuery(query: string): Promise<IApplicationType[]> {
    return AxiosFetcher<IApplicationType[]>({
      url: `application-types`,
      params: query
    });
  }

  static save(applicationType: IApplicationType): Promise<IApplicationType> {
    return AxiosFetcher<IApplicationType>({
      url: `application-types`,
      method: 'POST',
      data: applicationType
    });
  }

  static delete(id: string): Promise<void> {
    return AxiosFetcher<void>({
      url: `application-types/${id}`,
      method: 'DELETE'
    });
  }
}
