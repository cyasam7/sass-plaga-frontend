import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { displayToast } from '@fuse/core/FuseMessage/DisplayToast';
import { useQuery } from 'react-query';
import { IFormArea } from '../../../types';
import FormArea from './FormArea';
import { IAddAreaDialog } from './types';
import { AreaService } from '../../../../../shared/services/AreaService';

function SaveAreaDialog(props: IAddAreaDialog) {
	const { onClose, onSave, open, companyId, areaId } = props;

	const formHandler = useForm<IFormArea>({
		defaultValues: {
			id: null,
			companyId: '',
			name: ''
		}
	});

	const { data: area } = useQuery({
		queryKey: ['saveAreaDialog-getAreById', areaId],
		queryFn: () => AreaService.getById(areaId),
		enabled: !!areaId
	});

	useEffect(() => {
		if (area) {
			formHandler.reset({
				companyId: area.companyId,
				id: area.id,
				name: area.name
			});
		}
	}, [area]);

	useEffect(() => {
		formHandler.setValue('companyId', companyId);
	}, [companyId]);

	function handleClose(): void {
		onClose();
	}

	async function handleSave(data: IFormArea): Promise<void> {
		await AreaService.save(data);
		displayToast({
			autoHideDuration: 1000,
			message: 'Se guardo area correctamente',
			variant: 'success',
			anchorOrigin: {
				horizontal: 'right',
				vertical: 'top'
			}
		});
		onSave();
	}

	return (
		<Dialog
			open={open}
			PaperProps={{ sx: { minWidth: '500px' } }}
		>
			<DialogTitle>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<Typography variant="h6">{areaId ? 'Guardar area' : 'Nueva area'}</Typography>
					<Stack
						direction="row"
						spacing={2}
					>
						<Button
							onClick={handleClose}
							color="primary"
							variant="outlined"
						>
							Cancelar
						</Button>
						<Button
							onClick={formHandler.handleSubmit(handleSave)}
							color="primary"
							variant="contained"
						>
							Guardar
						</Button>
					</Stack>
				</Stack>
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					<FormArea formHandler={formHandler} />
				</DialogContentText>
			</DialogContent>
		</Dialog>
	);
}

export default SaveAreaDialog;
