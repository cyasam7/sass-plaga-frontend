import { useTranslation } from 'react-i18next';
import { Box, Button, TextField, Typography } from '@mui/material';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import { useQuery } from 'react-query';
import { Paginated } from 'src/app/shared-interfaces/Paginated';

import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router';
import { CompanyEntity } from './services/CompanyEntity';
import { CompanyService } from './services/CompanyService';

function Companies() {
	const navigate = useNavigate();
	const { t } = useTranslation('examplePage');

	const { data, isLoading } = useQuery<Paginated<CompanyEntity>>('companies', () => CompanyService.getCompanies());

	const columns: GridColDef<CompanyEntity>[] = [
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
						onClick={() => navigate(`details/${params.row.id}`, { state: { mode: 'see' } })}
						showInMenu
					/>,
					<GridActionsCellItem
						key={1}
						label="Editar"
						icon={<EditIcon />}
						onClick={() => navigate(`details/${params.row.id}`, { state: { mode: 'edit' } })}
						showInMenu
					/>,
					<GridActionsCellItem
						key={1}
						label="Eliminar"
						icon={<DeleteIcon />}
						onClick={() => navigate('editr')}
						showInMenu
					/>
				];
			}
		}
	];

	return (
		<FusePageCarded
			header={
				<div className="p-24 w-full flex justify-between items-center">
					<Typography variant="h6">{t('TITLE')}</Typography>
					<div className="flex items-center space-x-16">
						<TextField
							placeholder="Search"
							size="small"
						/>
						<Button
							color="primary"
							variant="contained"
						>
							Nuevo
						</Button>
					</div>
				</div>
			}
			content={
				<div className="">
					<Box sx={{ height: 'calc(100vh - 140px);' }}>
						<DataGrid
							loading={isLoading}
							rows={data?.data ?? []}
							columns={columns}
						/>
					</Box>
				</div>
			}
		/>
	);
}

export default Companies;
