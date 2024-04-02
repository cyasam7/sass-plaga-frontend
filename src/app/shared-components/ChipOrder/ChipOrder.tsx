import { Chip } from '@mui/material';
import React from 'react';
import { EStatusOrder } from 'src/app/shared/entities/OrderEntity';

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

export interface IChipOrderProps {
	status: EStatusOrder;
}

function ChipOrder({ status }: IChipOrderProps) {
	return (
		<Chip
			color={
				statusColor[status] as 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
			}
			label={statusLabel[status]}
		/>
	);
}

export default ChipOrder;
