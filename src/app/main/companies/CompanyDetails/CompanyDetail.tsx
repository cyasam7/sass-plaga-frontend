import FusePageCarded from '@fuse/core/FusePageCarded';
import CustomHeaderBack from 'app/shared-components/CustomHeaderBack/CustomHeaderBack';
import Tab from '@mui/material/Tab';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { openDialog } from 'app/shared-components/GlobalDialog/openDialog';
import { useNavigate, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from 'react-query';
import { displayToast } from '@fuse/core/FuseMessage/DisplayToast';
import { useCompanyDetail, useCompanyParams } from '../zustand';
import { CompanyService } from '../services/CompanyService';
import { IFormCompany } from '../types';
import BasicInformation from './components/BasicInformation/BasicInformation';
import Areas from './components/Areas/Areas';
import RightHeader from './components/RightHeader/RightHeader';
import SaveAreaDialog from './components/SaveAreaDialog/SaveAreaDialog';

function CompanyDetail() {
	const queryClient = useQueryClient();
	const { id } = useParams();
	const navigation = useNavigate();
	const [tab, setTab] = useState('1');
	const [openSaveArea, setOpenSaveArea] = useState<boolean>(false);
	const { isEditing, onChangeEditing, companyName, setCompanyName } = useCompanyDetail();
	const { areaId, companyId, setAreaId, setCompanyId } = useCompanyParams();

	const { data } = useQuery({
		queryKey: ['detail-company', id],
		queryFn: () => CompanyService.getCompanyById(id)
	});

	const formHandler = useForm<IFormCompany>({
		defaultValues: {
			id: null,
			name: '',
			address: ''
		}
	});

	useEffect(() => {
		if (data) {
			formHandler.reset({
				id: data.id,
				name: data.name,
				address: data.address
			});
			setCompanyName(data.name);
		}
	}, [data]);

	useEffect(() => {
		setCompanyId(id);
	}, [id]);

	const handleChangeTab = (_: React.SyntheticEvent, newValue: string) => {
		if (isEditing) {
			openDialog({
				title: 'Confirmación requerida',
				text: '¿Seguro que deseas cambiar de tab sin antes guardar?',
				onAccept() {
					onChangeEditing(false);
					setTab(newValue);
				}
			});
		} else {
			setTab(newValue);
		}
	};

	const handleSubmitBasicInformation = async (data: IFormCompany): Promise<void> => {
		await CompanyService.save(data);
		displayToast({
			message: 'Se guardo correctamente',
			variant: 'success',
			autoHideDuration: 1000,
			anchorOrigin: {
				horizontal: 'right',
				vertical: 'top'
			}
		});
		onChangeEditing(false);
	};

	async function handleSaveArea(): Promise<void> {
		setOpenSaveArea(false);
		await queryClient.invalidateQueries('areas-by-company');
		setAreaId('');
	}

	async function handleDeleteCompany(): Promise<void> {
		openDialog({
			title: 'Confirmación requerida',
			text: '¿Estas seguro que deseas eliminarlo?',
			onAccept: async () => {
				await CompanyService.delete(id);
				navigation(-1);
				displayToast({
					message: 'Se elimino correctamente',
					variant: 'success',
					anchorOrigin: {
						horizontal: 'right',
						vertical: 'top'
					},
					autoHideDuration: 4000
				});
				await queryClient.invalidateQueries('companies');
			}
		});
	}

	return (
		<TabContext value={tab}>
			<SaveAreaDialog
				companyId={companyId}
				areaId={areaId}
				onClose={() => setOpenSaveArea(false)}
				onSave={handleSaveArea}
				open={openSaveArea}
			/>
			<FusePageCarded
				header={
					<CustomHeaderBack
						backText="Compañias"
						title={companyName}
						subtitle="Detalles"
						rightComponent={
							<RightHeader
								tab={tab}
								onSaveBasicInformation={formHandler.handleSubmit(handleSubmitBasicInformation)}
								onAddAreas={() => setOpenSaveArea(true)}
								onDelete={handleDeleteCompany}
							/>
						}
					/>
				}
				content={
					<Box sx={{ width: '100%', paddingX: '16px', paddingY: '16px' }}>
						<TabList
							onChange={handleChangeTab}
							aria-label="tabs companies"
						>
							<Tab
								className="w-200"
								value="1"
								label="Informacion basica"
							/>
							<Tab
								className="w-200"
								value="2"
								label="Areas"
							/>
						</TabList>
						<TabPanel value="1">
							<BasicInformation formHandler={formHandler} />
						</TabPanel>
						<TabPanel value="2">
							<Areas
								companyId={companyId}
								handleEdit={(id: string) => {
									setOpenSaveArea(true);
									setAreaId(id);
								}}
							/>
						</TabPanel>
					</Box>
				}
			/>
		</TabContext>
	);
}

export default CompanyDetail;
