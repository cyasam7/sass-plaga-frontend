import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Dialog, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import { displayToast } from '@fuse/core/FuseMessage/DisplayToast';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';
import { openDialog } from 'app/shared-components/GlobalDialog/openDialog';
import { LoadingButton } from '@mui/lab';
import FormOrder from '../FormOrder/FormOrder';
import { IFormCreatePest } from '../FormOrder/FormOrderProps';
import { OrderDialogProps } from './OrderDialogProps';
import { OrderService } from '../../../../shared/services/OrderService';
import { createOrderSchema } from '../FormOrder/schema';
import { defaultValuesOrder } from '../FormOrder/defaultValues';
import { Transition } from './transition';

function OrderDialog(props: OrderDialogProps) {
	const { onCancel, onSubmit, open, id, shouldOpenDialogAssign } = props;

	const isUpdating = Boolean(id);

	const formHandler = useForm<IFormCreatePest>({
		resolver: yupResolver<IFormCreatePest>(createOrderSchema as any),
		defaultValues: defaultValuesOrder
	});

	const { data } = useQuery({
		queryKey: ['order-by-id', id],
		queryFn: () => OrderService.getById(id),
		enabled: Boolean(id)
	});

	useEffect(() => {
		if (data) {
			formHandler.reset({
				clientId: data.clientId ?? "",
				clientAddress: data.clientAddress,
				clientName: data.clientName,
				clientPhone: data.clientPhone,
				price: String(data.price),
				date: dayjs(data.date)
			});
		}
		return () => {
			formHandler.reset(defaultValuesOrder);
		};
	}, [data]);

	async function handleSubmit(data: IFormCreatePest): Promise<void> {
		try {
			const formatValues = {
				...data,
				id: isUpdating ? id : undefined,
				date: data.date.toISOString(),
				price: data.price,
				isFollowUp: false
			};
			const orderIdSaved = await OrderService.createOrder(formatValues);
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
			await onSubmit?.(orderIdSaved.id, shouldOpenDialogAssign);
		} catch (error) {
			console.log(error);
		}
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
			maxWidth="md"
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
