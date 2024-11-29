import { AreaEntity } from '../../../../../shared/entities/AreaEntity';

export interface ICardAreaProps {
	area: AreaEntity;
	handleEditArea: (id: string) => void;
	openCreateDevicesDialog: (areaId: string) => void;
	openListDevicesDialog: (areaId: string) => void;
}
