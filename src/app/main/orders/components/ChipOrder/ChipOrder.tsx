import { Chip } from '@mui/material';
import React from 'react';
import { EStatusOrder } from 'src/app/shared/entities/OrderEntity';
import { statusColor, statusLabel } from '../../utils';

export interface IChipOrderProps {
	status: EStatusOrder;
}

function ChipOrder({ status }: IChipOrderProps) {
	return (
		<Chip
			color={statusColor[status]}
			label={statusLabel[status]}
		/>
	);
}

export default ChipOrder;
