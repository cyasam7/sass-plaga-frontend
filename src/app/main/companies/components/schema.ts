import { FIELD_REQUIRED } from 'src/app/shared-constants/yupMessages';
import * as yup from 'yup';

export const schemaCreateCompany = yup.object({
	name: yup.string().required(FIELD_REQUIRED),
	address: yup.string().required(FIELD_REQUIRED)
});
