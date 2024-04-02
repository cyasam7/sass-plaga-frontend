import { Avatar, Button, Card, CardActions, CardContent, Stack, Typography } from '@mui/material';
import React from 'react';
import { useQueryClient } from 'react-query';
import { openDialog } from 'app/shared-components/GlobalDialog/openDialog';
import { displayToast } from '@fuse/core/FuseMessage/DisplayToast';
import { ICardAreaProps } from './ICardAreaProps';
import { AreaService } from '../../../../../shared/services/AreaService';

function CardArea(props: ICardAreaProps) {
	const queryClient = useQueryClient();

	const { area, handleEditArea, openDevices } = props;

	async function handleDeleteArea(): Promise<void> {
		openDialog({
			title: 'Confirmación requerida',
			text: '¿Seguro que desea eliminar esta area?',
			onAccept: async () => {
				await AreaService.deleteArea(area.id);
				await queryClient.invalidateQueries('areas-by-company');
				displayToast({
					anchorOrigin: {
						horizontal: 'right',
						vertical: 'top'
					},
					message: 'Se elimino correctamente',
					variant: 'success',
					autoHideDuration: 1000
				});
			}
		});
	}

	function handleEdit(id: string) {
		return () => {
			handleEditArea(id);
		};
	}

	return (
		<Card>
			<CardContent>
				<Stack
					direction="row"
					alignItems="center"
					spacing={3}
					py={2}
				>
					<Avatar>{area.name[0]}</Avatar>
					<Typography variant="h6">{area.name}</Typography>
				</Stack>
			</CardContent>
			<CardActions sx={{ justifyContent: 'flex-end', display: 'flex' }}>
				<Button
					color="error"
					onClick={handleDeleteArea}
				>
					Eliminar
				</Button>
				<Button
					color="primary"
					variant="outlined"
					onClick={handleEdit(area.id)}
				>
					Editar
				</Button>
				<Button
					color="primary"
					variant="contained"
					onClick={() => openDevices(area.id)}
				>
					Ver dispositivos
				</Button>
			</CardActions>
		</Card>
	);
}

export default CardArea;
