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

export interface IFormDevices {
	rodents: number;
	crawling: number;
	flyers: number;
}

export enum TypeDevice {
	RODENTS = 'RODENTS',
	CRAWLING = 'CRAWLING',
	FLYERS = 'FLYERS'
}
