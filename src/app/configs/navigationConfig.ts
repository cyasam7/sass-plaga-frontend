import i18next from 'i18next';
import { FuseNavItemType } from '@fuse/core/FuseNavigation/types/FuseNavItemType';
import en from './navigation-i18n/en';

i18next.addResourceBundle('en', 'navigation', en);

/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig: FuseNavItemType[] = [
	{
		id: 'modules-app',
		title: 'Módulos',
		translate: 'MODULES',
		auth: ['admin', 'staff'],
		type: 'group',

		children: [
			{
				id: 'users',
				title: 'Users',
				translate: 'USERS',
				type: 'item',
				icon: 'heroicons-outline:users',
				auth: ['admin', 'staff'],
				url: '/users'
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
		]
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
	}
];

export default navigationConfig;
