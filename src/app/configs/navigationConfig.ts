import i18next from 'i18next';
import { FuseNavItemType } from '@fuse/core/FuseNavigation/types/FuseNavItemType';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig: FuseNavItemType[] = [
	{
		id: 'example-component',
		title: 'Example',
		translate: 'EXAMPLE',
		type: 'item',
		icon: 'heroicons-outline:star',
		url: 'example',
		auth: ['admin', 'staff'],
		children: []
	},
	{
		id: 'companies',
		title: 'Companies',
		translate: 'COMPANIES',
		type: 'item',
		auth: ['admin', 'staff'],
		icon: 'material-solid:home_work',
		url: '/companies',
		children: []
	},
	{
		id: 'orders',
		title: 'Ordenes',
		translate: 'ORDERS',
		type: 'item',
		auth: ['admin', 'staff'],
		icon: 'material-outline:assignment',
		url: '/orders',
		children: []
	},
	{
		id: 'clients',
		title: 'Clientes',
		translate: 'CLIENTS',
		type: 'item',
		auth: ['admin', 'staff'],
		icon: 'material-twotone:person_pin',
		url: '/clients',
		children: []
	}
];

export default navigationConfig;
