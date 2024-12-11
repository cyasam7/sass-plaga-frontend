export enum TypeDevice {
	RODENTS,
	CRAWLING,
	FLYERS
}
export interface DeviceEntity {
	id: string;
	stationNumber: string;
	isActive: boolean;
	type: TypeDevice;
	areaId: string;
	companyId: string;
}

export interface ICreateDeviceEntity {
	id?: string;
	stationNumber: string;
	type: TypeDevice;
	isActive: boolean;
	areaId: string;
	companyId: string;
}
