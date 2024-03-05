import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useQuery } from 'react-query';
import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CommentIcon from '@mui/icons-material/Comment';
import { columnsOrders } from './columns';
import { OrderService } from './service/OrderService';
import OrderHeaderTabs from './components/HeaderTabs/HeaderTabs';
import { ETabsPlagues } from './components/HeaderTabs/IHeaderTabsProps';
import { OrderEntity } from './service/OrderEntity';
import OrderDialog from './components/OrderDialog/OrderDialog';

function Order() {
	const [tabFilter, setTabFilter] = useState<ETabsPlagues>(ETabsPlagues.ALL);
	const [open, setOpen] = useState<boolean>(false);

	const {
		data = [],
		isLoading,
		refetch
	} = useQuery({
		queryKey: 'orders',
		queryFn: () => OrderService.getAll()
	});

	const columns: GridColDef<OrderEntity>[] = [
		...columnsOrders,
		{
			headerName: 'ACCIONES',
			field: 'actions',
			sortable: false,
			minWidth: 50,
			align: 'center',
			type: 'actions',
			disableColumnMenu: true,
			getActions: () => {
				return [
					<GridActionsCellItem
						key={0}
						label="AGREGAR OBSERVACIÓN"
						icon={<CommentIcon />}
						showInMenu
					/>,
					<GridActionsCellItem
						key={1}
						label="CAMBIAR ESTATUS"
						icon={<AutorenewIcon />}
						showInMenu
					/>,
					<GridActionsCellItem
						key={2}
						label="VER"
						icon={<RemoveRedEyeIcon />}
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
					<Typography variant="h6">Ordenes de servicio</Typography>
					<div className="flex items-center space-x-16">
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
				<div className="px-10 gap">
					<OrderDialog
						open={open}
						onCancel={() => setOpen(false)}
						onSubmit={async () => {
							await refetch();
						}}
					/>
					<OrderHeaderTabs
						onChange={setTabFilter}
						value={tabFilter}
					/>
					<Box sx={{ height: 'calc(100vh - 220px)', pt: 2 }}>
						<DataGrid
							loading={isLoading}
							rows={data}
							columns={columns}
						/>
					</Box>
				</div>
			}
		/>
	);
}

export default Order;
