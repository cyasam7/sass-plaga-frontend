import { create } from 'zustand';

type ZustandEditable = {
	isEditing: boolean;
	onChangeEditing: (value: boolean) => void;
	companyName: string;
	setCompanyName: (value: string) => void;
};

export const useCompanyDetail = create<ZustandEditable>()((set) => ({
	isEditing: false,
	onChangeEditing: (value) => set(() => ({ isEditing: value })),
	companyName: '',
	setCompanyName: (companyName: string) => set(() => ({ companyName }))
}));

type ZustandCompanyParams = {
	companyId: string;
	areaId: string;
	setCompanyId: (value: string) => void;
	setAreaId: (value: string) => void;
};

export const useCompanyParams = create<ZustandCompanyParams>()((set) => ({
	areaId: '',
	companyId: '',
	setAreaId: (areaId: string) => set(() => ({ areaId })),
	setCompanyId: (companyId: string) => set(() => ({ companyId }))
}));
