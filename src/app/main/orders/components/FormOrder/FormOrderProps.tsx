import { Dayjs } from 'dayjs';
import { UseFormReturn } from 'react-hook-form';

export interface IFormOrderProps {
	formHandler: UseFormReturn<IFormCreatePest>;
	disabled?: boolean;
	disableSpecificField?: {
		dateField?: boolean;
		priceField?: boolean;
		observationsField?: boolean;
		clientNameField?: boolean;
		clientPhoneField?: boolean;
		clientAddressField?: boolean;
	};
}

export interface IFormCreatePest {
	date: Dayjs | null;
	price: string;
	observations: string;
	clientName: string;
	clientPhone: string;
	clientAddress: string;
	clientId: string;
}
