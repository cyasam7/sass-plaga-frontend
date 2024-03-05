/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import dayjs from 'dayjs';
import { AT_LEAST_ONE_OPTION, FIELD_REQUIRED } from 'src/app/shared-constants/yupMessages';
import * as yup from 'yup';

yup.addMethod(yup.object, 'dayjs', function method(message: string) {
	return this.test('dayjs', message, function validate(value) {
		if (!value) {
			return true;
		}
		return dayjs.isDayjs(value);
	});
});

const phoneRegExp =
	/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const createOrderSchema = yup.object({
	price: yup
		.number()
		.required(FIELD_REQUIRED)
		.min(1, 'Valor mínimo de 1 peso')
		.nonNullable()
		.typeError(FIELD_REQUIRED),
	observations: yup.string(),
	clientId: yup.string(),
	clientAddress: yup.string().required(FIELD_REQUIRED),
	clientName: yup.string().required(FIELD_REQUIRED),
	clientPhone: yup
		.string()
		.required(FIELD_REQUIRED)
		.matches(phoneRegExp, 'Numero de teléfono no validao')
		.min(10, 'Numero muy corto')
		.max(10, 'Numero muy largo'),
	typePlague: yup.array().min(1, AT_LEAST_ONE_OPTION),
	typeService: yup.array().min(1, AT_LEAST_ONE_OPTION),
	frequency: yup.array().min(1, AT_LEAST_ONE_OPTION),
	data: yup.object().nonNullable().typeError(FIELD_REQUIRED),
	recommendations: yup.array()
});
