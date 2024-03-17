import axios from 'axios';
import { CatalogEntity } from './CatalogEntity';

export class CatalogsService {
	static async getCatalog(route: string): Promise<CatalogEntity[]> {
		const { data } = await axios.get<CatalogEntity[]>(route);
		return data;
	}

	static async getById(route: string, id: string): Promise<CatalogEntity> {
		const { data } = await axios.get<CatalogEntity>(`${route}/${id}`);
		return data;
	}

	static async save(route: string, data: { id: string; name: string }): Promise<void> {
		await axios.post<void>(`${route}`, data);
	}
}
