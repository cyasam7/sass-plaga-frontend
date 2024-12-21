import { FIELD_REQUIRED } from 'src/app/shared-constants/yupMessages';
import * as yup from 'yup';

export const yupSchemaInsecticideForm = yup.object({
	chemical: yup.string().required(FIELD_REQUIRED),
	comercialName: yup.string().required(FIELD_REQUIRED)
});
