export interface CompanyEntity {
	createdAt: string;
	updatedAt: string;
	deletedAt: string;
	id: string;
	name: string;
	address: string;
}

export interface BusinessRow {
	id: string;
	name: string;
	address: string;
	phone: string;
	contactName: string;
	contactPhone: string;
}

export interface IFormSaveBusiness {
	name: string;
	contactName: string;
	contactPhone: string;
	address: string;
}