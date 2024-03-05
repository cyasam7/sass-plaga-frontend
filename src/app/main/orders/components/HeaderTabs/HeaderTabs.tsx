import React from 'react';
import { Tab, Tabs } from '@mui/material';

import { ETabsPlagues, IProps } from './IHeaderTabsProps';

function OrderHeaderTabs(props: IProps) {
	const { onChange, value } = props;
	return (
		<Tabs
			sx={{ pt: 2 }}
			value={value}
			onChange={(_, v: ETabsPlagues) => onChange(v)}
		>
			<Tab
				sx={{ width: 200 }}
				label="TODAS"
				value={ETabsPlagues.ALL}
			/>
			<Tab
				sx={{ width: 200 }}
				label="HOY"
				value={ETabsPlagues.TODAY}
			/>
			<Tab
				sx={{ width: 200 }}
				label="MAÑANA"
				value={ETabsPlagues.TOMORROW}
			/>
			<Tab
				sx={{ width: 200 }}
				label="PENDIENTES"
				value={ETabsPlagues.PENDING}
			/>
		</Tabs>
	);
}

export default OrderHeaderTabs;
