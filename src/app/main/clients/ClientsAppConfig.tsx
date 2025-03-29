import { ClientsApp } from './ClientsApp';
import { ClientDetail } from './ClientDetail';
import { AreaDetail } from './AreaDetail';
import { BranchDetail } from './BranchDetail';
import { Container } from '@mui/material';


/**
 * The ClientsApp configuration.
 */
const ClientsAppConfig = {
	settings: {
		layout: {
			style: 'layout1',
			config: {
				footer: {
					display: false
				}
			}
		}
	},
	routes: [
		{
			path: '/clients',
			element: <ClientsApp />
		},
		{
			path: '/clients/:clientId',
			element:
				<Container maxWidth="xl">
					<ClientDetail />
				</Container>
		},
		{
			path: 'clients/:clientId/branches/:branchId',
			element:
				<Container maxWidth="xl">
					<BranchDetail />
				</Container>
		},
		{
			path: '/clients/:clientId/branches/:branchId/areas/:areaId',
			element:
				<Container maxWidth="xl">
					<AreaDetail />
				</Container>
		}
	]
};

export default ClientsAppConfig;
