import { FuseSettingsConfigType } from '@fuse/core/FuseSettings/FuseSettings';
import { InternalAxiosRequestConfig } from 'axios';

/**
 * The type definition for a user object.
 */
export type User = {
	uid: string;
	role: string[] | string | null;
	data: {
		displayName: string;
		photoURL?: string;
		email?: string;
		shortcuts?: string[];
		settings?: Partial<FuseSettingsConfigType>;
		loginRedirectUrl?: string; // The URL to redirect to after login.
	};
};

export type UserLoginResponse = {
	id: string;
	name: string;
	email: string;
	accessToken: string;
	refreshToken: string;
	role: {
		id: string;
		name: string;
		code: string;
	};
};

export interface AxiosConfigRetry extends InternalAxiosRequestConfig {
	_retry?: boolean;
}
