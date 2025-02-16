import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Card, CardContent, Grid, Stack } from '@mui/material';
import { useState } from 'react';
import { BlobProvider } from '@react-pdf/renderer';
import { DocumentCanvasProvider } from './hooks/useDocumentCanvas';
import FormReport from './components/FormReport/FormReport';
import Certificate from './components/Cert/Cert';

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

function Reports() {
	const [companyName, setCompanyName] = useState('Vex Company');
	const report = {
		amountPaid: '10000',
		clientAddress: 'Rcda. Ramírez, Zona Centro, 34000 Durango, Dgo., México',
		clientName: 'Alexander Serrano',
		clientPhone: '+526183240572',
		companyAddress: 'Ramirez ',
		companyName: 'jajaja',
		date: '2024-12-15',
		daysFollowUp: '0',
		includeCertificate: true,
		observations: 'dsadsadsa',
		scheduleFollowUp: true,
		servicePrice: '10000',
		residualAmount: '0',
		services: ['1a5e0c45-09ca-4422-b5f0-4f26b0325ea7'],
		totalPrice: '10000'
	};
	return (
		<DocumentCanvasProvider>
			<DndProvider backend={HTML5Backend}>
				<Root
					header={
						<div className="p-24">
							<h4>Configuración de reporte</h4>
						</div>
					}
					content={
						<div className="p-24 w-full h-screen">
							<Grid container>
								<Grid
									item
									md={6}
								>
									<Stack className="px-16">
										<Card>
											<CardContent>
												<FormReport />
											</CardContent>
										</Card>
									</Stack>
								</Grid>
								<Grid
									item
									md={12}
								>
									<BlobProvider document={<Certificate />}>
										{({ blob, url, loading, error }) => {
											if (loading) {
												return <div>Loading document...</div>;
											}
											if (error) {
												return <div>An error occurred: {error.message}</div>;
											}
											return (
												<iframe
													title="Report"
													src={url}
													style={{ width: '100%', height: '500px' }}
												/>
											);
										}}
									</BlobProvider>
								</Grid>
							</Grid>
						</div>
					}
				/>
			</DndProvider>
		</DocumentCanvasProvider>
	);
}

export default Reports;
