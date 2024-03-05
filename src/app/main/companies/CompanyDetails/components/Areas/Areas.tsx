import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { CircularProgress, Grid } from '@mui/material';
import { AreaService } from '../../../services/AreaService';
import CardArea from '../CardArea/CardArea';
import { IPropsAreas } from './IPropsAreas';
import CrudDevicesDialog from '../CrudDevicesDialog/CrudDevicesDialog';

function Areas(props: IPropsAreas) {
	const { companyId, handleEdit } = props;

	const [areaIdDevices, setAreaIdDevices] = useState<string>('');

	const { data = [], isLoading } = useQuery(['areas-by-company', companyId], () =>
		AreaService.getByCompany(companyId)
	);

	if (isLoading) {
		return (
			<div>
				<CircularProgress />
			</div>
		);
	}

	return (
		<Grid
			container
			spacing={2}
		>
			<CrudDevicesDialog
				areaId={areaIdDevices}
				companyId={companyId}
				onClose={() => setAreaIdDevices('')}
				open={!!areaIdDevices}
			/>
			{data.map((i) => (
				<Grid
					item
					xs={12}
					sm={6}
					md={4}
					key={i.id}
				>
					<CardArea
						openDevices={(areaId) => setAreaIdDevices(areaId)}
						handleEditArea={handleEdit}
						area={i}
					/>
				</Grid>
			))}
		</Grid>
	);
}

export default Areas;
