/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Dialog, DialogContent, DialogTitle, Slide, Stack, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { displayToast } from '@fuse/core/FuseMessage/DisplayToast';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';
import { openDialog } from 'app/shared-components/GlobalDialog/openDialog';
import FormOrder from '../FormOrder/FormOrder';
import { IFormCreatePest } from '../FormOrder/FormOrderProps';
import { OrderDialogProps } from './OrderDialogProps';
import { OrderService } from '../../service/OrderService';
import { createOrderSchema } from '../FormOrder/schema';
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
				clientId: data.client.id,
				clientAddress: data.client.address,
				clientName: data.client.name,
				clientPhone: data.client.phone,
				price: String(data.price),
				date: dayjs(data.date),
				frequency: data.frequency.map((i) => i.id),
				observations: data.observations,
				recommendations: data.frequency.map((i) => i.id),
				typePlague: data.typePlague.map((i) => i.id),
				typeService: data.typeService.map((i) => i.id)
			});
		}
		return () => {
			formHandler.reset(defaultValuesOrder);
		};
	}, [data]);

	async function handleSubmit(data: IFormCreatePest): Promise<void> {
		const formatValues = {
			...data,
			id: isUpdating ? id : undefined,
			date: data.date.toISOString(),
			price: data.price,
			isFollowUp: false
		};
		await OrderService.createOrder(formatValues);
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
		formHandler.reset();
		onCancel();
	}

	function handleCancel(): void {
		if (isUpdating && formHandler.formState.isDirty) {
			openDialog({
				title: 'Confirmación requerida',
				text: '¿Seguro que deseas cancelar sin guardar?',
				onAccept() {
					formHandler.reset(defaultValuesOrder);
					onCancel();
				}
			});
		} else {
			formHandler.reset(defaultValuesOrder);
			onCancel();
		}
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
							onClick={handleCancel}
						>
							Cancelar
						</Button>
						<Button
							color="primary"
							variant="contained"
							onClick={formHandler.handleSubmit(handleSubmit)}
						>
							Guardar
						</Button>
					</Stack>
				</Stack>
			</DialogTitle>
			<DialogContent>
				<FormOrder
					formHandler={formHandler}
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
