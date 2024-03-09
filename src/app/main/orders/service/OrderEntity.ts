export enum EStatusOrder {
	REALIZED = 'REALIZED',
	NO_REALIZED = 'NO_REALIZED',
	CANCELLED = 'CANCELLED'
}

export interface ClientEntity {
	id: string;
	name: string;
	address: string;
	phone: string;
}

export interface TypePlagueEntity {
	id: string;
	name: string;
}

export interface FrequencyEntity {
	id: string;
	name: string;
}

export interface RecommendationEntity {
	id: string;
	name: string;
}

export interface TypeServiceEntity {
	id: string;
	name: string;
	price?: number;
}

export interface OrderEntity {
	id: string;
	date: Date;
	client: ClientEntity;
	price: number;
	isFollowUp: boolean;
	status: EStatusOrder;
	observations: string;
	typePlague: TypePlagueEntity[];
	typeService: TypeServiceEntity[];
	frequency: FrequencyEntity[];
	recommendations: RecommendationEntity[];
	shouldFollowUp?: boolean;
	daysFollowUp?: number;
	dateFollowUp?: Date;
}
