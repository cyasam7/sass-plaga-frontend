import { lazy } from 'react';
import { FuseRouteConfigType } from '@fuse/utils/FuseUtils';

const WhatsApp = lazy(() => import('./whats-app/WhatsApp'));
const Reports = lazy(() => import('./reports/Reports'));

/**
 * The Example page config.
 */
const AppConfigurationsConfig: FuseRouteConfigType = {
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
	auth: ['staff', 'admin'],
	routes: [
		{
			path: '/configuration/whats-app',
			element: <WhatsApp />
		},
		{
			path: '/configuration/reports',
			element: <Reports />
		}
	]
};

export default AppConfigurationsConfig;
