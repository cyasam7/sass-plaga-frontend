export interface IListDevicesDialog {
	companyId: string;
	areaId: string;
	open: boolean;
	onClose: () => void;
}
