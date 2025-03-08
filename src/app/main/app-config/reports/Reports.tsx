import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Card, CardContent, Grid, Stack } from '@mui/material';
import { BlobProvider } from '@react-pdf/renderer';
import { DocumentCanvasProvider } from './hooks/useDocumentCanvas';
import FormReport from './components/FormReport/FormReport';
import Certificate, { CertificateData } from './components/Reports/Certificate/Certificate';

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

const mockCertificateData: CertificateData = {
	companyAddress: 'Av. Principal #123, Col. Centro, Ciudad de México',
	companyName: 'Fumigadora Express S.A. de C.V.',
	clientName: 'Restaurante El Buen Sabor',
	address: 'Av. Principal #123, Col. Centro, Ciudad de México',
	date: new Date().toISOString(),
	certificateNumber: 'CERT-2024-001',
	validUntil: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString(),
	logoUrl:
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
	sanitaryLicense: 'LSF-2024-789',
	serviceType: 'Fumigación General',
	treatedAreas: 'Cocina, Almacén, Área de Comedor',
	chemicals: 'Biothrine Flow, Demand CS',
	targetPests: 'Cucarachas, Hormigas, Roedores',
	applicationMethod: 'Aspersión y Nebulización',
	dosage: '50ml/L',
	urlTechnicalSignature:
		'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
};

function Reports() {
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
									<BlobProvider
										document={
											<Certificate
												data={mockCertificateData}
												primaryColor="#1a5f7a"
												secondaryColor="#2d9cdb"
												showLogo
											/>
										}
									>
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
