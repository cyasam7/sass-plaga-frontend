import { Button, Dialog, DialogContent, DialogTitle, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { displayToast } from '@fuse/core/FuseMessage/DisplayToast';
import { DateTimePicker } from '@mui/x-date-pickers';
import { yupResolver } from '@hookform/resolvers/yup';
import { IOrderFollowUpDialogProps } from './IOrderFollowUpDialogProps';
import { IFollowUpForm, followUppSchema } from './schema';
import { OrderService } from '../../../../shared/services/OrderService';

function OrderFollowUpDialog(props: IOrderFollowUpDialogProps) {
	const { open, onClose, onSubmit, id } = props;

	const formHandler = useForm<IFollowUpForm>({
		resolver: yupResolver(followUppSchema),
		defaultValues: {
			date: null,
			observations: ''
		}
	});

	async function handleSubmit(data: IFollowUpForm): Promise<void> {
		await OrderService.createFollowingOrder({
			id,
			date: data.date.toDate(),
			observations: data.observations
		});
		displayToast({
			anchorOrigin: { horizontal: 'right', vertical: 'top' },
			autoHideDuration: 1000,
			message: 'Se creo orden correctamente',
			variant: 'success'
		});
		handleOnClose();
		await onSubmit();
	}

	function handleOnClose(): void {
		onClose();
		formHandler.reset({ date: null, observations: '' });
	}

	return (
		<Dialog
			open={open}
			maxWidth="sm"
			fullWidth
		>
			<DialogTitle>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<Typography variant="h6">Order de seguimiento</Typography>
					<Stack
						direction="row"
						spacing={2}
					>
						<Button
							variant="outlined"
							color="primary"
							onClick={handleOnClose}
						>
							Cancelar
						</Button>
						<Button
							variant="contained"
							color="primary"
							onClick={formHandler.handleSubmit(handleSubmit)}
						>
							Guardar
						</Button>
					</Stack>
				</Stack>
			</DialogTitle>
			<DialogContent>
				<Stack
					py={2}
					spacing={2}
				>
					<Controller
						control={formHandler.control}
						name="date"
						render={({ field, fieldState }) => (
							<DateTimePicker
								label="Fecha *"
								timezone="America/Mexico_City"
								sx={{ width: '100%' }}
								value={field.value}
								disabled={formHandler.formState.isSubmitting}
								minDate={dayjs()}
								onChange={(newValue) => field.onChange(newValue)}
								slotProps={{
									textField: {
										variant: 'standard',
										color: fieldState.error?.message ? 'error' : undefined,
										helperText: fieldState.error?.message,
										error: !!fieldState.error
									}
								}}
							/>
						)}
					/>
					<Controller
						control={formHandler.control}
						name="observations"
						render={({ field, fieldState }) => (
							<TextField
								{...field}
								label="Observaciones"
								disabled={formHandler.formState.isSubmitting}
								required
								fullWidth
								multiline
								rows={3}
								variant="standard"
								error={Boolean(fieldState.error?.message)}
								helperText={fieldState.error?.message}
							/>
						)}
					/>
				</Stack>
			</DialogContent>
		</Dialog>
	);
}

export default OrderFollowUpDialog;
