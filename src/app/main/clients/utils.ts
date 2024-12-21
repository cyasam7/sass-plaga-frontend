import { EClientType } from 'src/app/shared/entities/ClientsEntities';

const clientTypeMap = {
	[EClientType.GENERAL_PUBLIC]: 'Publico general',
	[EClientType.ORGANIZATIONAL]: 'Organizacional'
};

export function translateClientType(clientType: EClientType): string {
	return clientTypeMap[clientType];
}
