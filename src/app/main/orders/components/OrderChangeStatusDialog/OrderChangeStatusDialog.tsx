import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormControlLabel,
	FormLabel,
	Radio,
	RadioGroup,
	Typography
} from '@mui/material';
import React, { useEffect } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Controller, useForm } from 'react-hook-form';
import { displayToast } from '@fuse/core/FuseMessage/DisplayToast';
import { openDialog } from 'app/shared-components/GlobalDialog/openDialog';
import { EStatusOrder } from '../../service/OrderEntity';
import { OrderService } from '../../service/OrderService';
import { IOrderChangeStatusDialogProps, IStatusForm } from './IOrderChangeStatusDialogProps';

function OrderChangeStatusDialog(props: IOrderChangeStatusDialogProps) {
	const { open, id, onClose } = props;
	const queryClient = useQueryClient();

	const formHandler = useForm<IStatusForm>({
		defaultValues: {
			status: ''
		}
	});

	const { data: order } = useQuery({
		queryKey: ['get-order-status-by-id', id],
		queryFn: () => OrderService.getById(id),
		enabled: Boolean(id)
	});
	useEffect(() => {
		if (order) {
			formHandler.reset({ status: order.status });
		}
		return () => {
			formHandler.reset({ status: '' });
		};
	}, [order]);

	async function successRequest(data: IStatusForm): Promise<void> {
		await OrderService.updateStatus(id, data.status as EStatusOrder);
		displayToast({
			anchorOrigin: {
				horizontal: 'right',
				vertical: 'top'
			},
			autoHideDuration: 4000,
			message: 'Se a actualizado correctamente',
			variant: 'success'
		});
		handleClose();
		await queryClient.invalidateQueries('orders');
	}

	async function onSubmit(data: IStatusForm): Promise<void> {
		if ((data.status as EStatusOrder) === EStatusOrder.REALIZED) {
			openDialog({
				title: 'Confirmación requerida',
				text: '¿Estas seguro que deseas confirmar orden?, una vez confirmada no podrás editar la orden.',
				onAccept: async () => {
					await successRequest(data);
				}
			});
		} else {
			await successRequest(data);
		}
	}

	function handleClose(): void {
		onClose();
	}

	return (
		<Dialog
			open={open}
			fullWidth
			maxWidth="sm"
		>
			<DialogTitle>
				<Typography variant="h6">Estatus de orden</Typography>
			</DialogTitle>
			<DialogContent>
				<FormControl>
					<FormLabel>Selecciona el estatus a actualizar</FormLabel>
					<Controller
						control={formHandler.control}
						name="status"
						render={({ field }) => (
							<RadioGroup
								{...field}
								row
							>
								<FormControlLabel
									value={EStatusOrder.NO_REALIZED}
									control={<Radio />}
									label="No realizada"
								/>
								<FormControlLabel
									value={EStatusOrder.REALIZED}
									control={<Radio />}
									label="Realizada"
								/>
								<FormControlLabel
									value={EStatusOrder.CANCELLED}
									control={<Radio />}
									label="Cancelar"
								/>
							</RadioGroup>
						)}
					/>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button
					color="primary"
					variant="outlined"
					onClick={handleClose}
				>
					Cancelar
				</Button>
				<Button
					color="primary"
					variant="contained"
					onClick={formHandler.handleSubmit(onSubmit)}
				>
					Guardar
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default OrderChangeStatusDialog;
