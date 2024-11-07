import i18next from 'i18next';
import { lazy } from 'react';
import { FuseRouteConfigType } from '@fuse/utils/FuseUtils';
import en from './i18n/en';
import es from './i18n/es';

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('es', 'examplePage', es);

const Companies = lazy(() => import('./Business'));
const CompaniesDetail = lazy(() => import('./CompanyDetails/CompanyDetail'));

/**
 * The Example page config.
 */
const CompaniesConfig: FuseRouteConfigType = {
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
			path: 'companies',
			element: <Companies />
		},
		{
			path: 'companies/details/:id',
			element: <CompaniesDetail />
		}
	]
};

export default CompaniesConfig;
