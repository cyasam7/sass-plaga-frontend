import { Autocomplete, Stack, TextField } from '@mui/material';
import { Dayjs } from 'dayjs';
import React from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { CatalogOptionsDay } from './HeaderFilterProps';
import { ETabsPlagues } from '../HeaderTabs/IHeaderTabsProps';

interface IHeaderFiltersProps {
	onChangeDay?: (value?: ETabsPlagues) => void;
	onChangeDate?: (value?: Dayjs) => void;
}

function HeaderFilters(props: IHeaderFiltersProps) {
	const { onChangeDate, onChangeDay } = props;

	return (
		<Stack direction="row">
			<Stack
				direction="row"
				spacing={2}
			>
				<Autocomplete
					disablePortal
					options={CatalogOptionsDay}
					getOptionLabel={(i) => i.title}
					sx={{ width: 300 }}
					onChange={(_, value) => onChangeDay(value?.value)}
					renderInput={(params) => (
						<TextField
							{...params}
							size="small"
							label="Dia"
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
