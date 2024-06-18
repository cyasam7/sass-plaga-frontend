import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { useWebSocket } from 'src/app/shared-hooks/useWebSocket';
import { Button, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useWhatsAppStatus } from './state';

const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .FusePageSimple-header': {
		backgroundColor: theme.palette.background.paper,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderColor: theme.palette.divider
	},
	'& .FusePageSimple-content': {},
	'& .FusePageSimple-sidebarHeader': {},
	'& .FusePageSimple-sidebarContent': {}
}));

function WhatsAppConfig() {
	const { base64, loading, user, changeWhatsAppState } = useWhatsAppStatus();
	const socket = useWebSocket();

	const showQR = Boolean(base64);
	const showUserLogged = Boolean(user);

	useEffect(() => {
		if (!socket) return;
		socket.emit('request-config-wp');

		socket.on('update-qr', (base64: string) => {
			changeWhatsAppState({
				base64,
				loading: false,
				user: null
			});
		});
		socket.on('update-user', (user: { [key: string]: string }) => {
			changeWhatsAppState({
				base64: '',
				loading: false,
				user
			});
		});
	}, [socket]);

	function handleClose(): void {
		socket.emit('request-logout');
	}

	return (
		<Root
			header={
				<div className="p-24">
					<h4>Whats App Configuración</h4>
				</div>
			}
			content={
				<div className="p-24 w-full flex justify-center">
					<Paper>
						<div className="p-24">
							{showQR && (
								<div className="w-lg flex items-center">
									<img
										src={base64}
										alt="qr"
										width={400}
										height={400}
									/>
									<div className="h-200">
										<Typography variant="h6">Configuración de sesión de Whats App</Typography>
										<div className="gap-8 pt-12">
											<Typography variant="subtitle2">
												1.- Abre el whats app en tu teléfono
											</Typography>
											<Typography variant="subtitle2">
												2.- Abre la opción de menu en Android o ajustes en iOS
											</Typography>
											<Typography variant="subtitle2">
												3.- Selecciona la opción de vincular dispositivo
											</Typography>
											<Typography variant="subtitle2">
												4.- Apunta con la cámara y escanea el código QR
											</Typography>
										</div>
									</div>
								</div>
							)}
							{showUserLogged && (
								<div className="w-sm flex flex-col gap-16 justify-center">
									<Typography
										variant="h5"
										className="font-600"
									>
										Dispositivo configurado correctamente
									</Typography>
									<Typography variant="body2">
										Tu dispositivo ha sido configurado con éxito. Puedes continuar con el siguiente
										paso.
									</Typography>
									<div className="flex gap-8 justify-end">
										<Button
											onClick={handleClose}
											color="secondary"
											variant="outlined"
										>
											Cerrar sesión
										</Button>
										<Button
											LinkComponent={Link}
											onClick={handleClose}
											color="primary"
											variant="contained"
										>
											Continuar
										</Button>
									</div>
								</div>
							)}
						</div>
					</Paper>
				</div>
			}
		/>
	);
}

export default WhatsAppConfig;
