import React from 'react';
import { Button, Dialog, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import CustomDataGrid from 'app/shared-components/CustomDataGrid/CustomDataGrid';
import { GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { Delete, Edit } from '@mui/icons-material';
import { ICrudDevicesDialog } from './ICrudDevicesDialog';

function CrudDevicesDialog(props: ICrudDevicesDialog) {
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

	return (
		<Dialog
			open
			PaperProps={{ sx: { minWidth: '600px' } }}
		>
			<DialogTitle>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
				>
					<Typography variant="h6">Lista de dispositivos</Typography>
					<Button
						color="primary"
						variant="contained"
					>
						Agregar
					</Button>
				</Stack>
			</DialogTitle>
			<DialogContent>
				<Stack height="400px">
					<CustomDataGrid
						columns={columns}
						rows={[
							{
								id: 1,
								number: 1,
								isActive: false
							}
						]}
						loading={false}
						onPageChange={() => {}}
						onRowsPerPageChange={() => {}}
						page={1}
						rowsPerPage={10}
					/>
				</Stack>
			</DialogContent>
		</Dialog>
	);
}

export default CrudDevicesDialog;
