import { AreaEntity } from '../../../../../shared/entities/AreaEntity';

export interface ICardAreaProps {
	area: AreaEntity;
	handleEditArea: (id: string) => void;
	openDevices: (areaId: string) => void;
}
