import { Button, Dialog, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import {
	DataGrid,
	GridActionsCellItem,
	GridColDef,
	GridEventListener,
	GridRowEditStopReasons,
	GridRowId,
	GridRowModel,
	GridRowModes,
	GridRowModesModel,
	GridRowParams,
	MuiEvent
} from '@mui/x-data-grid';
import { useQuery } from 'react-query';
import { useCallback, useState } from 'react';
import { Cancel, Delete, Edit, Save } from '@mui/icons-material';
import { uniqueId } from 'lodash';
import { DeviceEntity } from 'src/app/shared/entities/DeviceEntity';
import { ICrudDevicesDialog } from './ICrudDevicesDialog';
import { DeviceService } from '../../../../../shared/services/DevicesService';

type Row = DeviceEntity & {
	isNew?: boolean;
};

function CrudDevicesDialog(props: ICrudDevicesDialog) {
	const { open, onClose, areaId, companyId } = props;

	const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
	const [rows, setRows] = useState<Row[]>([]);

	const { data = [], isLoading } = useQuery(
		['crud-device-dialog', companyId, areaId],
		() => DeviceService.getByCompanyAndArea(companyId, areaId),
		{ enabled: !!companyId && !!areaId }
	);

	const handleEditClick = (id: GridRowId) => () => {
		setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
	};

	const handleSaveClick = (id: GridRowId) => async () => {
		const userFound = rows.find((i) => i.id === id);
		if (userFound)
			await DeviceService.save({
				...userFound,
				companyId,
				areaId
			});
		setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
	};

	const handleDeleteClick = (id: GridRowId) => () => {
		setRows(rows.filter((row) => row.id !== id));
	};

	const processRowUpdate = async (newRow: GridRowModel, oldRow: GridRowModel) => {
		const updatedRow = { ...newRow, isNew: false };
		setRows([]);
		return updatedRow;
	};

	const handleRowEditStart = (params: GridRowParams, event: MuiEvent<React.SyntheticEvent>) => {
		event.defaultMuiPrevented = true;
	};

	const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
		if (params.reason === GridRowEditStopReasons.rowFocusOut) {
			event.defaultMuiPrevented = true;
		}
	};

	const handleRowModesModelChange = useCallback((newModel: GridRowModesModel) => {
		setRowModesModel(newModel);
	}, []);

	const handleCancelClick = (id: GridRowId) => () => {
		setRowModesModel({
			...rowModesModel,
			[id]: { mode: GridRowModes.View, ignoreModifications: true }
		});

		const editedRow = rows.find((row) => row.id === id);
		if (editedRow.isNew) {
			setRows(rows.filter((row) => row.id !== id));
		}
	};

	const handleAddRow = () => {
		const id = uniqueId();
		setRows((oldRows) => [...oldRows, { id, stationNumber: '', isActive: false, isNew: true }] as Row[]);
		setRowModesModel((oldModel) => ({
			...oldModel,
			[id]: { mode: GridRowModes.Edit, fieldToFocus: 'stationNumber' }
		}));
	};

	const columns: GridColDef[] = [
		{
			headerName: 'Estación',
			field: 'stationNumber',
			flex: 1,
			headerAlign: 'left',
			align: 'left',
			type: 'number',
			editable: true
		},
		{
			headerName: 'Tipo',
			field: ' ',
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
			headerAlign: 'left',
			align: 'left',
			type: 'boolean',
			editable: true
		},
		{
			field: 'actions',
			type: 'actions',
			width: 100,
			headerName: 'Acciones',
			getActions: ({ id }) => {
				const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

				if (isInEditMode) {
					return [
						<GridActionsCellItem
							icon={<Save />}
							label="Save"
							sx={{
								color: 'primary.main'
							}}
							onClick={handleSaveClick(id)}
						/>,
						<GridActionsCellItem
							icon={<Cancel />}
							label="Cancel"
							className="textPrimary"
							onClick={handleCancelClick(id)}
							color="inherit"
						/>
					];
				}

				return [
					<GridActionsCellItem
						icon={<Edit />}
						label="Edit"
						className="textPrimary"
						onClick={handleEditClick(id)}
						color="inherit"
					/>,
					<GridActionsCellItem
						icon={<Delete />}
						label="Delete"
						onClick={handleDeleteClick(id)}
						color="inherit"
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
							onClick={handleAddRow}
						>
							Agregar
						</Button>
					</Stack>
				</Stack>
			</DialogTitle>
			<DialogContent>
				<Stack height="400px">
					<DataGrid
						getRowId={(data) => (data as Row).id}
						editMode="row"
						rowModesModel={rowModesModel}
						onRowModesModelChange={handleRowModesModelChange}
						processRowUpdate={processRowUpdate}
						onRowEditStart={handleRowEditStart}
						onRowEditStop={handleRowEditStop}
						columns={columns}
						rows={rows}
						loading={isLoading}
						hideFooter
					/>
				</Stack>
			</DialogContent>
		</Dialog>
	);
}

export default CrudDevicesDialog;
