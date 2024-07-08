import FusePageSimple from '@fuse/core/FusePageSimple';
import { useTranslation } from 'react-i18next';
import { styled } from '@mui/material/styles';
import { Paper, Stack } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { useQuery } from 'react-query';
import { UserService } from 'src/app/shared/services/UserService';
import { Edit, SignLanguageOutlined, RemoveCircle } from '@mui/icons-material';
import { useMemo, useState } from 'react';
import { openDialog } from 'app/shared-components/GlobalDialog/openDialog';
import useQueryInvalidator from 'src/app/shared-hooks/useQueryInvalidator';
import { displayToast } from '@fuse/core/FuseMessage/DisplayToast';
import { useAppSelector } from 'app/store/store';
import { selectUser } from 'src/app/auth/user/store/userSlice';
import { IDataGridUserRow } from 'src/app/shared/entities/UserEntity';
import { columnsUsers } from './columns';
import HeaderGrid from './components/HeaderGrid/HeaderGrid';
import DialogUser from './components/DialogUser/DialogUser';

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

function Users() {
	const { t } = useTranslation('examplePage');

	const [userId, setUserId] = useState('');
	const [search, setSearch] = useState('');
	const [isActive, setIsActive] = useState<boolean | null>(null);
	const { invalidate } = useQueryInvalidator();
	const [openUserDialog, setOpenUserDialog] = useState(false);
	const userLogged = useAppSelector(selectUser);

	const { data, isLoading } = useQuery({
		queryFn: () => UserService.getUsersDatagrid(userLogged.uid),
		queryKey: 'users-registered',
		enabled: !!userLogged.uid
	});

	const columns: GridColDef<IDataGridUserRow>[] = [
		...columnsUsers,
		{
			field: 'actions',
			headerName: 'ACCIONES',
			width: 100,
			disableColumnMenu: true,
			type: 'actions',
			getActions: (params) => {
				return [
					<GridActionsCellItem
						key={0}
						label="MODIFICAR"
						icon={<Edit />}
						showInMenu
						onClick={() => {
							setUserId(params.row.userId);
							setOpenUserDialog(true);
						}}
					/>,
					<GridActionsCellItem
						key={0}
						label="ELIMINAR"
						icon={<RemoveCircle />}
						showInMenu
						onClick={() => {
							openDialog({
								title: 'Acción requerida',
								text: '¿Seguro que deseas eliminar este usuario?',
								onAccept: async () => {
									await UserService.remove(params.row.userId);
									displayToast({
										message: 'Usuario eliminado correctamente',
										anchorOrigin: {
											horizontal: 'right',
											vertical: 'top'
										},
										variant: 'success'
									});
									invalidate('users-registered');
								}
							});
						}}
					/>,
					<GridActionsCellItem
						key={0}
						label="ACTUALIZAR FIRMA"
						icon={<SignLanguageOutlined />}
						showInMenu
						onClick={() => {}}
					/>
				];
			}
		}
	];

	const filteredData = useMemo(() => {
		const searchLowerCase = search.toLowerCase();

		let copyData = [...(data ?? [])];

		if (search) {
			copyData = copyData.filter((i) => {
				return (
					i.email.toLowerCase().includes(searchLowerCase) ||
					i.name.toLowerCase().includes(searchLowerCase) ||
					i.phone.toLowerCase().includes(searchLowerCase)
				);
			});
		}

		if (isActive !== null) {
			copyData = copyData.filter((i) => i.isActive === isActive);
		}

		return copyData;
	}, [search, isActive, data]);

	return (
		<Root
			header={
				<div className="p-24">
					<h4>{t('TITLE')}</h4>
				</div>
			}
			content={
				<div className="p-24 w-full">
					<Paper className="p-24 w-full">
						<Stack sx={{ height: 'calc(100vh - 240px)' }}>
							<DialogUser
								userId={userId}
								open={openUserDialog}
								onClose={() => setOpenUserDialog(false)}
							/>
							<HeaderGrid
								onChangeIsActive={setIsActive}
								onChangeSearch={setSearch}
								onClickCreate={() => setOpenUserDialog(true)}
							/>
							<DataGrid
								getRowId={(i) => i.userId}
								rows={filteredData ?? []}
								loading={isLoading}
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

export default Users;
