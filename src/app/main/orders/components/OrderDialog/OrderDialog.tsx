/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React from 'react';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { Button, Dialog, DialogContent, DialogTitle, Slide, Stack, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { displayToast } from '@fuse/core/FuseMessage/DisplayToast';
import { yupResolver } from '@hookform/resolvers/yup';
import FormOrder from '../FormOrder/FormOrder';
import { IFormCreatePest } from '../FormOrder/FormOrderProps';
import { OrderDialogProps } from './OrderDialogProps';
import { OrderService } from '../../service/OrderService';
import { createOrderSchema } from '../FormOrder/schema';

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
	const { onCancel, onSubmit, open } = props;

	const formHandler = useForm<IFormCreatePest>({
		resolver: yupResolver<IFormCreatePest>(createOrderSchema as any),
		defaultValues: {
			clientId: '',
			clientAddress: '',
			clientName: '',
			clientPhone: '',
			price: 0,
			date: dayjs(),
			frequency: [],
			observations: '',
			recommendations: [],
			typePlague: [],
			typeService: []
		}
	});

	async function handleSubmit(data: IFormCreatePest): Promise<void> {
		const formatValues = {
			...data,
			date: data.date.toISOString(),
			price: String(data.price),
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
		handleCancel();
	}

	function handleCancel(): void {
		formHandler.reset();
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
				<FormOrder formHandler={formHandler} />
			</DialogContent>
		</Dialog>
	);
}

export default OrderDialog;
