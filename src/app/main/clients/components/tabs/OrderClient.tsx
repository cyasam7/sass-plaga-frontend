import { Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ChipOrder from 'app/shared-components/ChipOrder/ChipOrder';
import dayjs from 'dayjs';
import React from 'react';
import { useQuery } from 'react-query';
import { DATE_FORMAT, TIME_FORMAT } from 'src/app/shared-constants/dateFormat';
import { formatCurrency } from 'src/app/shared-constants/formatCurrency';
import { OrderEntity } from 'src/app/shared/entities/OrderEntity';
import { OrderService } from 'src/app/shared/services/OrderService';

export interface IOrderClientProps {
	clientId: string;
}

function OrderClient(props: IOrderClientProps) {
	const { clientId } = props;
	const { isLoading, data = [] } = useQuery({
		queryKey: ['OrderClient', clientId],
		queryFn: () => OrderService.getAll({ clientId })
	});

	const columns: GridColDef<OrderEntity>[] = [
		{
			field: 'typeService',
			headerName: 'Servicio',
			hideSortIcons: true,
			width: 180,
			disableColumnMenu: true,
			valueGetter: (params) => {
				return params.row.typeService.map((i) => i.name).join(', ');
			}
		},
		{
			field: 'status',
			headerName: 'Estatus',
			hideSortIcons: true,
			width: 180,
			disableColumnMenu: true,
			renderCell({ row }) {
				const { status } = row;
				return <ChipOrder status={status} />;
			}
		},
		{
			field: 'date',
			headerName: 'Fecha',
			width: 180,
			hideSortIcons: true,
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
			field: 'price',
			headerName: 'Precio',
			align: 'left',
			headerAlign: 'left',
			hideSortIcons: true,
			disableColumnMenu: true,
			valueFormatter: ({ value }) => {
				return `$${formatCurrency(value as string)}`;
			}
		}
	];

	return (
		<Stack
			maxHeight={500}
			width="100%"
		>
			<DataGrid
				sx={{ width: '100%', minHeight: '200px' }}
				columns={columns}
				loading={isLoading}
				rows={data}
				hideFooter
				rowSpacingType="border"
				sortModel={[{ field: 'date', sort: 'desc' }]}
			/>
		</Stack>
	);
}

export default OrderClient;
