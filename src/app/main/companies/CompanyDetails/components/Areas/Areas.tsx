import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { CircularProgress, Grid } from '@mui/material';
import { AreaService } from '../../../../../shared/services/AreaService';
import CardArea from '../CardArea/CardArea';
import { IPropsAreas } from './IPropsAreas';
import SaveDevices from '../SaveDevices/SaveDevices';
import ListDevicesDialog from '../ListDevicesDialog/ListDevicesDialog';

function Areas(props: IPropsAreas) {
	const { companyId, handleEdit } = props;

	const [areaIdDevices, setAreaIdDevices] = useState<string>('');
	const [isOpenListDevicesDialog, setIsOpenListDevicesDialog] = useState<boolean>(false);
	const [isOpenCreateDevicesDialog, setIsOpenCreateDevicesDialog] = useState<boolean>(false);

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

	function handleChangeCreateDevicesDialog(id: string, value: boolean) {
		setAreaIdDevices(id);
		setIsOpenCreateDevicesDialog(value);
	}
	function handleChangeListDevicesDialog(id: string, value: boolean) {
		setAreaIdDevices(id);
		setIsOpenListDevicesDialog(value);
	}

	return (
		<Grid
			container
			spacing={2}
		>
			<ListDevicesDialog
				areaId={areaIdDevices}
				companyId={companyId}
				onClose={() => handleChangeListDevicesDialog('', false)}
				open={isOpenListDevicesDialog}
			/>
			<SaveDevices
				isOpen={isOpenCreateDevicesDialog}
				areaId={areaIdDevices}
				companyId={companyId}
				onClose={() => handleChangeCreateDevicesDialog('', false)}
			/>
			{data.map((i) => (
				<Grid
					item
					xs={12}
					sm={6}
					key={i.id}
				>
					<CardArea
						openCreateDevicesDialog={(areaId) => handleChangeCreateDevicesDialog(areaId, true)}
						openListDevicesDialog={(areaId) => handleChangeListDevicesDialog(areaId, true)}
						handleEditArea={handleEdit}
						area={i}
					/>
				</Grid>
			))}
		</Grid>
	);
}

export default Areas;
