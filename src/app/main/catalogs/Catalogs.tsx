import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import { Paper, Stack, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { useQuery, useQueryClient } from 'react-query';
import { CatalogService } from 'src/app/shared/services/CatalogService';
import { CatalogType, ECatalogType } from 'src/app/shared/entities/CatalogEntities';
import { useState } from 'react';
import { NoteAlt, RemoveCircleOutline } from '@mui/icons-material';
import { openDialog } from 'app/shared-components/GlobalDialog/openDialog';
import { displayToast } from '@fuse/core/FuseMessage/DisplayToast';
import HeaderCatalogTag from './components/HeaderCatalogTag/HeaderCatalogTag';
import BasicCatalogDialog from './components/BasicCatalogDialog/BasicCatalogDialog';
import { conditionalColumns } from './components/conditionalColumns';
import InsecticideCatalogDialog from './components/InsecticideCatalogDialog/InsecticideDialog';

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
	const [catalogId, setCatalogId] = useState<string>('');
	const [isOpenDialogCatalogInsecticide, setIsOpenDialogCatalogInsecticide] = useState<boolean>(false);
	const [isOpenDialogCatalogBasic, setIsOpenDialogCatalogBasic] = useState<boolean>(false);

	const queryClient = useQueryClient();

	const { data = [], isLoading } = useQuery({
		queryFn: () => CatalogService.getCatalogType(catalog),
		queryKey: ['list-catalogs', catalog]
	});

	const columns: GridColDef<CatalogType>[] = [
		...conditionalColumns(catalog),
		{
			headerName: 'ACCIONES',
			field: 'actions',
			sortable: false,
			minWidth: 50,
			align: 'center',
			type: 'actions',
			disableColumnMenu: true,
			getActions: ({ row }) => {
				const { id, type } = row;

				return [
					<GridActionsCellItem
						key={0}
						label="MODIFICAR"
						icon={<NoteAlt />}
						showInMenu
						onClick={() => {
							handleOpenModalByType(id, type);
						}}
					/>,
					<GridActionsCellItem
						key={1}
						label="ELIMINAR"
						icon={<RemoveCircleOutline />}
						showInMenu
						onClick={async () => {
							await handleDelete(id, type);
						}}
					/>
				];
			}
		}
	];

	async function handleDelete(id: string, catalogType: ECatalogType): Promise<void> {
		openDialog({
			title: 'Acción requerida',
			text: '¿Seguro que deseas eliminar este catalogo?',
			onAccept: async () => {
				await CatalogService.deleteCatalogTypeById({ id, catalogType });
				displayToast({
					message: 'Catalogo eliminado correctamente',
					anchorOrigin: {
						horizontal: 'right',
						vertical: 'top'
					},
					variant: 'success'
				});
				queryClient.invalidateQueries(['list-catalogs', catalog]);
			}
		});
	}

	function handleOpenModalByType(id: string, typeRow: ECatalogType) {
		setCatalogId(id);
		if (typeRow === ECatalogType.INSECTICIDE) {
			setIsOpenDialogCatalogInsecticide(true);
		} else {
			setIsOpenDialogCatalogBasic(true);
		}
	}

	function handleOpen(): void {
		handleOpenModalByType('', catalog);
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
								type={catalog}
								id={catalogId}
								open={isOpenDialogCatalogBasic}
								onClose={() => {
									setIsOpenDialogCatalogBasic(false);
									setCatalogId('');
								}}
							/>
							<InsecticideCatalogDialog
								id={catalogId}
								open={isOpenDialogCatalogInsecticide}
								onClose={() => {
									setIsOpenDialogCatalogInsecticide(false);
									setCatalogId('');
								}}
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
