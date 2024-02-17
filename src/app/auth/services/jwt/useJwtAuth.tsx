import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import _ from '@lodash';
import { PartialDeep } from 'type-fest';
import { UserLoginResponse, AxiosConfigRetry } from '../../user';

const defaultAuthConfig = {
	tokenStorageKey: 'jwt_access_token',
	refreshTokenStorageKey: 'jwt_refresh_token',
	signInUrl: 'api/auth/sign-in',
	signUpUrl: 'api/auth/sign-up',
	tokenRefreshUrl: 'api/auth/refresh',
	getUserUrl: 'api/auth/user',
	updateUserUrl: 'api/auth/user',
	updateTokenFromHeader: false
};

export type JwtAuthProps<T> = {
	config: {
		tokenStorageKey: string;
		signInUrl: string;
		signUpUrl: string;
		tokenRefreshUrl: string;
		getUserUrl: string;
		updateUserUrl: string;
		/**
		 * If the response auth header contains a new access token, update the token
		 * in the Authorization header of the successful responses
		 */
		updateTokenFromHeader: boolean;
	};
	onSignedIn?: (U: T) => void;
	onSignedUp?: (U: T) => void;
	onSignedOut?: () => void;
	onUpdateUser?: (U: T) => void;
	onError?: (error: AxiosError) => void;
};

export type JwtAuth<User, SignInPayload, SignUpPayload> = {
	user: User;
	isAuthenticated: boolean;
	isLoading: boolean;
	signIn: (U: SignInPayload) => Promise<AxiosResponse<User, AxiosError>>;
	signOut: () => void;
	signUp: (U: SignUpPayload) => Promise<AxiosResponse<User, AxiosError>>;
	updateUser: (U: PartialDeep<User>) => void;
	refreshToken: () => void;
	setIsLoading: (isLoading: boolean) => void;
};

/**
 * useJwtAuth hook
 * Description: This hook handles the authentication flow using JWT
 * It uses axios to make the HTTP requests
 * It uses jwt-decode to decode the access token
 * It uses localStorage to store the access token
 * It uses Axios interceptors to update the access token from the response headers
 * It uses Axios interceptors to sign out the user if the refresh token is invalid or expired
 */

const useJwtAuth = <User, SignInPayload, SignUpPayload>(
	props: JwtAuthProps<User>
): JwtAuth<User, SignInPayload, SignUpPayload> => {
	const { config, onSignedIn, onSignedOut, onSignedUp, onError, onUpdateUser } = props;

	// Merge default config with the one from the props
	const authConfig = _.defaults(config, defaultAuthConfig);

	const [user, setUser] = useState<User>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	/**
	 * Set session
	 */
	const setSession = useCallback((accessToken: string, refreshToken: string) => {
		localStorage.setItem(authConfig.refreshTokenStorageKey, refreshToken);
		localStorage.setItem(authConfig.tokenStorageKey, accessToken);
		axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
		axios.defaults.headers.common['Content-Type'] = 'application/json';
	}, []);

	const resetSession = useCallback(() => {
		localStorage.removeItem(authConfig.tokenStorageKey);
		localStorage.removeItem(authConfig.refreshTokenStorageKey);
		delete axios.defaults.headers.common.Authorization;
	}, []);

	/**
	 * Get access token from local storage
	 */
	const getAccessToken = useCallback(() => {
		return localStorage.getItem(authConfig.tokenStorageKey);
	}, []);

	/**
	 * Handle sign-in success
	 */
	const handleSignInSuccess = useCallback((userData: User, accessToken: string, refreshToken: string) => {
		setSession(accessToken, refreshToken);

		setIsAuthenticated(true);

		setUser(userData);

		onSignedIn(userData);
	}, []);
	/**
	 * Handle sign-up success
	 */

	const handleSignUpSuccess = useCallback((userData: User, accessToken: string, refreshToken: string) => {
		setSession(accessToken, refreshToken);

		setIsAuthenticated(true);

		setUser(userData);

		onSignedUp(userData);
	}, []);

	/**
	 * Handle sign-in failure
	 */
	const handleSignInFailure = useCallback((error: AxiosError) => {
		resetSession();

		setIsAuthenticated(false);
		setUser(null);

		handleError(error);
	}, []);

	/**
	 * Handle sign-up failure
	 */
	const handleSignUpFailure = useCallback((error: AxiosError) => {
		resetSession();

		setIsAuthenticated(false);
		setUser(null);

		handleError(error);
	}, []);

	/**
	 * Handle error
	 */
	const handleError = useCallback((error: AxiosError) => {
		onError(error);
	}, []);

	/**
	 * Check if the access token is valid
	 */
	const isTokenValid = useCallback((accessToken: string) => {
		if (accessToken) {
			try {
				const decoded = jwtDecode<JwtPayload>(accessToken);
				const currentTime = Date.now() / 1000;
				return decoded.exp > currentTime;
			} catch (error) {
				return false;
			}
		}
		return false;
	}, []);

	/**
	 * Sign in
	 */
	const signIn = async (credentials: SignInPayload) => {
		const response = axios.post(authConfig.signInUrl, credentials);

		response.then(
			(res: AxiosResponse<UserLoginResponse>) => {
				const { accessToken, refreshToken, ...rest } = res.data;

				const formattedUser = {
					uid: rest.id,
					role: rest.role.code,
					data: {
						displayName: rest.name,
						photoURL: rest.name,
						email: rest.email
						/* loginRedirectUrl?: string; // The URL to redirect to after login. */
					}
				} as User;

				handleSignInSuccess(formattedUser, accessToken, refreshToken);

				return formattedUser;
			},
			(error) => {
				const axiosError = error as AxiosError;

				handleSignInFailure(axiosError);

				return axiosError;
			}
		);

		return response;
	};

	/**
	 * Sign up
	 */
	const signUp = useCallback((data: SignUpPayload) => {
		const response = axios.post(authConfig.signUpUrl, data);

		response.then(
			(res: AxiosResponse<UserLoginResponse>) => {
				const { accessToken, refreshToken, ...userData } = res.data;

				const formattedUser = {
					uid: userData.id,
					role: userData.role.code,
					data: {
						displayName: userData.name,
						photoURL: userData.name,
						email: userData.email
						/* loginRedirectUrl?: string; // The URL to redirect to after login. */
					}
				} as User;

				handleSignUpSuccess(formattedUser, accessToken, refreshToken);

				return userData;
			},
			(error) => {
				const axiosError = error as AxiosError;

				handleSignUpFailure(axiosError);

				return axiosError;
			}
		);

		return response;
	}, []);

	/**
	 * Sign out
	 */
	const signOut = useCallback(() => {
		resetSession();

		setIsAuthenticated(false);
		setUser(null);

		onSignedOut();
	}, []);

	/**
	 * Update user
	 */
	const updateUser = useCallback(async (userData: PartialDeep<User>) => {
		try {
			const response: AxiosResponse<User, PartialDeep<User>> = await axios.put(
				authConfig.updateUserUrl,
				userData
			);

			const updatedUserData = response?.data;

			onUpdateUser(updatedUserData);

			return null;
		} catch (error) {
			const axiosError = error as AxiosError;

			handleError(axiosError);
			return axiosError;
		}
	}, []);

	/**
	 * Refresh access token
	 */
	const refreshToken = async (): Promise<string | null> => {
		try {
			const localRefreshToken = localStorage.getItem(authConfig.refreshTokenStorageKey);

			const { data } = await axios.post<{ accessToken: string }>(authConfig.tokenRefreshUrl, {
				refreshToken: localRefreshToken
			});

			setSession(data.accessToken, localRefreshToken);
			return data.accessToken;
		} catch {
			signOut();
			return null;
		}
	};

	/**
	 * if a successful response contains a new Authorization header,
	 * updates the access token from it.
	 *
	 */
	useEffect(() => {
		axios.interceptors.request.use(async (config) => {
			const accessToken = localStorage.getItem(authConfig.tokenStorageKey);

			if (accessToken) {
				config.headers.Authorization = `Bearer ${accessToken}`;
			}

			return config;
		});

		axios.interceptors.response.use(
			(response) => response,
			async (error) => {
				const axiosError = error as AxiosError;
				const statusError = axiosError.response.status;
				const originalRequest = axiosError.config as AxiosConfigRetry;

				if (
					statusError === 401 &&
					!originalRequest.url.includes(authConfig.tokenRefreshUrl) &&
					!originalRequest._retry
				) {
					// Lock the token refresh process to avoid multiple simultaneous requests
					originalRequest._retry = true;
					const updatedToken = await refreshToken();
					if (!updatedToken) {
						signOut();
						return Promise.reject(axiosError);
					}

					originalRequest.headers.Authorization = `Bearer ${updatedToken}`;
					originalRequest.headers['Content-Type'] = 'application/json';
					originalRequest.headers.Accept = 'application/json';

					if (originalRequest.data) {
						// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
						originalRequest.data = JSON.stringify(originalRequest.data);
					}

					return Promise.resolve(
						axios({ ...originalRequest, transformResponse: axios.defaults.transformResponse })
					);
				}

				// Handle other errors
				return Promise.reject(axiosError);
			}
		);
	}, [isAuthenticated]);

	/**
	 * Check if the access token exist and is valid on mount
	 * If it is, set the user and isAuthenticated states
	 * If not, clear the session
	 */
	useEffect(() => {
		const attemptAutoLogin = async () => {
			try {
				setIsLoading(true);
				const response: AxiosResponse<UserLoginResponse> = await axios.get(authConfig.getUserUrl);
				console.log({ response });
				const userData = response?.data;
				const formattedUser = {
					uid: userData.id,
					role: userData.role.code,
					data: {
						displayName: userData.name,
						photoURL: userData.name,
						email: userData.email
						/* loginRedirectUrl?: string; // The URL to redirect to after login. */
					}
				} as User;

				handleSignInSuccess(formattedUser, userData.accessToken, userData.refreshToken);

				return true;
			} catch /* (error) */ {
				/* const axiosError = error as AxiosError;

				handleSignInFailure(axiosError); */
				return false;
			}
		};

		attemptAutoLogin().then(() => {
			setIsLoading(false);
		});
	}, []);

	return { user, isAuthenticated, isLoading, signIn, signUp, signOut, updateUser, refreshToken, setIsLoading };
};

export default useJwtAuth;
