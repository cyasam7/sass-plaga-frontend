export interface IInsecticideCatalogForm {
	comercialName: string;
	chemical: string;
	doses: string[];
	dose: string;
}

export interface IInsecticideCatalogDialog {
	open: boolean;
	id: string;
	onClose: () => void;
	onSubmit?: (value: IInsecticideCatalogForm) => void;
}

export const defaultValuesInsecticideForm = {
	chemical: '',
	comercialName: '',
	dose: '',
	doses: []
};
