import { ECatalogType } from 'src/app/shared/entities/CatalogEntities';

export interface ICatalogForm {
	name: string;
}

export interface IBasicCatalogDialog {
	open: boolean;
	type: ECatalogType;
	onClose: () => void;
	onSubmit?: (id: string) => Promise<void> | void;
	id?: string;
}
