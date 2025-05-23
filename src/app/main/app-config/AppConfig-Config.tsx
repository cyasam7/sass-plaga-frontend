import { lazy } from 'react';
import { FuseRouteConfigType } from '@fuse/utils/FuseUtils';

const AccountUser = lazy(() => import('./accountUser/AccountUser'));

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
			path: '/configuration/account',
			element: <AccountUser />
		}
	]
};

export default AppConfigurationsConfig;
