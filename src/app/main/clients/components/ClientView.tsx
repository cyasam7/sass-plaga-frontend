import Button from '@mui/material/Button';
import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { useNavigate, useParams } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Box from '@mui/system/Box';
import { useQuery } from 'react-query';
import { Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectMainTheme } from '@fuse/core/FuseSettings/store/fuseSettingsSlice';
import { ClientService } from 'src/app/shared/services/ClientService';
import BasicInfo from './tabs/BasicInfo';
import OrderClient from './tabs/OrderClient';

/**
 * The contact view.
 */
function ClientView() {
	const routeParams = useParams();
	const theme = useSelector(selectMainTheme);

	const { id: contactId } = routeParams as { id: string };

	const {
		isError,
		isLoading,
		data: client
	} = useQuery({
		queryKey: ['ClientView', contactId],
		queryFn: () => ClientService.getById(contactId)
	});

	const navigate = useNavigate();

	const [value, setValue] = useState('1');

	const handleChange = (event: React.SyntheticEvent, newValue: string) => {
		setValue(newValue);
	};

	if (isLoading) {
		return <FuseLoading className="min-h-screen" />;
	}

	if (isError) {
		setTimeout(() => {
			navigate('/contacts');
		}, 0);

		return null;
	}

	if (!client) {
		return null;
	}

	return (
		<TabContext value={value}>
			<Box
				className="relative w-full h-160 sm:h-192 px-32 sm:px-48"
				sx={{ background: theme.palette.primary.main }}
			/>
			<div className="relative flex flex-col flex-auto items-center p-24 pt-0 sm:p-48 sm:pt-0">
				<div className="w-full max-w-3xl">
					<div className="flex flex-auto items-end -mt-64">
						<Avatar
							sx={{
								borderWidth: 4,
								borderStyle: 'solid',
								borderColor: 'background.paper',
								backgroundColor: 'background.default',
								color: 'text.secondary'
							}}
							className="w-128 h-128 text-64 font-bold"
						>
							{client?.name?.charAt(0)}
						</Avatar>
						<div className="flex items-center ml-auto mb-4 gap-16">
							<Button
								variant="outlined"
								color="secondary"
								component={NavLinkAdapter}
								to="/clients"
							>
								<FuseSvgIcon size={20}>heroicons-outline:arrow-sm-left</FuseSvgIcon>
								<span className="mx-8">Cancelar</span>
							</Button>
							<Button
								variant="contained"
								color="secondary"
								component={NavLinkAdapter}
								to="edit"
							>
								<FuseSvgIcon size={20}>heroicons-outline:pencil-alt</FuseSvgIcon>
								<span className="mx-8">Edit</span>
							</Button>
						</div>
					</div>

					<Typography className="mt-12 text-4xl font-bold truncate">{client.name}</Typography>

					<Box
						className="mt-16 mb-24"
						sx={{ borderBottom: 1, borderColor: 'divider' }}
					>
						<TabList
							onChange={handleChange}
							aria-label="basic tabs example"
						>
							<Tab
								value="1"
								label="Información Básica"
							/>
							<Tab
								value="2"
								label="Ordenes de servicio"
							/>
						</TabList>
					</Box>

					<TabPanel value="1">
						<BasicInfo client={client} />
					</TabPanel>
					<TabPanel
						value="2"
						sx={{ px: 0 }}
					>
						<OrderClient clientId={client.id} />
					</TabPanel>
				</div>
			</div>
		</TabContext>
	);
}

export default ClientView;
