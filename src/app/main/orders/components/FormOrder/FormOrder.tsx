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
import MapGoogle from 'app/shared-components/MapGoogle/MapGoogle';
import { FIELD_REQUIRED } from 'src/app/shared-constants/yupMessages';
import { IFormOrderProps } from './FormOrderProps';
import { CatalogService } from '../../../../shared/services/CatalogService';
import { AutocompleteMaps } from '../AutocompleteMaps/AutocompleteMaps';

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
	const { clientLongitude, clientLatitude } = formHandler.watch();

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
	const addressLocationSelected = useMemo(() => {
		const value =
			clientLongitude && clientLatitude
				? {
						latitude: clientLatitude,
						longitude: clientLongitude
					}
				: null;

		return value;
	}, [clientLongitude, clientLatitude]);
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
						md={6}
						spacing={2}
					>
						<Grid
							item
							xs={12}
						>
							<Controller
								control={formHandler.control}
								name="clientPhone"
								render={({ field, fieldState }) => (
									<TextField
										{...field}
										size="small"
										disabled={disabled || clientPhoneField}
										variant="outlined"
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
										onPlaceSelect={(value) => {
											if (value) {
												formHandler.setValue('clientLatitude', value.geometry.location.lat());
												formHandler.setValue('clientLongitude', value.geometry.location.lng());
											}
										}}
									/>
								)}
							/>
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
												size="small"
												variant="outlined"
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
												size="small"
												variant="outlined"
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
												size="small"
												variant="outlined"
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
												size="small"
												variant="outlined"
												label="Recomendaciones"
												error={Boolean(fieldState.error?.message)}
												helperText={fieldState.error?.message && fieldState.error.message}
											/>
										)}
									/>
								)}
							/>
						</Grid>
					</Grid>
					<Grid
						container
						item
						xs={12}
						md={6}
					>
						<MapGoogle
							height="400px"
							zoom={14}
							location={addressLocationSelected}
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
					md={9}
				>
					<Controller
						control={formHandler.control}
						name="observations"
						render={({ field, fieldState }) => (
							<TextField
								{...field}
								size="small"
								disabled={disabled || observationsField}
								label="Observaciones"
								placeholder="Escribir..."
								multiline
								variant="outlined"
								fullWidth
								type="text"
								rows={6}
								maxRows={6}
								error={Boolean(fieldState.error?.message)}
								helperText={
									fieldState.error
										? fieldState.error.message
										: 'Escribe algún comentario de la revision.'
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
		</Grid>
	);
}

export default FormOrder;
