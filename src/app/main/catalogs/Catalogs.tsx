import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import { Paper, Stack, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { useQuery } from 'react-query';
import { CatalogService } from 'src/app/shared/services/CatalogService';
import { CatalogType, ECatalogType } from 'src/app/shared/entities/CatalogEntities';
import { useState } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import HeaderCatalogTag from './components/HeaderCatalogTag/HeaderCatalogTag';
import BasicCatalogDialog from './components/BasicCatalogDialog/BasicCatalogDialog';
import { IBasicCatalogConfig } from './ICatalogs';

const Root = styled(FusePageSimple)(({ theme }) => ({
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

function Catalogs() {
	const [catalog, setCatalog] = useState<ECatalogType>(ECatalogType.APPLICATION_TYPE);
	const [configBasicDialog, setBasicDialog] = useState<IBasicCatalogConfig | null>(null);

	const isCatalogDialogOpen = Boolean(configBasicDialog);

	const { data = [], isLoading } = useQuery({
		queryFn: () => CatalogService.getCatalogType(catalog),
		queryKey: ['list-catalogs', catalog]
	});

	const columns: GridColDef<CatalogType>[] = [
		{
			headerName: 'IDENTIFICADOR',
			field: 'id',
			sortable: false,
			align: 'left',
			headerAlign: 'left',
			flex: 0.3,
			hideSortIcons: true,
			minWidth: 150,
			disableColumnMenu: true
		},
		{
			headerName: 'NOMBRE',
			field: 'name',
			sortable: false,
			align: 'left',
			headerAlign: 'left',
			flex: 0.5,
			hideSortIcons: true,
			minWidth: 200,
			disableColumnMenu: true
		},
		{
			headerName: 'ACCIONES',
			field: 'actions',
			sortable: false,
			minWidth: 50,
			align: 'center',
			type: 'actions',
			disableColumnMenu: true,
			getActions: ({ row }) => {
				return [
					<GridActionsCellItem
						key={0}
						label="MODIFICAR"
						icon={<RemoveRedEyeIcon />}
						showInMenu
						onClick={() => {
							setBasicDialog({ id: row.id, type: row.type as ECatalogType });
						}}
					/>,
					<GridActionsCellItem
						key={1}
						label="Eliminar"
						icon={<RemoveRedEyeIcon />}
						showInMenu
						onClick={() => {
							setBasicDialog({ id: row.id, type: row.type as ECatalogType });
						}}
					/>
				];
			}
		}
	];

	function handleOpen(): void {
		setBasicDialog({ id: '', type: catalog });
	}

	return (
		<Root
			header={
				<div className="p-24">
					<Typography variant="h6">Catálogos</Typography>
				</div>
			}
			content={
				<div className="p-24 w-full">
					<Paper className="p-24 w-full">
						<Stack sx={{ height: 'calc(100vh - 240px)' }}>
							<BasicCatalogDialog
								open={isCatalogDialogOpen}
								onClose={() => setBasicDialog(null)}
								{...configBasicDialog}
							/>
							<DataGrid
								slots={{
									toolbar: HeaderCatalogTag
								}}
								slotProps={{
									toolbar: {
										onChangeTab: setCatalog,
										onClickOpenModal: handleOpen,
										value: catalog
									}
								}}
								loading={isLoading}
								rows={data}
								columns={columns}
								hideFooter
							/>
						</Stack>
					</Paper>
				</div>
			}
		/>
	);
}

export default Catalogs;
