import { Button, Dialog, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { Delete, Edit } from '@mui/icons-material';
import { useQuery } from 'react-query';
import { ICrudDevicesDialog } from './ICrudDevicesDialog';
import { DeviceService } from '../../../services/DevicesService';

function CrudDevicesDialog(props: ICrudDevicesDialog) {
	const { open, onClose, areaId, companyId } = props;

	const { data = [], isLoading } = useQuery(
		['crud-device-dialog', companyId, areaId],
		() => DeviceService.getByCompanyAndArea(companyId, areaId),
		{ enabled: !!companyId && !!areaId }
	);

	const columns: GridColDef[] = [
		{
			headerName: 'Estacion',
			field: 'number',
			flex: 1,
			headerAlign: 'left',
			align: 'left'
		},
		{
			headerName: 'Activa',
			field: 'isActive',
			flex: 1,
			headerAlign: 'left',
			align: 'left'
		},
		{
			field: 'actions',
			type: 'actions',
			width: 100,
			headerName: 'Acciones',
			getActions: () => {
				return [
					<GridActionsCellItem
						icon={<Delete />}
						label="Editar"
						key={0}
					/>,
					<GridActionsCellItem
						icon={<Edit />}
						label="Eliminar"
						key={0}
					/>
				];
			}
		}
	];

	function handleClose(): void {
		onClose();
	}

	return (
		<Dialog
			open={open}
			PaperProps={{ sx: { minWidth: '600px' } }}
		>
			<DialogTitle>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
				>
					<Typography variant="h6">Lista de dispositivos</Typography>
					<Stack
						direction="row"
						spacing={2}
					>
						<Button
							color="secondary"
							variant="outlined"
							onClick={handleClose}
						>
							Cerrar
						</Button>
						<Button
							color="primary"
							variant="contained"
						>
							Agregar
						</Button>
					</Stack>
				</Stack>
			</DialogTitle>
			<DialogContent>
				<Stack height="400px">
					<DataGrid
						columns={columns}
						rows={data}
						loading={isLoading}
					/>
				</Stack>
			</DialogContent>
		</Dialog>
	);
}

export default CrudDevicesDialog;
