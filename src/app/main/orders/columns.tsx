import { Chip, Stack, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';

import { DATE_FORMAT, TIME_FORMAT } from 'src/app/shared-constants/dateFormat';
import { formatCurrency } from 'src/app/shared-constants/formatCurrency';
import { OrderEntity } from './service/OrderEntity';

const statusLabel = {
	REALIZED: 'Realizada',
	NO_REALIZED: 'No Realizada',
	CANCELLED: 'Cancelada'
};

const statusColor = {
	REALIZED: 'success',
	NO_REALIZED: 'warning',
	CANCELLED: 'error'
};

export const columnsOrders: GridColDef<OrderEntity>[] = [
	{
		headerName: 'CLIENTE',
		field: 'client',
		sortable: false,
		flex: 2,
		minWidth: 300,
		align: 'left',
		disableColumnMenu: true,
		renderCell: ({ row }) => {
			return (
				<Stack>
					<Typography variant="subtitle2">{`${row.client.name}. Tel. (${row.client.phone})`}</Typography>
					<Typography variant="body2">{`${row.client.address}`}</Typography>
				</Stack>
			);
		}
	},
	{
		headerName: 'INICIAL',
		field: 'type',
		sortable: false,
		flex: 1,
		align: 'left',
		disableColumnMenu: true,
		renderCell({ row }) {
			const condition = !row.isFollowUp;

			return (
				<Chip
					color="info"
					label={condition ? 'INICIAL' : 'SEGUIMIENTO'}
				/>
			);
		}
	},
	{
		headerName: 'FECHA DE SERVICIO',
		headerAlign: 'left',
		field: 'date',
		sortable: true,
		flex: 1,
		align: 'left',
		width: 200,
		disableColumnMenu: true,
		renderCell: ({ row }) => {
			return (
				<Stack>
					<Stack
						direction="row"
						alignItems="center"
						spacing={0.2}
					>
						<Typography variant="subtitle2">Fecha:</Typography>
						<Typography variant="body2">{`${dayjs(row.date).format(DATE_FORMAT)}`}</Typography>
					</Stack>
					<Stack
						direction="row"
						alignItems="center"
						spacing={0.2}
					>
						<Typography variant="subtitle2">Hora:</Typography>
						<Typography variant="body2">{`${dayjs(row.date).format(TIME_FORMAT)}`}</Typography>
					</Stack>
				</Stack>
			);
		}
	},
	{
		headerName: 'ESTATUS',
		field: 'status',
		sortable: false,
		flex: 1,
		align: 'left',
		disableColumnMenu: true,
		renderCell({ row }) {
			const { status } = row;
			return (
				<Chip
					color={
						statusColor[status] as
							| 'default'
							| 'primary'
							| 'secondary'
							| 'error'
							| 'info'
							| 'success'
							| 'warning'
					}
					label={statusLabel[status]}
				/>
			);
		}
	},
	{
		headerName: 'COSTO',
		field: 'price',
		sortable: false,
		align: 'right',
		headerAlign: 'right',
		flex: 0.5,
		hideSortIcons: true,
		width: 200,
		disableColumnMenu: true,
		valueFormatter({ value }) {
			return `$${formatCurrency(String(value))}`;
		}
	}
];
