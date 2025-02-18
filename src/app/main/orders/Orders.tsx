import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { useQuery } from 'react-query';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import dayjs, { Dayjs } from 'dayjs';
import MoveUpIcon from '@mui/icons-material/MoveUp';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { Delete } from '@mui/icons-material';
import { openDialog } from 'app/shared-components/GlobalDialog/openDialog';
import { displayToast } from '@fuse/core/FuseMessage/DisplayToast';
import { columnsOrders } from './columns';
import { OrderService } from '../../shared/services/OrderService';
import { DatagridRowOrder, EStatusOrder } from '../../shared/entities/OrderEntity';
import OrderDialog from './components/OrderDialog/OrderDialog';
import OrderDetailDialog from './components/OrderDetailDialog/OrderDetailDialog';
import OrderChangeStatusDialog from './components/OrderChangeStatusDialog/OrderChangeStatusDialog';
import OrderFollowUpDialog from './components/OrderFollowUpDialog/OrderFollowUpDialog';
import HeaderFilters from './components/HeaderFilters/HeaderFilters';
import { validateIfOrderIsPending } from './utils';
import AssignOrderDialog from './components/AssignOrderDialog/AssignOrderDialog';
import { ETabsPlagues } from './components/HeaderFilters/HeaderFilterProps';

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

function Order() {
	const [tabFilter, setTabFilter] = useState<ETabsPlagues | undefined>(ETabsPlagues.ALL);
	const [statusFilter, setStatusFilter] = useState<EStatusOrder | undefined>();
	const [calendarFilter, setCalendarFilter] = useState<Dayjs | undefined>(null);
	const [open, setOpen] = useState<boolean>(false);
	const [openDetails, setOpenDetails] = useState<boolean>(false);
	const [openStatus, setOpenStatus] = useState<boolean>(false);
	const [openAssign, setOpenAssign] = useState<boolean>(false);
	const [openFollow, setOpenFollow] = useState<boolean>(false);
	const [shouldOpenDialogAssign, setShouldOpenDialogAssign] = useState<boolean>(false);
	const [orderId, setOrderId] = useState<string>('');

	const {
		data = [],
		isLoading,
		refetch
	} = useQuery({
		queryKey: 'orders',
		queryFn: () => OrderService.getDatagridOrders()
	});
	const columns: GridColDef<DatagridRowOrder>[] = [
		...columnsOrders,
		{
			headerName: 'ACCIONES',
			field: 'actions',
			sortable: false,
			minWidth: 50,
			align: 'center',
			type: 'actions',
			disableColumnMenu: true,
			getActions: (params) => {
				const { status, assignedId } = params.row;

				return [
					<GridActionsCellItem
						key={0}
						label="MODIFICAR"
						icon={<NoteAltIcon />}
						showInMenu
						onClick={() => {
							setOrderId(params.row.id);
							setOpen(true);
						}}
						disabled={[EStatusOrder.FINISHED, EStatusOrder.CANCELED].includes(status)}
					/>,
					<GridActionsCellItem
						key={1}
						label={assignedId ? 'RE-ASIGNAR' : 'ASIGNAR'}
						icon={<AssignmentIndIcon />}
						showInMenu
						onClick={() => {
							setOrderId(params.row.id);
							setOpenAssign(true);
						}}
						disabled={[EStatusOrder.DONE, EStatusOrder.FINISHED, EStatusOrder.CANCELED].includes(status)}
					/>,
					/* <GridActionsCellItem
						key={2}
						label="CAMBIAR ESTATUS"
						icon={<AutorenewIcon />}
						showInMenu
						onClick={() => {
							setOrderId(params.row.id);
							setOpenStatus(true);
						}}
						disabled={status === EStatusOrder.REALIZED} 
					/>,
					*/
					<GridActionsCellItem
						key={3}
						label="CREAR SEGUIMIENTO"
						icon={<MoveUpIcon />}
						showInMenu
						onClick={() => {
							setOrderId(params.row.id);
							setOpenFollow(true);
						}}
					/>,
					<GridActionsCellItem
						key={4}
						label="VER"
						icon={<RemoveRedEyeIcon />}
						showInMenu
						onClick={() => {
							setOrderId(params.row.id);
							setOpenDetails(true);
						}}
					/>,
					<GridActionsCellItem
						key={5}
						label="ELIMINAR"
						icon={<Delete />}
						showInMenu
						onClick={() => {
							openDialog({
								title: 'Advertencia',
								text: '¿Estas seguro que deseas eliminar la orden de servicio?',
								onAccept: async () => {
									await OrderService.deleteById(params.row.id);
									await refetch();
									displayToast({
										message: 'Se ha eliminado correctamente',
										variant: 'success',
										autoHideDuration: 1000,
										anchorOrigin: {
											horizontal: 'right',
											vertical: 'top'
										}
									});
								}
							});
						}}
					/>
				];
			}
		}
	];

	function filterValues(data: DatagridRowOrder[]): DatagridRowOrder[] {
		if (tabFilter === ETabsPlagues.TODAY) {
			data = data.filter((i) => {
				const date = dayjs(i.date);
				const startDay = dayjs().startOf('day');
				const finalDay = dayjs().endOf('day');
				return date.isAfter(startDay) && date.isBefore(finalDay);
			});
		}

		if (tabFilter === ETabsPlagues.TOMORROW) {
			data = data.filter((i) => {
				const date = dayjs(i.date);
				const startDay = dayjs().startOf('day').add(1, 'day');
				const finalDay = dayjs().endOf('day').add(1, 'day');
				return date.isAfter(startDay) && date.isBefore(finalDay);
			});
		}

		if (tabFilter === ETabsPlagues.PENDING) {
			data = data.filter((i) => {
				const dateOrder = dayjs(i.date);
				const today = dayjs();
				return dateOrder.isAfter(today) && validateIfOrderIsPending(i.status);
			});
		}

		if (calendarFilter) {
			data = data.filter((i) => {
				const date = dayjs(i.date);
				const startDate = dayjs(calendarFilter).startOf('day');
				const finalDate = dayjs(calendarFilter).endOf('day');
				return date.isAfter(startDate) && date.isBefore(finalDate);
			});
		}

		if (statusFilter) {
			data = data.filter((i) => {
				return i.status === statusFilter;
			});
		}

		return [...data].reverse();
	}

	return (
		<Root
			header={
				<div className="p-24 w-full flex justify-between items-center">
					<Typography variant="h6">Ordenes de servicio</Typography>
					<div className="flex items-center">
						<Button
							color="primary"
							variant="contained"
							onClick={() => {
								setOpen(true);
								setShouldOpenDialogAssign(true);
							}}
						>
							Nuevo
						</Button>
					</div>
				</div>
			}
			content={
				<div className="p-24 w-full">
					{/* TODO: PENDIENTE <DialogReport /> */}
					<OrderDialog
						open={open}
						id={orderId}
						onCancel={() => {
							setOpen(false);
							setOrderId('');
						}}
						shouldOpenDialogAssign={shouldOpenDialogAssign}
						onSubmit={async (orderId, shouldOpenDialogAssign) => {
							await refetch();
							if (shouldOpenDialogAssign) {
								setOrderId(orderId);
								setOpenAssign(true);
							}
							setShouldOpenDialogAssign(false);
						}}
					/>
					<AssignOrderDialog
						orderId={orderId}
						open={openAssign}
						onClose={() => setOpenAssign(false)}
					/>
					<OrderFollowUpDialog
						id={orderId}
						onClose={() => setOpenFollow(false)}
						open={openFollow}
						onSubmit={async () => {
							await refetch();
						}}
					/>
					<OrderDetailDialog
						open={openDetails}
						id={orderId}
						onClose={() => {
							setOrderId('');
							setOpenDetails(false);
						}}
					/>
					<OrderChangeStatusDialog
						open={openStatus}
						id={orderId}
						onClose={() => {
							setOrderId('');
							setOpenStatus(false);
						}}
					/>
					<Paper className="p-24 w-full">
						<Stack sx={{ height: 'calc(100vh - 240px)' }}>
							<DataGrid
								slots={{
									toolbar: HeaderFilters
								}}
								slotProps={{
									toolbar: {
										onChangeDate: setCalendarFilter,
										onChangeDay: setTabFilter,
										onChangeStatus: setStatusFilter
									}
								}}
								loading={isLoading}
								rows={filterValues(data)}
								columns={columns}
							/>
						</Stack>
					</Paper>
				</div>
			}
		/>
	);
}

export default Order;
