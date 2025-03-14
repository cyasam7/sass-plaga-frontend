import { Chip, Stack, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';

import { DATE_FORMAT, TIME_FORMAT } from 'src/app/shared-constants/dateFormat';
import { formatCurrency } from 'src/app/shared-constants/formatCurrency';
import ChipOrder from 'src/app/main/orders/components/ChipOrder/ChipOrder';
import { DatagridRowOrder } from '../../shared/entities/OrderEntity';
import { statusLabel } from './utils';

export const columnsOrders: GridColDef<DatagridRowOrder>[] = [
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
		headerName: 'ESTATUS',
		field: 'status',
		sortable: false,
		flex: 1,
		minWidth: 140,
		align: 'left',
		disableColumnMenu: true,
		valueGetter: ({ row }) => statusLabel[row.status],
		renderCell({ row }) {
			const { status } = row;
			return <ChipOrder status={status} />;
		}
	},

	{
		headerName: 'FECHA DE SERVICIO',
		headerAlign: 'left',
		field: 'date',
		sortable: true,
		flex: 1,
		align: 'left',
		minWidth: 200,
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
		headerName: 'INICIAL',
		field: 'type',
		sortable: false,
		flex: 1,
		minWidth: 150,
		align: 'left',
		disableColumnMenu: true,
		valueGetter: ({ row }) => (!row.isFollowUp ? 'INICIAL' : 'SEGUIMIENTO'),
		renderCell({ row, value }) {
			const condition = !row.isFollowUp;
			return (
				<Chip
					color={condition ? 'info' : 'secondary'}
					label={value as string}
				/>
			);
		}
	},
	{
		headerName: 'ASIGNADA',
		field: 'assignedName',
		sortable: false,
		align: 'left',
		headerAlign: 'left',
		flex: 0.5,
		hideSortIcons: true,
		minWidth: 200,
		disableColumnMenu: true,
		valueGetter({ value }) {
			return (value || 'Sin asignar') as string;
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
		minWidth: 150,
		disableColumnMenu: true,
		valueFormatter({ value }) {
			return `$${formatCurrency(String(value))}`;
		}
	}
];
