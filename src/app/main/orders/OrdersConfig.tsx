import i18next from 'i18next';
import { lazy } from 'react';
import { FuseRouteConfigType } from '@fuse/utils/FuseUtils';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);

const Orders = lazy(() => import('./Orders'));

/**
 * The Example page config.
 */
const OrdersConfig: FuseRouteConfigType = {
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
			path: 'orders',
			element: <Orders />
		}
	]
};

export default OrdersConfig;
