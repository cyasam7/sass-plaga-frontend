import i18next from 'i18next';
import { lazy } from 'react';
import { FuseRouteConfigType } from '@fuse/utils/FuseUtils';
import en from './i18n/en';
import es from './i18n/es';

i18next.addResourceBundle('en', 'ReportsPage', en);
i18next.addResourceBundle('es', 'ReportsPage', es);

const Reports = lazy(() => import('./Reports'));

/**
 * The Reports page config.
 */
const ReportsConfig: FuseRouteConfigType = {
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
			path: 'reports',
			element: <Reports />
		}
	]
};

export default ReportsConfig;
