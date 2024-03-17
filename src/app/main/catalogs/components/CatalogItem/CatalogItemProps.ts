export type CatalogType = 'typePlague' | 'typeService' | 'recommendation' | 'frequency';

export interface ICatalogItem {
	title: string;
	route: CatalogType;
}
