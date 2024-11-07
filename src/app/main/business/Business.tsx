import { Box, Button, TextField, Typography } from '@mui/material';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { useQuery } from 'react-query';

import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { openDialog } from 'app/shared-components/GlobalDialog/openDialog';
import { displayToast } from '@fuse/core/FuseMessage/DisplayToast';
import { styled } from '@mui/material/styles';
import { BusinessRow } from 'src/app/shared/entities/BusinessEntity';
import { BusinessService } from '../../shared/services/CompanyService';
import CreateCompany from './components/CreateCompany';

const Root = styled(FusePageCarded)(({ theme }) => ({
	'& .FusePageSimple-header': {
		backgroundColor: theme.palette.background.paper,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderColor: theme.palette.divider
	},
	'& .FusePageSimple-content': {},
	'& .FusePageSimple-sidebarHeader': {},
	'& .FusePageSimple-sidebarContent': {}
}));

function Companies() {
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const { data = [], isLoading, refetch } = useQuery<BusinessRow[]>('business', () => BusinessService.getBy());

	const columns: GridColDef<BusinessRow>[] = [
		{
			field: 'name',
			headerName: 'Name',
			minWidth: 150,
			flex: 1,
			sortable: false,
			disableColumnMenu: true
		},
		{
			field: 'address',
			headerName: 'Address',
			minWidth: 150,
			flex: 1,
			sortable: false,
			disableColumnMenu: true
		},
		{
			field: 'contactName',
			headerName: 'Nombre de contacto',
			minWidth: 150,
			flex: 1,
			sortable: false,
			disableColumnMenu: true
		},
		{
			field: 'contactPhone',
			headerName: 'Teléfono de contacto',
			minWidth: 150,
			flex: 1,
			sortable: false,
			disableColumnMenu: true
		},
		{
			field: 'actions',
			type: 'actions',
			headerName: 'Actions',
			maxWidth: 100,
			flex: 1,
			sortable: false,
			disableColumnMenu: true,
			getActions: (params) => {
				return [
					<GridActionsCellItem
						key={1}
						label="Ver"
						icon={<RemoveRedEyeIcon />}
						onClick={() => {}}
						showInMenu
					/>,
					<GridActionsCellItem
						key={1}
						label="Editar"
						icon={<EditIcon />}
						onClick={() => {}}
						showInMenu
					/>,
					<GridActionsCellItem
						key={1}
						label="Eliminar"
						icon={<DeleteIcon />}
						onClick={() => {
							openDialog({
								title: 'Confirmación requerido',
								text: '¿Seguro que deseas eliminar este registro?',
								onAccept: async () => {
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
						}}
						showInMenu
					/>
				];
			}
		}
	];

	return (
		<Root
			header={
				<div className="p-24 w-full flex justify-between items-center">
					<Typography variant="h6">Compañías para revision</Typography>
					<div className="flex items-center space-x-16">
						<TextField
							placeholder="Search"
							size="small"
						/>
						<Button
							color="primary"
							variant="contained"
							onClick={() => setOpen(true)}
						>
							Nuevo
						</Button>
					</div>
				</div>
			}
			content={
				<div className="">
					<CreateCompany
						open={open}
						onClose={() => setOpen(false)}
					/>
					<Box sx={{ height: 'calc(100vh - 140px);' }}>
						<DataGrid
							loading={isLoading}
							rows={data}
							columns={columns}
							getRowId={(i) => i.id}
						/>
					</Box>
				</div>
			}
		/>
	);
}

export default Companies;
