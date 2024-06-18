import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Card, Grid, Stack, Typography, CardContent, TextField } from '@mui/material';
import { useState } from 'react';
import { SketchPicker } from 'react-color';
import { BlobProvider } from '@react-pdf/renderer';
import SignaturaCanvas from 'app/shared-components/SignatureCanvas/SignaturaCanvas';
import { DocumentCanvasProvider } from './hooks/useDocumentCanvas';
import ServiceOrderTemplate from './components/Template/ServiceOrder/ServiceOrderTemplate';

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
	const [color, setColor] = useState('#fff');
	const [companyName, setCompanyName] = useState('');

	const handleChangeComplete = (color) => {
		setColor(color.hex as unknown as string);
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
						<div className="p-24 w-full">
							<Grid container>
								<Grid
									item
									md={6}
								>
									<Stack className="px-16">
										<Card>
											<CardContent>
												<Stack>
													<Typography
														variant="h5"
														className="font-600"
													>
														Configurar reporte
													</Typography>
													<Typography variant="body2">
														Actualiza el color, logo y firma de tu reporte
													</Typography>
												</Stack>
												<Stack
													spacing={2}
													mt={5}
												>
													<TextField
														fullWidth
														placeholder="Nombre de la empre"
													/>
													<SignaturaCanvas />
													<input type="file" />
													<TextField
														fullWidth
														placeholder="Nombre de la empre"
													/>
													<SketchPicker
														color={color}
														onChangeComplete={handleChangeComplete}
													/>
												</Stack>
											</CardContent>
										</Card>
									</Stack>
								</Grid>
								<Grid
									item
									md={6}
								>
									<BlobProvider
										document={
											<ServiceOrderTemplate
												companyName={companyName}
												MainColor={color}
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
