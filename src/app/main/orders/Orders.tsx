import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { useQuery } from 'react-query';
import { Button, Paper, Stack, Typography, IconButton, Drawer, useTheme, useMediaQuery, Tooltip } from '@mui/material';
import { useState } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import dayjs, { Dayjs } from 'dayjs';
import MoveUpIcon from '@mui/icons-material/MoveUp';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { Delete, FileDownload, FilterList, Add } from '@mui/icons-material';
import { openDialog } from 'app/shared-components/GlobalDialog/openDialog';
import { displayToast } from '@fuse/core/FuseMessage/DisplayToast';
import { columnsOrders } from './columns';
import { OrderService } from '../../shared/services/OrderService';
import { DatagridRowOrder, EStatusOrder } from '../../shared/entities/OrderEntity';
import OrderDialog from './components/SaveOrderOrderDialog/OrderDialog';
import OrderDetailDialog from './components/OrderDetailDialog/OrderDetailDialog';
import OrderChangeStatusDialog from './components/OrderChangeStatusDialog/OrderChangeStatusDialog';
import OrderFollowUpDialog from './components/OrderFollowUpDialog/OrderFollowUpDialog';
import HeaderFilters from './components/HeaderFilters/HeaderFilters';
import { validateIfOrderIsPending } from './utils';
import AssignOrderDialog from './components/AssignOrderDialog/AssignOrderDialog';
import { ETabsPlagues } from './components/HeaderFilters/HeaderFilterProps';
import { MobileCard } from './components/MobileCard/MobileCard';
import FusePageSimpleHeader from '@fuse/core/FusePageSimple/FusePageSimpleHeader';
import SimpleHeader from 'app/shared-components/SimpleHeader';
import './styles/actionButtons.css';

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
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const [tabFilter, setTabFilter] = useState<ETabsPlagues>(ETabsPlagues.ALL);
	const [statusFilter, setStatusFilter] = useState<EStatusOrder | undefined>();
	const [calendarFilter, setCalendarFilter] = useState<Dayjs | undefined>(null);
	const [open, setOpen] = useState<boolean>(false);
	const [openDetails, setOpenDetails] = useState<boolean>(false);
	const [openStatus, setOpenStatus] = useState<boolean>(false);
	const [openAssign, setOpenAssign] = useState<boolean>(false);
	const [openFollow, setOpenFollow] = useState<boolean>(false);
	const [shouldOpenDialogAssign, setShouldOpenDialogAssign] = useState<boolean>(false);
	const [orderId, setOrderId] = useState<string>('');
	const [openFilterDrawer, setOpenFilterDrawer] = useState(false);

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
						className="action-button"
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
						className="action-button"
					/>,
					<GridActionsCellItem
						key={3}
						label="CREAR SEGUIMIENTO"
						icon={<MoveUpIcon />}
						showInMenu
						onClick={() => {
							setOrderId(params.row.id);
							setOpenFollow(true);
						}}
						className="action-button"
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
						className="action-button"
					/>,
					<GridActionsCellItem
						key={6}
						label="CERTIFICADO DE FUMIGACIÓN"
						icon={
							<Tooltip
								title={
									<>
										<Typography color="inherit">Tooltip with HTML</Typography>
										<em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
										{"It's very engaging. Right?"}
									</>
								}
							>
								<FileDownload />
							</Tooltip>
						}
						showInMenu
						disabled={![EStatusOrder.DONE, EStatusOrder.FINISHED].includes(params.row.status)}
						onClick={async () => {
							await OrderService.downloadCertificate({
								daysValid: 30,
								id: params.row.id
							});
						}}
						className="action-button download"
					/>,
					<GridActionsCellItem
						key={7}
						label="ORDEN DE SERVICIO"
						icon={<FileDownload />}
						showInMenu
						disabled={![EStatusOrder.DONE, EStatusOrder.FINISHED].includes(params.row.status)}
						onClick={async () => {
							await OrderService.downloadServicesOrder(params.row.id);
						}}
						className="action-button download"
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
						className="action-button delete"
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
				return (date.isAfter(startDay) || date.isSame(startDay)) && date.isBefore(finalDay);
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

				return (date.isAfter(startDate) || date.isSame(startDate)) && date.isBefore(finalDate);
			});
		}

		if (statusFilter) {
			data = data.filter((i) => i.status === statusFilter);
		}

		return data;
	}

	const renderFilters = () => (
		<HeaderFilters
			selectedTab={tabFilter}
			selectedStatus={statusFilter}
			selectedDate={calendarFilter}
			onTabChange={setTabFilter}
			onStatusChange={setStatusFilter}
			onDateChange={setCalendarFilter}
		/>
	);

	return (
		<Root
			header={
				<FusePageSimpleHeader
					header={
						<SimpleHeader
							title="Ordenes de servicio"
							subtitle="Gestiona las ordenes de servicio"
							actions={
								<Button
									color="primary"
									variant="contained"
									startIcon={<Add />}
									onClick={() => {
										setOpen(true);
										setShouldOpenDialogAssign(true);
									}}
								>
									Nuevo
								</Button>
							}
						/>
					}
				/>
			}
			content={
				<div className="p-16 sm:p-24 w-full">
					<div className="flex gap-2 w-full sm:w-auto">
						{isMobile && (
							<IconButton
								color="primary"
								onClick={() => setOpenFilterDrawer(true)}
								className="flex-shrink-0"
							>
								<FilterList />
							</IconButton>
						)}
					</div>
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
						onClose={() => {
							setOpenAssign(false);
							setOrderId('');
						}}
					/>
					<OrderFollowUpDialog
						id={orderId}
						onClose={() => {
							setOrderId('');
							setOpenFollow(false);
						}}
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
					<Paper
						className="p-8 sm:p-24 w-full"
						sx={{
							height: '100%',
							maxHeight: 'calc(100vh - 240px)',
							display: 'flex',
							flexDirection: 'column'
						}}
					>
						{isMobile ? (
							<Stack
								spacing={2}
								sx={{
									flex: 1,
									overflowY: 'auto',
									pb: 2,
									'&::-webkit-scrollbar': {
										width: '8px',
										backgroundColor: 'transparent'
									},
									'&::-webkit-scrollbar-thumb': {
										backgroundColor: (theme) => theme.palette.divider,
										borderRadius: '4px'
									},
									scrollbarWidth: 'thin',
									scrollbarColor: (theme) => `${theme.palette.divider} transparent`
								}}
							>
								{filterValues(data).map((order) => (
									<MobileCard
										key={order.id}
										order={order}
										onView={(id) => {
											setOrderId(id);
											setOpenDetails(true);
										}}
										onEdit={(id) => {
											setOrderId(id);
											setOpen(true);
										}}
										onAssign={(id) => {
											setOrderId(id);
											setOpenAssign(true);
										}}
										onFollow={(id) => {
											setOrderId(id);
											setOpenFollow(true);
										}}
										onDownloadCertificate={async (id) => {
											await OrderService.downloadCertificate({
												daysValid: 30,
												id
											});
										}}
										onDelete={async (id) => {
											await OrderService.deleteById(id);
											await refetch();
										}}
									/>
								))}
							</Stack>
						) : (
							<Stack sx={{ height: 'calc(100vh - 240px)' }}>
								<DataGrid
									slots={{ toolbar: isMobile ? undefined : HeaderFilters }}
									hideFooterPagination
									slotProps={{
										toolbar: {
											selectedTab: tabFilter,
											selectedStatus: statusFilter,
											selectedDate: calendarFilter,
											onTabChange: setTabFilter,
											onStatusChange: setStatusFilter,
											onDateChange: setCalendarFilter
										}
									}}
									loading={isLoading}
									rows={filterValues(data)}
									columns={columns}
									rowSelection={false}
									density="compact"
									getRowHeight={() => 'auto'}
									sx={{
										'& .MuiDataGrid-cell': {
											py: 1,
											px: 1,
											wordBreak: 'break-word'
										},
										'& .MuiDataGrid-columnHeader': {
											py: 1,
											px: 1
										}
									}}
								/>
							</Stack>
						)}
					</Paper>

					<Drawer
						anchor="right"
						open={openFilterDrawer}
						onClose={() => setOpenFilterDrawer(false)}
						PaperProps={{
							sx: {
								width: '80%',
								maxWidth: '360px',
								p: 2
							}
						}}
					>
						<div className="flex flex-col h-full">
							<div className="flex justify-between items-center mb-4">
								<Typography variant="h6">Filtros</Typography>
								<IconButton onClick={() => setOpenFilterDrawer(false)}>
									<FilterList />
								</IconButton>
							</div>
							{renderFilters()}
						</div>
					</Drawer>
				</div>
			}
		/>
	);
}

export default Order;
