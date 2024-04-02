import { lazy } from 'react';
import ClientView from './components/ClientView';
import ClientForm from './components/ClientForm';

const ClientsApp = lazy(() => import('./ClientsApp'));

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
			element: <ClientsApp />,
			children: [
				{
					path: ':id',
					element: <ClientView />
				},
				{
					path: ':id/edit',
					element: <ClientForm />
				}
			]
		}
	]
};

export default ClientsAppConfig;
