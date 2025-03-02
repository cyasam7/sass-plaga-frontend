import { Dayjs } from 'dayjs';
import { FIELD_REQUIRED } from 'src/app/shared-constants/yupMessages';
import * as yup from 'yup';

export enum TypeReport {
	CERTIFICATE = 'CERTIFICATE',
	SERVICE_ORDER = 'SERVICE_ORDER'
}

export interface IGenerateReportForm {
	typeReport: TypeReport;
	date: Dayjs | null;
}

export const generateReportSchema = yup.object<IGenerateReportForm>({
	TypeReport: yup.string().required(FIELD_REQUIRED),
	date: yup.mixed().required(FIELD_REQUIRED)
});
