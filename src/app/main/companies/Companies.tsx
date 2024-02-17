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
			headerName: 'name',
			minWidth: 150,
			flex: 1,
			disableColumnMenu: true
		},
		{
			field: 'address',
			headerName: 'address',
			minWidth: 150,
			flex: 1,
			disableColumnMenu: true
		},
		{
			field: 'createdAt',
			type: 'actions',
			headerName: 'address',
			minWidth: 150,
			flex: 1,
			disableColumnMenu: true,
			getActions: (params) => {
				return [
					<GridActionsCellItem
						key={1}
						label="Ver"
						icon={<RemoveRedEyeIcon />}
						onClick={() => navigate(`details/${params.row.id}`, { state: { mode: 'see' } })}
					/>,
					<GridActionsCellItem
						key={1}
						label="Editar"
						icon={<EditIcon />}
						onClick={() => navigate(`details/${params.row.id}`, { state: { mode: 'edit' } })}
					/>,
					<GridActionsCellItem
						key={1}
						label="Eliminar"
						icon={<DeleteIcon />}
						onClick={() => navigate('editr')}
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
				<div className="p-24">
					<Box sx={{ height: 'calc(100vh - 128px);' }}>
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
