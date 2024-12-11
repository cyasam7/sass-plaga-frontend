import { Autocomplete, Box, Stack, Tab, TextField } from '@mui/material';
import { Dayjs } from 'dayjs';
import React from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { TabContext, TabList } from '@mui/lab';
import { EStatusOrder } from 'src/app/shared/entities/OrderEntity';
import { IHeaderFiltersProps } from './HeaderFilterProps';
import { ETabsPlagues } from '../HeaderTabs/IHeaderTabsProps';
import { translateOrderStatus } from '../../utils';

function HeaderFilters(props: IHeaderFiltersProps) {
	const [value, setValue] = React.useState<ETabsPlagues>(ETabsPlagues.ALL);
	const { onChangeDate, onChangeDay, onChangeStatus } = props;

	const handleChange = (_: React.SyntheticEvent, newValue: ETabsPlagues) => {
		onChangeDay?.(newValue);
		setValue(newValue);
	};

	const statusCatalog = Object.values(EStatusOrder);

	return (
		<Stack direction="column">
			<Box sx={{ width: '100%', typography: 'body1' }}>
				<TabContext value={value}>
					<Box>
						<TabList onChange={handleChange}>
							<Tab
								label="TODAS"
								value={ETabsPlagues.ALL}
								sx={{ width: '150px' }}
							/>
							<Tab
								label="HOY"
								value={ETabsPlagues.TODAY}
								sx={{ width: '150px' }}
							/>
							<Tab
								label="MAÑANA"
								value={ETabsPlagues.TOMORROW}
								sx={{ width: '150px' }}
							/>
							<Tab
								label="PENDIENTES"
								value={ETabsPlagues.PENDING}
								sx={{ width: '150px' }}
							/>
						</TabList>
					</Box>
				</TabContext>
			</Box>
			<Stack
				direction="row"
				pt={2}
				spacing={2}
			>
				<Autocomplete
					options={statusCatalog}
					getOptionLabel={(i) => translateOrderStatus(i)}
					sx={{ width: 300 }}
					onChange={(_, value) => onChangeStatus(value)}
					renderInput={(params) => (
						<TextField
							{...params}
							size="small"
							label="Estatus"
						/>
					)}
				/>
				<DatePicker
					onChange={(value: Dayjs) => onChangeDate(value)}
					slotProps={{
						textField: { size: 'small' },
						field: {
							clearable: true
						}
					}}
				/>
			</Stack>
		</Stack>
	);
}

export default HeaderFilters;
