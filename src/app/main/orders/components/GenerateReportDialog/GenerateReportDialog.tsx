import { Button, Dialog, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { displayToast } from '@fuse/core/FuseMessage/DisplayToast';
import { DateTimePicker } from '@mui/x-date-pickers';
import { yupResolver } from '@hookform/resolvers/yup';
import TextFieldForm from 'app/shared-components/Form/TextFieldForm/TextFieldForm';
import { IOrderFollowUpDialogProps } from './IGenerateReportDialog';
import { IGenerateReportForm, generateReportSchema, TypeReport } from './schema';
import { OrderService } from '../../../../shared/services/OrderService';

function GenerateReportDialog(props: IOrderFollowUpDialogProps) {
	const { open, onClose, onSubmit, id } = props;

	const formHandler = useForm<IGenerateReportForm>({
		resolver: yupResolver(generateReportSchema),
		defaultValues: {
			date: null,
			typeReport: TypeReport.CERTIFICATE
		}
	});

	async function handleSubmit(data: IGenerateReportForm): Promise<void> {
		await OrderService.downloadCertificate({
			days: data.date.format('DD/MM/YYYY'),
			id
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
					<TextFieldForm
						control={formHandler.control}
						name="observations"
						label="Observaciones"
					/>
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
				</Stack>
			</DialogContent>
		</Dialog>
	);
}

export default GenerateReportDialog;
