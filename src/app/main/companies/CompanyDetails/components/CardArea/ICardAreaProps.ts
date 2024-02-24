import { AreaEntity } from '../../../services/AreaEntity';

export interface ICardAreaProps {
	area: AreaEntity;
	handleEditArea: (id: string) => void;
}
