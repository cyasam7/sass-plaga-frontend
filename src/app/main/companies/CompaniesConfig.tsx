import i18next from 'i18next';
import { lazy } from 'react';
import { FuseRouteConfigType } from '@fuse/utils/FuseUtils';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);

const Companies = lazy(() => import('./Companies'));

/**
 * The Example page config.
 */
const CompaniesConfig: FuseRouteConfigType = {
	settings: {
		layout: {}
	},
	auth: ['staff', 'admin'],
	routes: [
		{
			path: 'companies',
			element: <Companies />
		}
	]
};

export default CompaniesConfig;
