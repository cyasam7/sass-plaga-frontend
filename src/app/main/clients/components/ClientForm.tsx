import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import Avatar from '@mui/material/Avatar';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import Box from '@mui/system/Box';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { selectMainTheme } from '@fuse/core/FuseSettings/store/fuseSettingsSlice';
import { Controller, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Grid, MenuItem, TextField } from '@mui/material';
import { openDialog } from 'app/shared-components/GlobalDialog/openDialog';
import { ClientService, ISaveClient } from 'src/app/shared/services/ClientService';
import { displayToast } from '@fuse/core/FuseMessage/DisplayToast';
import { EClientType } from 'src/app/shared/entities/ClientsEntities';
import { yupResolver } from '@hookform/resolvers/yup';
import PhoneInputForm from 'app/shared-components/Form/PhoneInputForm/PhoneInputForm';
import TextFieldForm from 'app/shared-components/Form/TextFieldForm/TextFieldForm';
import { translateClientType } from '../utils';
import { clientFormSchema } from './yupSchema';

interface IClientForm {
	name: string;
	address: string;
	phone: string;
	typeClient: EClientType;
}

/**
 * The contact view.
 */
function ClientForm() {
	const routeParams = useParams();
	const theme = useSelector(selectMainTheme);
	const navigate = useNavigate();

	const { id: clientId } = routeParams as { id: string };
	const isUpdating = clientId !== 'new';

	const {
		isError,
		isLoading,
		data: client
	} = useQuery({
		queryKey: ['ClientForm', clientId],
		queryFn: () => ClientService.getById(clientId),
		enabled: isUpdating
	});

	const formHandler = useForm<IClientForm>({
		resolver: yupResolver(clientFormSchema),
		defaultValues: {
			address: '',
			name: '',
			phone: '',
			typeClient: EClientType.GENERAL_PUBLIC
		}
	});

	useEffect(() => {
		if (isUpdating && client) {
			formHandler.reset({
				address: client.address,
				name: client.name,
				phone: client.phone,
				typeClient: client.typeClient
			});
		}
	}, [client, isUpdating]);

	if (isLoading) return <FuseLoading className="min-h-screen" />;

	if (isError) {
		setTimeout(() => {
			navigate('/clients');
		}, 0);
		return null;
	}

	function handleCancel(): void {
		if (!isUpdating && !formHandler.formState.isDirty) {
			navigate(-1);
		} else if (formHandler.formState.isDirty) {
			openDialog({
				title: 'Confirmación',
				text: '¿Seguro que deseas salir sin guardar?',
				onAccept: () => {
					navigate(-1);
				}
			});
		} else {
			navigate(-1);
		}
	}

	async function onSubmit(params: IClientForm): Promise<void> {
		const formattedValues: ISaveClient = {
			...params,
			id: clientId
		};
		await ClientService.save(formattedValues);
		navigate(-1);
		displayToast({
			anchorOrigin: {
				horizontal: 'right',
				vertical: 'top'
			},
			message: 'Se ha guardado el cliente',
			variant: 'success'
		});
	}

	return (
		<>
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
								onClick={handleCancel}
							>
								<FuseSvgIcon size={20}>heroicons-outline:arrow-sm-left</FuseSvgIcon>
								<span className="mx-8">{isUpdating ? 'Cancelar' : 'Volver'}</span>
							</Button>
							<Button
								variant="contained"
								color="secondary"
								onClick={formHandler.handleSubmit(onSubmit)}
							>
								<FuseSvgIcon size={20}>heroicons-outline:pencil-alt</FuseSvgIcon>
								<span className="mx-8">Guardar</span>
							</Button>
						</div>
					</div>

					<Grid
						className="mt-16 mb-24"
						container
						spacing={3}
					>
						<Grid
							item
							xs={12}
							md={6}
						>
							<Controller
								control={formHandler.control}
								name="name"
								render={({ field, fieldState }) => (
									<TextField
										{...field}
										variant="outlined"
										fullWidth
										label="Nombre"
										error={!!fieldState.error}
										helperText={fieldState.error?.message}
									/>
								)}
							/>
						</Grid>
						<Grid
							item
							xs={12}
							md={6}
						>
							<PhoneInputForm
								name="phone"
								control={formHandler.control}
								variant="outlined"
								label="Teléfono"
								fullWidth
								required
							/>
						</Grid>

						<Grid
							item
							xs={12}
						>
							<TextFieldForm<IClientForm>
								control={formHandler.control}
								label="Tipo de cliente"
								variant="outlined"
								name="typeClient"
								fullWidth
								select
							>
								<MenuItem value={EClientType.GENERAL_PUBLIC}>
									{translateClientType(EClientType.GENERAL_PUBLIC)}
								</MenuItem>
								<MenuItem value={EClientType.ORGANIZATIONAL}>
									{translateClientType(EClientType.ORGANIZATIONAL)}
								</MenuItem>
							</TextFieldForm>
						</Grid>
						<Grid
							item
							xs={12}
						>
							<Controller
								control={formHandler.control}
								name="address"
								render={({ field, fieldState }) => (
									<TextField
										{...field}
										variant="outlined"
										fullWidth
										label="Dirección"
										multiline
										rows={5}
										error={!!fieldState.error}
										helperText={fieldState.error?.message}
									/>
								)}
							/>
						</Grid>
					</Grid>
				</div>
			</div>
		</>
	);
}

export default ClientForm;
