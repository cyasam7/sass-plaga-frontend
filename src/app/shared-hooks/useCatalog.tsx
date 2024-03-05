import { useEffect, useState } from 'react';
import { CatalogService } from '../main/orders/service/CatalogService';
import {
	ClientEntity,
	FrequencyEntity,
	RecommendationEntity,
	TypePlagueEntity,
	TypeServiceEntity
} from '../main/orders/service/OrderEntity';

interface IUsePhoneValues {
	clients: ClientEntity[];
	frequency: FrequencyEntity[];
	recommendations: RecommendationEntity[];
	typePlague: TypePlagueEntity[];
	typeService: TypeServiceEntity[];
	loading: boolean;
}

const useCatalogs = (refresh?: boolean): IUsePhoneValues => {
	const [clients, setClients] = useState<ClientEntity[]>([]);
	const [frequency, setFrequency] = useState<FrequencyEntity[]>([]);
	const [recommendations, setRecommendations] = useState<RecommendationEntity[]>([]);
	const [typePlague, setTypePlague] = useState<TypePlagueEntity[]>([]);
	const [typeService, setTypeService] = useState<TypeServiceEntity[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		Promise.all([
			CatalogService.getAllClients(),
			CatalogService.getFrequency(),
			CatalogService.getRecommendations(),
			CatalogService.getTypePlage(),
			CatalogService.getTypeService()
		])
			.then((data) => {
				const [clientsData, frequencyData, recommendationsData, typePlagueData, typeServiceData] = data;
				setClients(clientsData);
				setFrequency(frequencyData);
				setRecommendations(recommendationsData);
				setTypePlague(typePlagueData);
				setTypeService(typeServiceData);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [refresh]);

	return {
		clients,
		frequency,
		recommendations,
		typePlague,
		typeService,
		loading
	};
};

export default useCatalogs;
