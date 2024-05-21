import { create } from 'zustand';

interface IPayloadState {
	loading: boolean;
	user: null | { [key: string]: number | string | null | undefined };
	base64: string;
}
interface IState extends IPayloadState {
	changeWhatsAppState: (value: IPayloadState) => void;
}

export const useWhatsAppStatus = create<IState>((set) => ({
	loading: true,
	user: null,
	base64: '',
	changeWhatsAppState: (data: IPayloadState) => set(() => ({ ...data }))
}));
