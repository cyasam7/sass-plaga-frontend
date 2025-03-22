import FusePageSimple from '@fuse/core/FusePageSimple';
import { useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Toolbar, Paper, Container, AppBar, Stack } from '@mui/material';
import { BugReport } from '@mui/icons-material';
import { ClientDetail } from './componentsv2/client-detail';
import { ClientFilters } from './componentsv2/client-filters';
import { ClientList } from './componentsv2/client-list';

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

/**
 * The ContactsApp page.
 */
function ContactsApp() {
	const [selectedClientId, setSelectedClientId] = useState<string | null>(null)

	const handleViewClientDetails = (clientId: string) => {
		setSelectedClientId(clientId)
	}

	const handleBackToList = () => {
		// Limpiar cualquier estado relacionado con menús
		setSelectedClientId(null)
	}

	return (
		<Root
			content={
				<>
					<Container sx={{ py: 4, maxWidth: "1400px !important" }}>
						{selectedClientId ? (
							// Vista de detalle del cliente
							<ClientDetail clientId={selectedClientId} onBack={handleBackToList} />
						) : (
							// Vista de lista de clientes
							<>
								<Paper sx={{ p: 3, mb: 4 }}>
									<Box sx={{ mb: 3 }}>
										<Typography variant="h4" component="h1" gutterBottom>
											Clientes
										</Typography>
										<Typography variant="body1" color="text.secondary">
											Administre sus clientes empresariales y personales para servicios de fumigación.
										</Typography>
									</Box>
									<ClientFilters />
								</Paper>

								<ClientList onViewDetails={handleViewClientDetails} />
							</>
						)}
					</Container>
				</>
			}

		/>
	);
}

export default ContactsApp;
