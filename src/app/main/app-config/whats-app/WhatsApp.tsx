import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';
import { useEffect } from 'react';
import { useWebSocket } from 'src/app/shared-hooks/useWebSocket';
import { Button, Paper, Typography } from '@mui/material';
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
		socket.emit('request-qr', true);

		socket.on('request-qr', (base64: string) => {
			changeWhatsAppState({
				base64,
				loading: false,
				user: null
			});
		});
		socket.on('user-logged', (user) => {
			changeWhatsAppState({
				base64: '',
				loading: false,
				user
			});
		});
	}, [socket]);

	function handleClose(): void {
		/* socket.emit('qr-logout');
		changeWhatsAppState({
			base64: '',
			loading: false,
			user: null
		}); */
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
					<Paper className="w-lg">
						<div className="p-24">
							{showQR && (
								<div className="w-full flex items-center">
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
								<div>
									<p>{JSON.stringify(user)}</p>
									<Button onClick={handleClose}>Cerrar Sesion</Button>
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
