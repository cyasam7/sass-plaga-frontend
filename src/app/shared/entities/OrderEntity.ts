import { IUserEntity } from './UserEntity';

export enum EStatusOrder {
	CREATED = 'CREATED',
	ASSIGNED = 'ASSIGNED',
	IN_REVIEW = 'IN_REVIEW',
	REVIEWED = 'REVIEWED',
	IN_PROGRESS = 'IN_PROGRESS',
	DONE = 'DONE',
	FINISHED = 'FINISHED',
	CANCELED = 'CANCELED'
}

export enum EClientType {
	ORGANIZATIONAL,
	GENERAL_PUBLIC
}

export interface ClientEntity {
	id: string;
	name: string;
	address: string;
	phone: string;
	typeClient: EClientType;
}

export interface OrderEntity {
	id: string;
	date: Date;
	price: number;
	observations: string;
	isFollowUp: boolean;
	status: EStatusOrder;
	tenantId: string;
	client: ClientEntity;
	assigned?: IUserEntity;
}

export interface DatagridRowOrder {
	id: string;
	date: Date;
	client: {
		name: string;
		phone: string;
		address: string;
	};
	status: EStatusOrder;
	price: number;
	isFollowUp: boolean;
	assignedId?: string;
	assignedName?: string;
}
