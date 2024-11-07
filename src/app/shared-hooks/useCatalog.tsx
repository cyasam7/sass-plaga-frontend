import { useEffect, useState } from 'react';
import { CatalogService } from '../shared/services/CatalogService';
import { ClientEntity } from '../shared/entities/OrderEntity';
import { BusinessRow } from '../shared/entities/BusinessEntity';

interface IUsePhoneValues {
	clients: ClientEntity[];
	business: BusinessRow[];
	loading: boolean;
}

const useCatalogs = (refresh?: boolean): IUsePhoneValues => {
	const [clients, setClients] = useState<ClientEntity[]>([]);
	const [business, setBusiness] = useState<BusinessRow[]>([]);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		Promise.all([CatalogService.getClientsBy({}), CatalogService.getBusiness()])
			.then((data) => {
				const [clientsData, businessData] = data;
				setClients(clientsData.payload);
				setBusiness(businessData);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [refresh]);

	return {
		clients,
		business,
		loading
	};
};

export default useCatalogs;
