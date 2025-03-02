/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { FIELD_PHONE_ERROR_MESSAGE, FIELD_REQUIRED } from 'src/app/shared-constants/yupMessages';
import { yupPhoneProperty } from 'src/app/shared-constants/yupPhone';
import * as yup from 'yup';

export const createOrderSchema = yup.object().shape({
	price: yup.string().min(1, 'Valor mínimo de 1 peso').required(FIELD_REQUIRED),
	clientId: yup.string(),
	clientAddress: yup.string().required(FIELD_REQUIRED),
	clientName: yup.string().required(FIELD_REQUIRED),
	clientPhone: yupPhoneProperty(FIELD_PHONE_ERROR_MESSAGE),
	date: yup.mixed().nonNullable().typeError(FIELD_REQUIRED)
});
