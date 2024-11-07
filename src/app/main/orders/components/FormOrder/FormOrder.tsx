import { FormHelperText, Grid, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';
import { DateCalendar, DigitalClock } from '@mui/x-date-pickers';
import React, { useEffect, useMemo } from 'react';
import { FIELD_REQUIRED } from 'src/app/shared-constants/yupMessages';
import TextFieldForm from 'app/shared-components/Form/TextFieldForm/TextFieldForm';
import useCatalogs from 'src/app/shared-hooks/useCatalog';
import { IFormOrderProps } from './FormOrderProps';
import { CatalogService } from '../../../../shared/services/CatalogService';
import { AutocompleteMaps } from '../AutocompleteMaps/AutocompleteMaps';

function FormOrder(props: IFormOrderProps) {
	const { formHandler, disabled, disableSpecificField } = props;
	const { business, loading } = useCatalogs();

	const {
		dateField = false,
		observationsField = false,
		clientNameField = false,
		clientPhoneField = false,
		clientAddressField = false
	} = disableSpecificField;

	const businessValue = useMemo(() => {
		return business.find((value) => value.id === formHandler.watch('businessId')) ?? null;
	}, [formHandler.watch('businessId')]);

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

	return (
		<Grid
			container
			spacing={5}
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
					<Typography variant="subtitle2">Empresa</Typography>
				</Grid>
				<Grid
					item
					xs={12}
					md={6}
				>
					<TextFieldForm
						control={formHandler.control}
						name="businessId"
						label="Empresas"
						size="small"
						fullWidth
					/>
				</Grid>
			</Grid>
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
					item
					xs={12}
					md={6}
				>
					<TextFieldForm
						control={formHandler.control}
						name="clientPhone"
						size="small"
						disabled={disabled || clientPhoneField}
						variant="outlined"
						label="Teléfono"
						required
						fullWidth
						placeholder="Escribe el teléfono del cliente"
					/>
				</Grid>
				<Grid
					item
					xs={12}
					md={6}
				>
					<TextFieldForm
						control={formHandler.control}
						name="clientName"
						size="small"
						disabled={disabled || clientNameField}
						variant="outlined"
						required
						label="Nombre completo"
						placeholder="Escribe el nombre del cliente"
						fullWidth
					/>
				</Grid>
				<Grid
					item
					xs={12}
					md={6}
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
									console.log(value);
								}}
							/>
						)}
					/>
				</Grid>
				<Grid
					item
					xs={12}
				>
					<TextFieldForm
						control={formHandler.control}
						name="comments"
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
					/>
				</Grid>
			</Grid>

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
					<Typography variant="subtitle2">Agenda</Typography>
				</Grid>
				<Grid
					item
					xs={12}
					md={6}
				>
					<Controller
						control={formHandler.control}
						name="dateScheduled"
						render={({ field, fieldState }) => (
							<>
								<DateCalendar
									disablePast
									value={field.value}
									onChange={field.onChange}
									sx={{ width: '100%' }}
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
				{formHandler.watch('dateScheduled') && (
					<Grid
						item
						xs={12}
						md={6}
					>
						<Controller
							control={formHandler.control}
							name="timeScheduled"
							render={({ field, fieldState }) => (
								<>
									<DigitalClock
										value={field.value}
										onChange={field.onChange}
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
				)}
			</Grid>
		</Grid>
	);
}

export default FormOrder;
