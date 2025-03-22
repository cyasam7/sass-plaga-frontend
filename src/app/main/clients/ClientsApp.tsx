import FusePageSimple from '@fuse/core/FusePageSimple';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Paper, Container } from '@mui/material';
import { ClientFilters } from './ClientDetail/ClientFilters';
import { ClientList } from './ClientDetail/ClientList';
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
