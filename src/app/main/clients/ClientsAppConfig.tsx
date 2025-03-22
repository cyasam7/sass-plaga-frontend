import { StyledContainerClients } from './styled-components';
import { ClientsApp } from './ClientsApp';
import { ClientDetail } from './ClientDetail';
import { AreaDetail } from './AreaDetail';
import { BranchDetail } from './BranchDetail';


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
			element: <StyledContainerClients>
				<ClientsApp />
			</StyledContainerClients>,
		},
		{
			path: '/clients/:clientId',
			element: <StyledContainerClients>
				<ClientDetail />
			</StyledContainerClients>,
		},
		{
			path: 'clients/:clientId/branches/:branchId',
			element:
				<StyledContainerClients>
					<BranchDetail />
				</StyledContainerClients>,
		},
		{
			path: '/clients/:clientId/branches/:branchId/areas/:areaId',
			element: <StyledContainerClients>
				<AreaDetail />
			</StyledContainerClients>,
		}
	]
};

export default ClientsAppConfig;
