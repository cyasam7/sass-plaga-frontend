export interface ICrudDevicesDialog {
	companyId: string;
	areaId: string;
	open: boolean;
	onClose: () => void;
}
