export enum EClientType {
	ORGANIZATIONAL = 'ORGANIZATIONAL',
	GENERAL_PUBLIC = 'GENERAL_PUBLIC'
}

export interface ClientEntity {
	id: string;
	name: string;
	address: string;
	phone: string;
	typeClient?: EClientType;
}
