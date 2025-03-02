import { Divider, FormHelperText, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { NumericFormatAdapter } from 'app/shared-components/NumericFormatAdapter/NumericFormatAdapter';
import { FIELD_REQUIRED } from 'src/app/shared-constants/yupMessages';
import PhoneInputForm from 'app/shared-components/Form/PhoneInputForm/PhoneInputForm';
import { IFormOrderProps } from './FormOrderProps';
import { CatalogService } from '../../../../shared/services/CatalogService';
import { AutocompleteMaps } from '../AutocompleteMaps/AutocompleteMaps';

function FormOrder(props: IFormOrderProps) {
	const { formHandler, disabled, disableSpecificField } = props;

	const {
		dateField = false,
		priceField = false,
		clientNameField = false,
		clientPhoneField = false,
		clientAddressField = false
	} = disableSpecificField;

	async function handleAutoCompleteClient(): Promise<void> {
		const phone = formHandler.watch('clientPhone');
		if (phone) {
			CatalogService.getClientsBy({ phone }).then(({ payload }) => {
				if (payload) {
					const [phoneFounded] = payload;
					if (phoneFounded) {
						const { address, id, name } = phoneFounded;
						formHandler.setValue('clientAddress', address);
						formHandler.setValue('clientId', id);
						formHandler.setValue('clientName', name);
					}
				}
			});
		}
	}

	return (
		<Grid
			container
			spacing={2}
		>
			<Grid
				container
				item
				xs={12}
				spacing={2}
			>
				<Grid
					item
					xs={12}
				>
					<Typography variant="subtitle2">Cliente</Typography>
				</Grid>
				<Grid
					container
					item
					spacing={2}
					xs={12}
				>
					<Grid
						container
						item
						xs={12}
						spacing={2}
					>
						<Grid
							item
							xs={12}
						>
							<PhoneInputForm
								name="clientPhone"
								control={formHandler.control}
								variant="outlined"
								label="Teléfono"
								size="small"
								disabled={disabled || clientPhoneField}
								fullWidth
								required
								onBlur={handleAutoCompleteClient}
							/>
						</Grid>
						<Grid
							item
							xs={12}
						>
							<Controller
								control={formHandler.control}
								name="clientName"
								render={({ field, fieldState }) => (
									<TextField
										{...field}
										size="small"
										disabled={disabled || clientNameField}
										variant="outlined"
										required
										label="Nombre completo"
										placeholder="Escribe el nombre del cliente"
										fullWidth
										error={!!fieldState.error}
										helperText={fieldState.error?.message && fieldState.error?.message}
									/>
								)}
							/>
						</Grid>
						<Grid
							item
							xs={12}
						>
							<Controller
								control={formHandler.control}
								name="clientAddress"
								render={({ field }) => (
									<AutocompleteMaps
										propsInput={{
											disabled: disabled || clientAddressField,
											label: 'Dirección',
											value: field.value,
											size: 'small'
										}}
										onChangeAddress={(value) => field.onChange(value)}
										onPlaceSelect={() => {}}
									/>
								)}
							/>
						</Grid>
					</Grid>
				</Grid>
				<Grid
					item
					xs={12}
				>
					<Divider />
				</Grid>

				{/* Fecha y costo */}
				<Grid
					item
					xs={12}
				>
					<Typography variant="subtitle2">Fecha y costo</Typography>
				</Grid>

				<Grid
					item
					xs={12}
					md={6}
				>
					<Controller
						control={formHandler.control}
						name="date"
						render={({ field, fieldState }) => (
							<>
								<DateTimePicker
									label="Fecha *"
									disabled={disabled || dateField}
									sx={{ width: '100%' }}
									value={field.value}
									minDate={dayjs()}
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
				</Grid>
				<Grid
					item
					xs={12}
					md={6}
				>
					<Controller
						control={formHandler.control}
						name="price"
						render={({ field, fieldState }) => (
							<TextField
								{...field}
								size="small"
								disabled={disabled || priceField}
								label="Costo"
								fullWidth
								variant="outlined"
								InputProps={{
									startAdornment: <InputAdornment position="start">$</InputAdornment>,
									// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
									inputComponent: NumericFormatAdapter as any
								}}
								required
								error={Boolean(fieldState.error?.message)}
								helperText={fieldState.error ? fieldState.error.message : 'Precio del servicio'}
							/>
						)}
					/>
				</Grid>
			</Grid>
		</Grid>
	);
}

export default FormOrder;
