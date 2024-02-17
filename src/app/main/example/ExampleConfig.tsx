import i18next from 'i18next';
import { lazy } from 'react';
import { FuseRouteConfigType } from '@fuse/utils/FuseUtils';
import en from './i18n/en';
import tr from './i18n/tr';
import ar from './i18n/ar';

i18next.addResourceBundle('en', 'examplePage', en);
i18next.addResourceBundle('tr', 'examplePage', tr);
i18next.addResourceBundle('ar', 'examplePage', ar);

const Example = lazy(() => import('./Example'));

/**
 * The Example page config.
 */
const ExampleConfig: FuseRouteConfigType = {
	settings: {
		layout: {}
	},
	auth: ['RL001'],
	routes: [
		{
			path: 'example',
			element: <Example />
		}
	]
};

export default ExampleConfig;
