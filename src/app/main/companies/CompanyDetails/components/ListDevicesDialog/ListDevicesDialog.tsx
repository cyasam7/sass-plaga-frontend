import { Button, Dialog, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { useQuery } from 'react-query';
import { Delete, Edit, ToggleOff, ToggleOn } from '@mui/icons-material';
import { DeviceEntity } from 'src/app/shared/entities/DeviceEntity';
import { displayToast } from '@fuse/core/FuseMessage/DisplayToast';
import { openDialog } from 'app/shared-components/GlobalDialog/openDialog';
import { IListDevicesDialog } from './ICrudDevicesDialog';
import { DeviceService } from '../../../../../shared/services/DevicesService';

type Row = DeviceEntity & {
	isNew?: boolean;
};

function ListDevicesDialog(props: IListDevicesDialog) {
	const { open, onClose, areaId, companyId } = props;
	const queryListDevices = ['crud-device-dialog', companyId, areaId];
	const {
		data = [],
		isLoading,
		refetch
	} = useQuery(queryListDevices, () => DeviceService.getByCompanyAndArea(companyId, areaId), {
		enabled: !!companyId && !!areaId
	});

	const columns: GridColDef<DeviceEntity>[] = [
		{
			headerName: 'Estación #',
			field: 'stationNumber',
			flex: 1,
			headerAlign: 'left',
			align: 'left',
			type: 'number',
			editable: true
		},
		{
			headerName: 'Tipo',
			field: 'type',
			flex: 1,
			headerAlign: 'left',
			align: 'left',
			type: 'string',
			editable: true
		},
		{
			headerName: 'Activa',
			field: 'isActive',
			flex: 1,
			headerAlign: 'center',
			align: 'center',
			type: 'boolean',
			editable: true
		},
		{
			field: 'actions',
			type: 'actions',
			width: 100,
			headerName: 'Acciones',
			getActions: ({ row }) => {
				const { isActive, id } = row;

				const textActivated = isActive ? 'Desactivar' : 'Activar';
				const iconActivated = isActive ? <ToggleOff /> : <ToggleOn />;
				return [
					<GridActionsCellItem
						icon={<Edit />}
						label="Edit"
						onClick={handleDeleteDevice(id)}
						color="inherit"
						showInMenu
					/>,
					<GridActionsCellItem
						icon={iconActivated}
						label={textActivated}
						onClick={handleChangeStatusActivated(id, !isActive)}
						color="inherit"
						showInMenu
					/>,
					<GridActionsCellItem
						icon={<Delete />}
						label="Delete"
						onClick={handleDeleteDevice(id)}
						color="inherit"
						showInMenu
					/>
				];
			}
		}
	];

	function handleClose(): void {
		onClose();
	}

	function handleDeleteDevice(id: string) {
		return () => {
			openDialog({
				title: 'Confirmación requerida',
				text: '¿Estas seguro que deseas eliminarlo?',
				onAccept: async () => {
					await DeviceService.remove(id);
					displayToast({
						message: 'Se elimino correctamente',
						variant: 'success',
						anchorOrigin: {
							horizontal: 'right',
							vertical: 'top'
						},
						autoHideDuration: 4000
					});
					await refetch();
				}
			});
		};
	}

	function handleChangeStatusActivated(id: string, value: boolean) {
		return () => {
			openDialog({
				title: 'Confirmación requerida',
				text: `¿Estas seguro que deseas ${value ? 'activar' : 'desactivar'}?`,
				onAccept: async () => {
					await DeviceService.updateStatusActive(id, value);
					displayToast({
						message: 'Se actualizo correctamente',
						variant: 'success',
						anchorOrigin: {
							horizontal: 'right',
							vertical: 'top'
						},
						autoHideDuration: 4000
					});
					await refetch();
				}
			});
		};
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
					</Stack>
				</Stack>
			</DialogTitle>
			<DialogContent>
				<Stack height="400px">
					<DataGrid
						getRowId={(data) => (data as Row).id}
						editMode="row"
						columns={columns}
						rows={data}
						loading={isLoading}
						hideFooter
					/>
				</Stack>
			</DialogContent>
		</Dialog>
	);
}

export default ListDevicesDialog;
