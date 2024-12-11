import { FormControl, FormLabel, MenuItem, Stack } from '@mui/material';
import React from 'react';
import TextFieldForm from 'app/shared-components/Form/TextFieldForm/TextFieldForm';
import HeaderDialog from 'app/shared-components/DialogSkeleton/HeaderDialog/HeaderDialog';
import DialogSkeleton from 'app/shared-components/DialogSkeleton/DialogSkeleton';
import { useForm } from 'react-hook-form';
import { openDialog } from 'app/shared-components/GlobalDialog/openDialog';
import { useQuery, useQueryClient } from 'react-query';
import { OrderService } from 'src/app/shared/services/OrderService';
import { displayToast } from '@fuse/core/FuseMessage/DisplayToast';
import { UserService } from 'src/app/shared/services/UserService';
import { ERoleCode } from 'src/app/shared/entities/UserEntity';
import { IAssignOrderDialog, IAssignOrderForm } from './IAssignOrderDialog';

function AssignOrderDialog(props: IAssignOrderDialog) {
	const { onClose, open, orderId } = props;
	const queryClient = useQueryClient();

	const { data: fumigators, isLoading } = useQuery({
		queryFn: () => UserService.getUsersByQuery({ roleCode: ERoleCode.FUMIGATOR_TENANT }),
		queryKey: 'users-assign'
	});

	const formHandler = useForm<IAssignOrderForm>({
		defaultValues: {
			userId: ''
		}
	});

	async function successRequest({ userId }: IAssignOrderForm): Promise<void> {
		await OrderService.updateOrderAssigned({
			orderId,
			userId
		});
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

	async function onSubmit(data: IAssignOrderForm): Promise<void> {
		openDialog({
			title: 'Confirmación requerida',
			text: '¿Estas seguro que deseas confirmar orden?, una vez confirmada no podrás editar la orden.',
			onAccept: async () => {
				await successRequest(data);
			}
		});
	}

	function handleClose() {
		onClose();
		formHandler.reset({ userId: '' });
	}

	return (
		<DialogSkeleton
			open={open}
			header={
				<HeaderDialog
					title="Asignar orden de servicio"
					onClickSecondaryButton={handleClose}
					onClickPrimaryButton={formHandler.handleSubmit(onSubmit)}
				/>
			}
			content={
				<Stack spacing={2}>
					<FormControl>
						<FormLabel>Selecciona el trabajador para esta orden</FormLabel>
						{!isLoading && (
							<TextFieldForm
								control={formHandler.control}
								name="userId"
								label=""
								className="pt-8"
								select
								fullWidth
							>
								{fumigators.map((i) => (
									<MenuItem
										key={i.id}
										value={i.id}
									>
										{i.name}
									</MenuItem>
								))}
							</TextFieldForm>
						)}
					</FormControl>
				</Stack>
			}
			maxWidth="sm"
		/>
	);
}

export default AssignOrderDialog;
