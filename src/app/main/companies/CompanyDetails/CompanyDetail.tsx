import FusePageCarded from '@fuse/core/FusePageCarded';
import CustomHeaderBack from 'app/shared-components/CustomHeaderBack/CustomHeaderBack';
import Tab from '@mui/material/Tab';
import React from 'react';
import { Box, Button } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { openDialog } from 'app/shared-components/GlobalDialog/openDialog';

function CompanyDetail() {
	const [value, setValue] = React.useState('1');

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	return (
		<TabContext value={value}>
			<FusePageCarded
				header={
					<CustomHeaderBack
						backText="Companies"
						title="Coca Cola"
						subtitle="Details"
					/>
				}
				content={
					<Box sx={{ width: '100%', padding: '8px' }}>
						<TabList
							onChange={handleChange}
							aria-label="tabs companies"
						>
							<Tab
								className="w-200"
								value="1"
								label="Basic information"
							/>
							<Tab
								className="w-200"
								value="2"
								label="Areas"
							/>
							<Tab
								className="w-200"
								value="3"
								label="Devices"
							/>
						</TabList>
						<TabPanel value="1">
							<Box>
								<Button
									onClick={() => {
										openDialog({
											title: 'confirmar',
											text: 'Segur que quiere cambiar esto',
											onAccept: () => {
												alert('1234');
											}
										});
									}}
								>
									Hola
								</Button>
							</Box>
						</TabPanel>
						<TabPanel value="2">Item Two</TabPanel>
						<TabPanel value="3">Item Three</TabPanel>
					</Box>
				}
			/>
		</TabContext>
	);
}

export default CompanyDetail;
