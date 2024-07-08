import { displayToast } from '@fuse/core/FuseMessage/DisplayToast';
import axios, { AxiosRequestConfig, isAxiosError } from 'axios';

export interface IAxiosConfig {
	url: string;
	method: string;
}

export async function AxiosFetcher<T>(config: AxiosRequestConfig): Promise<T> {
	try {
		const { data } = await axios<T>(config);
		return data;
	} catch (error) {
		if (isAxiosError(error)) {
			displayToast({
				anchorOrigin: {
					horizontal: 'right',
					vertical: 'top'
				},
				autoHideDuration: 2000,
				message: error.response.data?.message ?? 'Algo salio mal en la peticion',
				variant: 'error'
			});
		}
		throw new Error(`Error en el request ${config.url}`);
	}
}
