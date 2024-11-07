/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Dialog, DialogContent, DialogTitle, Slide, Stack, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { displayToast } from '@fuse/core/FuseMessage/DisplayToast';
import { useQuery } from 'react-query';
import { openDialog } from 'app/shared-components/GlobalDialog/openDialog';
import { LoadingButton } from '@mui/lab';
import FormOrder from '../FormOrder/FormOrder';
import { IFormCreateAppointment } from '../FormOrder/FormOrderProps';
import { OrderDialogProps } from './OrderDialogProps';
import { OrderService } from '../../../../shared/services/OrderService';
import { defaultValuesOrder } from '../FormOrder/defaultValues';

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<unknown>;
	},
	ref: React.Ref<unknown>
) {
	return (
		<Slide
			direction="up"
			ref={ref}
			{...props}
		/>
	);
});

function OrderDialog(props: OrderDialogProps) {
	const { onCancel, onSubmit, open, id } = props;

	const isUpdating = Boolean(id);

	const formHandler = useForm<IFormCreateAppointment>({
		/* resolver: yupResolver<IFormCreateAppointment>(createOrderSchema as any), */
		defaultValues: defaultValuesOrder
	});

	const { data } = useQuery({
		queryKey: ['order-by-id', id],
		queryFn: () => OrderService.getById(id),
		enabled: Boolean(id)
	});

	/* useEffect(() => {
		if (data) {
			formHandler.reset({});
		}
		return () => {
			formHandler.reset(defaultValuesOrder);
		};
	}, [data]); */

	async function handleSubmit(data: IFormCreateAppointment): Promise<void> {
		console.log({ ...data, date: data.dateScheduled.toISOString() });

		handleResetForm();
		displayToast({
			message: 'Se ha guardado correctamente',
			autoHideDuration: 4000,
			variant: 'success',
			anchorOrigin: {
				horizontal: 'right',
				vertical: 'top'
			}
		});
		await onSubmit();
	}

	function handleCancel(): void {
		if (isUpdating && formHandler.formState.isDirty) {
			openDialog({
				title: 'Confirmación requerida',
				text: '¿Seguro que deseas cancelar sin guardar?',
				onAccept() {
					handleResetForm();
				}
			});
		} else {
			handleResetForm();
		}
	}

	function handleResetForm(): void {
		formHandler.reset(defaultValuesOrder);
		onCancel();
	}

	return (
		<Dialog
			open={open}
			TransitionComponent={Transition}
			maxWidth="lg"
		>
			<DialogTitle>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<Typography variant="h6">Guardar order</Typography>
					<Stack
						direction="row"
						spacing={1}
					>
						<Button
							color="primary"
							variant="outlined"
							disabled={formHandler.formState.isSubmitting}
							onClick={handleCancel}
						>
							Cancelar
						</Button>
						<LoadingButton
							color="primary"
							variant="contained"
							loading={formHandler.formState.isSubmitting}
							onClick={formHandler.handleSubmit(handleSubmit)}
						>
							Guardar
						</LoadingButton>
					</Stack>
				</Stack>
			</DialogTitle>
			<DialogContent>
				<FormOrder
					formHandler={formHandler}
					disabled={formHandler.formState.isSubmitting}
					disableSpecificField={
						isUpdating && {
							clientAddressField: true,
							clientNameField: true,
							clientPhoneField: true
						}
					}
				/>
			</DialogContent>
		</Dialog>
	);
}

export default OrderDialog;
