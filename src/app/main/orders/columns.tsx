import { Chip, Stack, Typography, Box } from '@mui/material';
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
				<Stack spacing={0.5}>
					<Typography variant="subtitle2" fontWeight="medium">
						{row.client.name}
					</Typography>
					<Stack direction="row" spacing={1}>
						<Typography variant="body2">
							{row.client.address}
						</Typography>
					</Stack>
					<Stack direction="row" spacing={1}>
						<Typography variant="body2">
							{row.client.phone}
						</Typography>
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
				<Stack spacing={0.5}>
					<Stack direction="row" alignItems="center" spacing={1}>
						<Typography variant="subtitle2" color="text.secondary">
							Fecha:
						</Typography>
						<Typography variant="body2" fontWeight="medium">
							{dayjs(row.date).format(DATE_FORMAT)}
						</Typography>
					</Stack>
					<Stack direction="row" alignItems="center" spacing={1}>
						<Typography variant="subtitle2" color="text.secondary">
							Hora:
						</Typography>
						<Typography variant="body2" fontWeight="medium">
							{dayjs(row.date).format(TIME_FORMAT)}
						</Typography>
					</Stack>
				</Stack>
			);
		}
	},
	{
		headerName: 'FOLIO',
		field: 'folio',
		sortable: false,
		flex: 1,
		minWidth: 150,
		align: 'left',
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
		},
		renderCell: ({ value }) => (
			<Typography
				variant="body2"
				color={value === 'Sin asignar' ? 'text.secondary' : 'text.primary'}
				fontWeight={value === 'Sin asignar' ? 'normal' : 'medium'}
			>
				{value}
			</Typography>
		)
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
		},
		renderCell: ({ value }) => (
			<Typography variant="body2" fontWeight="medium" color="primary">
				${formatCurrency(String(value))}
			</Typography>
		)
	}
];
