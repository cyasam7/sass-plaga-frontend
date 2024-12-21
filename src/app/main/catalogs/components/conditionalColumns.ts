import { GridColDef } from '@mui/x-data-grid';
import { CatalogType, ECatalogType } from 'src/app/shared/entities/CatalogEntities';

export function conditionalColumns(type: ECatalogType): GridColDef<CatalogType>[] {
	let result: GridColDef<CatalogType>[] = [];
	if (type !== ECatalogType.INSECTICIDE) {
		result = [
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
			}
		];
	} else {
		result = [
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
				headerName: 'NOMBRE COMERCIAL',
				field: 'comercialName',
				sortable: false,
				align: 'left',
				headerAlign: 'left',
				flex: 0.5,
				hideSortIcons: true,
				minWidth: 200,
				disableColumnMenu: true
			},
			{
				headerName: 'QUÍMICA',
				field: 'chemical',
				sortable: false,
				align: 'left',
				headerAlign: 'left',
				flex: 0.5,
				hideSortIcons: true,
				minWidth: 200,
				disableColumnMenu: true
			},
			{
				headerName: 'DOSIS',
				field: 'doses',
				sortable: false,
				align: 'left',
				headerAlign: 'left',
				flex: 0.5,
				hideSortIcons: true,
				minWidth: 200,
				disableColumnMenu: true,
				valueFormatter: ({ value }) => (value as string[]).join(',')
			}
		];
	}

	return result;
}
