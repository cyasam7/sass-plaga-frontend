import { GridColDef } from '@mui/x-data-grid';
import { IDataGridUserRow } from 'src/app/shared/entities/UserEntity';

export const columnsUsers: GridColDef<IDataGridUserRow>[] = [
	{
		field: 'name',
		headerName: 'NOMBRE',
		flex: 1,
		disableColumnMenu: true
	},
	{
		field: 'email',
		headerName: 'CORREO',
		flex: 1,
		disableColumnMenu: true
	},
	{
		field: 'phone',
		headerName: 'TELÉFONO',
		flex: 1,
		disableColumnMenu: true
	},
	{
		field: 'rol',
		headerName: 'ROL',
		flex: 1,
		disableColumnMenu: true
	},
	{
		field: 'tenant',
		headerName: 'TENANT / COMPAÑÍA',
		flex: 1,
		disableColumnMenu: true
	},
	{
		field: 'isActive',
		headerName: 'ACTIVADO',
		flex: 1,
		disableColumnMenu: true
	}
];
