import FusePageSimple from '@fuse/core/FusePageSimple';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Paper, Container } from '@mui/material';
import { ClientList } from './components/ClientSection/ClientList';
import { ClientFilters } from './components/ClientSection/ClientFilters';

const Root = styled(FusePageSimple)(({ theme }) => ({
	'& .FusePageSimple-header': {
		backgroundColor: theme.palette.background.paper,
		borderBottomWidth: 1,
		borderStyle: 'solid',
		borderColor: theme.palette.divider
	},
}));



/**
 * The ContactsApp page.
 */
export function ClientsApp() {
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
						<ClientList />
					</Container>
				</>
			}

		/>
	);
}
