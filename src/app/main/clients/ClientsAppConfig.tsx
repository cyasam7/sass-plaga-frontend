import { lazy } from 'react';

const ClientsAppV2 = lazy(() => import('./ClientsApp'));

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
			element: <ClientsAppV2 />,
		}
	]
};

export default ClientsAppConfig;
