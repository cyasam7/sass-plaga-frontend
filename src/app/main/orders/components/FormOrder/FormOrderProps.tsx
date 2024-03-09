import { Dayjs } from 'dayjs';
import { UseFormReturn } from 'react-hook-form';

export interface IFormOrderProps {
	formHandler: UseFormReturn<IFormCreatePest>;
}

export interface IFormCreatePest {
	date: Dayjs | null;
	price: string;
	observations: string;
	clientName: string;
	clientPhone: string;
	clientAddress: string;
	clientId: string;
	typePlague: string[];
	typeService: string[];
	frequency: string[];
	recommendations: string[];
}
