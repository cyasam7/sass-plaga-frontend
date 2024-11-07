import { UseFormReturn } from 'react-hook-form';
import { IFormArea } from '../../../types';

export interface IAddAreaDialog {
	open: boolean;
	areaId?: string;
	companyId: string;
	onSave: () => void;
	onClose: () => void;
}
export interface IFormAreaProps {
	formHandler: UseFormReturn<IFormArea>;
}
