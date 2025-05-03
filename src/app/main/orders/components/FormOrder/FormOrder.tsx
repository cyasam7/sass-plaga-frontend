import { Divider, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { NumericFormatAdapter } from 'app/shared-components/NumericFormatAdapter/NumericFormatAdapter';
import PhoneInputForm from 'app/shared-components/Form/PhoneInputForm/PhoneInputForm';
import { DateTimePickerField } from 'app/shared-components/DateTimePicker';
import { IFormOrderProps } from './FormOrderProps';
import { AutocompleteMaps } from '../AutocompleteMaps/AutocompleteMaps';
import TextFieldForm from 'app/shared-components/Form/TextFieldForm/TextFieldForm';
import { OrderService } from 'src/app/shared/services/OrderService';

function FormOrder(props: IFormOrderProps) {
	const { formHandler, disabled, disableSpecificField } = props;

	const {
		dateField = false,
		priceField = false,
		clientNameField = false,
		clientPhoneField = false,
		clientAddressField = false,
		descriptionField = false
	} = disableSpecificField;

	async function handleAutoCompleteClient(): Promise<void> {
		const phone = formHandler.watch('clientPhone');
		if (phone) {
			OrderService.getClientInfoByPhone(phone).then((phoneFounded) => {
				if (phoneFounded) {
					const {
						clientAddress,
						clientId,
						clientName
					} = phoneFounded;
					formHandler.setValue('clientAddress', clientAddress);
					formHandler.setValue('clientId', clientId);
					formHandler.setValue('clientName', clientName);
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
							md={6}
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
							md={6}
						>
							<TextFieldForm
								control={formHandler.control}
								name="clientAddress"
								label="Dirección"
								disabled={disabled || clientAddressField}
								fullWidth
								size='small'
							/>
						</Grid>
					</Grid>
					<Grid
						item
						xs={12}
					>
						<TextFieldForm
							name="description"
							control={formHandler.control}
							label="Descripción"
							disabled={disabled || descriptionField}
							fullWidth
							multiline
							rows={4}
							variant="outlined"
							size="small"
						/>
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
					<DateTimePickerField
						control={formHandler.control}
						name="date"
						disabled={disabled || dateField}
						datePickerProps={{
							timeSteps: { minutes: 15 },
							ampm: false,
							format: "DD/MM/YYYY HH:mm",
							views: ['year', 'month', 'day', 'hours', 'minutes']
						}}
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
