import {
	Autocomplete,
	Checkbox,
	Divider,
	FormHelperText,
	Grid,
	InputAdornment,
	TextField,
	Typography
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import useCatalogs from 'src/app/shared-hooks/useCatalog';
import React, { useEffect, useMemo } from 'react';
import { NumericFormatAdapter } from 'app/shared-components/NumericFormatAdapter/NumericFormatAdapter';
import { IFormOrderProps } from './FormOrderProps';
import { CatalogService } from '../../../../shared/services/CatalogService';

const icon = <CheckBoxOutlineBlank fontSize="small" />;
const checkedIcon = <CheckBox fontSize="small" />;

function FormOrder(props: IFormOrderProps) {
	const { formHandler, disabled, disableSpecificField } = props;

	const {
		dateField = false,
		priceField = false,
		observationsField = false,
		clientNameField = false,
		clientPhoneField = false,
		clientAddressField = false,
		typePlagueField = false,
		typeServiceField = false,
		frequencyField = false,
		recommendationsField = false
	} = disableSpecificField;

	const { frequency, recommendations, typePlague, typeService } = useCatalogs();

	useEffect(() => {
		const phone = formHandler.watch('clientPhone');
		if (phone.length === 10) {
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
		} else {
			formHandler.setValue('clientAddress', '');
			formHandler.setValue('clientId', '');
			formHandler.setValue('clientName', '');
		}
	}, [formHandler.watch('clientPhone')]);

	const frequencyValue = useMemo(() => {
		return frequency.filter((i) => formHandler.watch('frequency').includes(i.id));
	}, [frequency, formHandler.watch('frequency')]);

	const recommendationsValue = useMemo(() => {
		return recommendations.filter((i) => formHandler.watch('recommendations').includes(i.id));
	}, [recommendations, formHandler.watch('recommendations')]);

	const typePlagueValue = useMemo(() => {
		return typePlague.filter((i) => formHandler.watch('typePlague').includes(i.id));
	}, [typePlague, formHandler.watch('typePlague')]);

	const typeServiceValue = useMemo(() => {
		return typeService.filter((i) => formHandler.watch('typeService').includes(i.id));
	}, [typeService, formHandler.watch('typeService')]);

	return (
		<Grid
			container
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
				md={12}
			>
				<Grid
					item
					xs={12}
					md={6}
				>
					<Controller
						control={formHandler.control}
						name="clientPhone"
						render={({ field, fieldState }) => (
							<TextField
								{...field}
								disabled={disabled || clientPhoneField}
								variant="standard"
								label="Teléfono"
								required
								fullWidth
								placeholder="Escribe el teléfono del cliente"
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
					<Controller
						control={formHandler.control}
						name="clientName"
						render={({ field, fieldState }) => (
							<TextField
								{...field}
								disabled={disabled || clientNameField}
								variant="standard"
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
						render={({ field, fieldState }) => (
							<TextField
								{...field}
								disabled={disabled || clientAddressField}
								variant="standard"
								label="Dirección"
								required
								placeholder="Escribe la dirección del cliente"
								multiline
								rows={3}
								fullWidth
								maxRows={3}
								error={!!fieldState.error}
								helperText={fieldState.error?.message && fieldState.error?.message}
							/>
						)}
					/>
				</Grid>
			</Grid>
			<Grid
				item
				xs={12}
			>
				<Divider />
			</Grid>
			<Grid
				item
				xs={12}
			>
				<Typography variant="subtitle2">Características</Typography>
			</Grid>
			<Grid
				item
				xs={12}
				md={6}
			>
				<Controller
					control={formHandler.control}
					name="typePlague"
					render={({ field, fieldState }) => (
						<Autocomplete
							multiple
							value={typePlagueValue}
							disabled={disabled || typePlagueField}
							options={typePlague}
							disableCloseOnSelect
							onChange={(_, value) => field.onChange(value.map((i) => i.id))}
							getOptionLabel={(option) => option.name}
							renderOption={(props, option, { selected }) => (
								<li {...props}>
									<Checkbox
										icon={icon}
										checkedIcon={checkedIcon}
										style={{ marginRight: 8 }}
										checked={selected}
									/>
									{option.name}
								</li>
							)}
							renderInput={(params) => (
								<TextField
									{...params}
									variant="standard"
									label="Tipo de plaga"
									required
									error={Boolean(fieldState.error?.message)}
									helperText={fieldState.error && fieldState.error.message}
								/>
							)}
						/>
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
					name="typeService"
					render={({ field, fieldState }) => (
						<Autocomplete
							multiple
							value={typeServiceValue}
							disabled={disabled || typeServiceField}
							options={typeService}
							disableCloseOnSelect
							onChange={(_, value) => field.onChange(value.map((i) => i.id))}
							getOptionLabel={(option) => option.name}
							renderOption={(props, option, { selected }) => (
								<li {...props}>
									<Checkbox
										icon={icon}
										checkedIcon={checkedIcon}
										style={{ marginRight: 8 }}
										checked={selected}
									/>
									{option.name}
								</li>
							)}
							renderInput={(params) => (
								<TextField
									{...params}
									variant="standard"
									required
									label="Tipo de servicio"
									error={Boolean(fieldState.error?.message)}
									helperText={fieldState.error && fieldState.error.message}
								/>
							)}
						/>
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
					name="frequency"
					render={({ field, fieldState }) => (
						<Autocomplete
							multiple
							value={frequencyValue}
							disabled={disabled || frequencyField}
							options={frequency}
							disableCloseOnSelect
							onChange={(_, value) => field.onChange(value.map((i) => i.id))}
							getOptionLabel={(option) => option.name}
							renderOption={(props, option, { selected }) => (
								<li {...props}>
									<Checkbox
										icon={icon}
										checkedIcon={checkedIcon}
										style={{ marginRight: 8 }}
										checked={selected}
									/>
									{option.name}
								</li>
							)}
							renderInput={(params) => (
								<TextField
									{...params}
									variant="standard"
									label="Frecuencia"
									error={Boolean(fieldState.error?.message)}
									helperText={fieldState.error && fieldState.error.message}
								/>
							)}
						/>
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
					name="recommendations"
					render={({ field, fieldState }) => (
						<Autocomplete
							multiple
							disabled={disabled || recommendationsField}
							options={recommendations}
							value={recommendationsValue}
							disableCloseOnSelect
							onChange={(_, value) => field.onChange(value.map((i) => i.id))}
							getOptionLabel={(option) => option.name}
							renderOption={(props, option, { selected }) => (
								<li {...props}>
									<Checkbox
										icon={icon}
										checkedIcon={checkedIcon}
										style={{ marginRight: 8 }}
										checked={selected}
									/>
									{option.name}
								</li>
							)}
							renderInput={(params) => (
								<TextField
									{...params}
									variant="standard"
									label="Recomendaciones"
									error={Boolean(fieldState.error?.message)}
									helperText={fieldState.error?.message && fieldState.error.message}
								/>
							)}
						/>
					)}
				/>
			</Grid>
			<Grid
				item
				xs={12}
			>
				<Divider />
			</Grid>
			<Grid
				item
				xs={12}
			>
				<Typography variant="subtitle2">Fecha y costo</Typography>
			</Grid>
			<Grid
				item
				xs={12}
				md={9}
			>
				<Controller
					control={formHandler.control}
					name="observations"
					render={({ field, fieldState }) => (
						<TextField
							{...field}
							disabled={disabled || observationsField}
							label="Observaciones"
							placeholder="Escribir..."
							multiline
							variant="standard"
							fullWidth
							type="text"
							rows={6}
							maxRows={6}
							error={Boolean(fieldState.error?.message)}
							helperText={
								fieldState.error ? fieldState.error.message : 'Escribe algún comentario de la revision.'
							}
						/>
					)}
				/>
			</Grid>
			<Grid
				container
				item
				xs={12}
				md={3}
				spacing={1.1}
			>
				<Grid
					item
					xs={12}
				>
					<Controller
						control={formHandler.control}
						name="date"
						render={({ field, fieldState }) => (
							<>
								<DateTimePicker
									label="Fecha *"
									disabled={disabled || dateField}
									timezone="America/Mexico_City"
									sx={{ width: '100%' }}
									value={field.value}
									minDate={dayjs()}
									onChange={(newValue) => field.onChange(newValue)}
									slotProps={{
										textField: {
											variant: 'standard',
											color: fieldState.error?.message ? 'error' : undefined
										}
									}}
								/>
								{fieldState.error && (
									<FormHelperText error={!!fieldState.error.message}>
										{fieldState.error.message}
									</FormHelperText>
								)}
							</>
						)}
					/>
				</Grid>
				<Grid
					item
					xs={12}
				>
					<Controller
						control={formHandler.control}
						name="price"
						render={({ field, fieldState }) => (
							<TextField
								{...field}
								disabled={disabled || priceField}
								label="Costo"
								fullWidth
								variant="standard"
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
