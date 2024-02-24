export interface IFormCompany {
	id: string | null;
	name: string;
	address: string;
}

export interface IFormArea {
	id: string | null;
	name: string;
	companyId: string;
}
