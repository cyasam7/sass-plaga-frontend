import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useQuery } from 'react-query';
import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import dayjs, { Dayjs } from 'dayjs';
import MoveUpIcon from '@mui/icons-material/MoveUp';
import { DatePicker } from '@mui/x-date-pickers';
import { columnsOrders } from './columns';
import { OrderService } from '../../shared/services/OrderService';
import OrderHeaderTabs from './components/HeaderTabs/HeaderTabs';
import { ETabsPlagues } from './components/HeaderTabs/IHeaderTabsProps';
import { EStatusOrder, OrderEntity } from '../../shared/entities/OrderEntity';
import OrderDialog from './components/OrderDialog/OrderDialog';
import OrderDetailDialog from './components/OrderDetailDialog/OrderDetailDialog';
import OrderChangeStatusDialog from './components/OrderChangeStatusDialog/OrderChangeStatusDialog';
import OrderFollowUpDialog from './components/OrderFollowUpDialog/OrderFollowUpDialog';

function Order() {
	const [tabFilter, setTabFilter] = useState<ETabsPlagues>(ETabsPlagues.ALL);
	const [calendarFilter, setCalendarFilter] = useState<Dayjs | null>(null);
	const [open, setOpen] = useState<boolean>(false);
	const [openDetails, setOpenDetails] = useState<boolean>(false);
	const [openStatus, setOpenStatus] = useState<boolean>(false);
	const [openFollow, setOpenFollow] = useState<boolean>(false);
	const [orderId, setOrderId] = useState<string>('');
	const [openCalendar, setOpenCalendar] = useState<boolean>(false);

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
			getActions: (params) => {
				const { status } = params.row;
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
						disabled={status === EStatusOrder.REALIZED}
					/>,
					<GridActionsCellItem
						key={1}
						label="CAMBIAR ESTATUS"
						icon={<AutorenewIcon />}
						showInMenu
						onClick={() => {
							setOrderId(params.row.id);
							setOpenStatus(true);
						}}
						disabled={status === EStatusOrder.REALIZED}
					/>,
					<GridActionsCellItem
						key={2}
						label="CREAR SEGUIMIENTO"
						icon={<MoveUpIcon />}
						showInMenu
						onClick={() => {
							setOrderId(params.row.id);
							setOpenFollow(true);
						}}
					/>,
					<GridActionsCellItem
						key={3}
						label="VER"
						icon={<RemoveRedEyeIcon />}
						showInMenu
						onClick={() => {
							setOrderId(params.row.id);
							setOpenDetails(true);
						}}
					/>
				];
			}
		}
	];

	function filterValues(data: OrderEntity[]): OrderEntity[] {
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
				return i.status === EStatusOrder.NO_REALIZED;
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

		return [...data].reverse();
	}

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
					{/* <CalendarDialog open={openCalendar} /> */}
					<OrderDialog
						open={open}
						id={orderId}
						onCancel={() => {
							setOpen(false);
							setOrderId('');
						}}
						onSubmit={async () => {
							await refetch();
						}}
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
					<OrderHeaderTabs
						onChange={setTabFilter}
						value={tabFilter}
					/>
					{/* <div className="flex w-full justify-end">
						<Button onClick={() => setOpenCalendar(true)}>Abrir calendario</Button>
					</div> */}
					<div className="flex w-full justify-end">
						<DatePicker
							value={calendarFilter}
							onChange={setCalendarFilter}
							slotProps={{
								textField: { size: 'small' },
								field: {
									clearable: true
								}
							}}
						/>
					</div>
					<Box sx={{ height: 'calc(100vh - 220px)', pt: 2 }}>
						<DataGrid
							loading={isLoading}
							rows={filterValues(data)}
							columns={columns}
						/>
					</Box>
				</div>
			}
		/>
	);
}

export default Order;
