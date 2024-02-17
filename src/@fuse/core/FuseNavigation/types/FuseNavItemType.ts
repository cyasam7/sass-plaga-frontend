import { SxProps } from '@mui/system';
import { AuthRoles } from '@fuse/utils/FuseUtils';
import { FuseNavBadgeType } from './FuseNavBadgeType';

/**
 * FuseNavItemType
 * A type for Fuse navigation item and its properties.
 */
export type FuseNavItemType = {
	id: string;
	title?: string;
	translate?: string;
	auth?: AuthRoles[] | string;
	subtitle?: string;
	icon?: string;
	iconClass?: string;
	url?: string;
	target?: string;
	type?: string;
	sx?: SxProps;
	disabled?: boolean;
	active?: boolean;
	exact?: boolean;
	end?: boolean;
	badge?: FuseNavBadgeType;
	children?: FuseNavItemType[];
	hasPermission?: boolean;
};

export type FuseFlatNavItemType = Omit<FuseNavItemType, 'children' | 'sx'> & { children?: string[]; order: string };
