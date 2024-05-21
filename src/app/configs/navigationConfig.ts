import i18next from 'i18next';
import { FuseNavItemType } from '@fuse/core/FuseNavigation/types/FuseNavItemType';
import en from './navigation-i18n/en';

i18next.addResourceBundle('en', 'navigation', en);

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
	},
	{
		id: 'catalogs',
		title: 'Catalogs',
		translate: 'CATALOGS',
		type: 'item',
		auth: ['admin', 'staff'],
		icon: 'heroicons-outline:archive',
		url: '/catalogs',
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
		id: 'configurations-app',
		title: 'Configuraciones',
		translate: 'CONFIGURATION',
		auth: ['admin', 'staff'],
		type: 'collapse',
		icon: 'heroicons-solid:adjustments',
		children: [
			{
				id: 'configurations-whatsapp',
				title: 'WhatsApp',
				translate: 'WHATS_APP',
				type: 'item',
				auth: ['admin', 'staff'],
				url: '/configuration/whats-app'
			},
			{
				id: 'configurations-reports',
				title: 'Reportes',
				translate: 'REPORTS',
				type: 'item',
				auth: ['admin', 'staff'],
				url: '/configuration/reports'
			}
		]
	}
];

export default navigationConfig;
