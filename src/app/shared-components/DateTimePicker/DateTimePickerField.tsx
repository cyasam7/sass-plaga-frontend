import { DateTimePicker } from '@mui/x-date-pickers';
import { FormHelperText } from '@mui/material';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import dayjs, { Dayjs } from 'dayjs';
import { FIELD_REQUIRED } from 'src/app/shared-constants/yupMessages';

interface DateTimePickerFieldProps<T extends FieldValues> {
	name: Path<T>;
	control: Control<T>;
	label?: string;
	disabled?: boolean;
	required?: boolean;
	minDate?: Dayjs;
	fullWidth?: boolean;
}

export function DateTimePickerField<T extends FieldValues>({
	name,
	control,
	label = 'Fecha',
	disabled = false,
	required = true,
	minDate = dayjs(),
	fullWidth = true
}: DateTimePickerFieldProps<T>) {
	return (
		<Controller
			control={control}
			name={name}
			render={({ field, fieldState }) => (
				<>
					<DateTimePicker
						label={required ? `${label} *` : label}
						disabled={disabled}
						sx={{ width: fullWidth ? '100%' : 'auto' }}
						value={field.value}
						minDate={minDate}
						onChange={(newValue) => field.onChange(newValue)}
						timeSteps={{ minutes: 15 }}
						ampm={false}
						views={['year', 'month', 'day', 'hours', 'minutes']}
						format="DD/MM/YYYY HH:mm"
						slotProps={{
							textField: {
								variant: 'outlined',
								color: fieldState.error?.message ? 'error' : undefined,
								size: 'small',
								error: !!fieldState.error?.message
							}
						}}
					/>
					{fieldState.error && (
						<FormHelperText
							sx={{ paddingLeft: 1.7 }}
							error={!!fieldState.error.message}
						>
							{FIELD_REQUIRED}
						</FormHelperText>
					)}
				</>
			)}
		/>
	);
}
