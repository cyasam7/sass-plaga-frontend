import { FIELD_REQUIRED } from 'src/app/shared-constants/yupMessages';
import { yupPhoneProperty } from 'src/app/shared-constants/yupPhone';
import * as yup from 'yup';

export const clientFormSchema = yup.object({
	address: yup.string().required(FIELD_REQUIRED),
	name: yup.string().required(FIELD_REQUIRED),
	phone: yupPhoneProperty(),
	typeClient: yup.string().required(FIELD_REQUIRED)
});
