import i18next from 'i18next';
import { lazy } from 'react';
import { FuseRouteConfigType } from '@fuse/utils/FuseUtils';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';

i18next.addResourceBundle('en', 'ClientsPage', en);
i18next.addResourceBundle('tr', 'ClientsPage', tr);
i18next.addResourceBundle('ar', 'ClientsPage', ar);

const Clients = lazy(() => import('./Clients'));

/**
 * The Clients page config.
 */
const ClientsConfig: FuseRouteConfigType = {
	settings: {
		layout: {}
	},
	auth: ['staff', 'admin'],
	routes: [
		{
			path: 'Clients',
			element: <Clients />
		}
	]
};

export default ClientsConfig;
