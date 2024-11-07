import { Dayjs } from 'dayjs';
import { UseFormReturn } from 'react-hook-form';

export interface IFormOrderProps {
	formHandler: UseFormReturn<IFormCreateAppointment>;
	disabled?: boolean;
	disableSpecificField?: {
		dateField?: boolean;
		priceField?: boolean;
		observationsField?: boolean;
		clientNameField?: boolean;
		clientPhoneField?: boolean;
		clientAddressField?: boolean;
		typePlagueField?: boolean;
		typeServiceField?: boolean;
		frequencyField?: boolean;
		recommendationsField?: boolean;
	};
}

export interface IFormCreateAppointment {
	dateScheduled: Dayjs | null;
	timeScheduled: Dayjs | null;
	businessId: string;
	clientId?: string;
	clientName: string;
	clientAddress: string;
	clientPhone: string;
	comments: string;
}
export interface ICreateAppointment {
	dateScheduled: Dayjs | null;
	businessId: string;
	clientId?: string;
	clientName: string;
	clientAddress: string;
	clientPhone: string;
	comments: string;
}
