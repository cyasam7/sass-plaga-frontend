import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Grid, Paper, Stack, TextField } from '@mui/material';
import { SketchPicker } from 'react-color';
import { useState } from 'react';
import { BlobProvider } from '@react-pdf/renderer';
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
		setColor(color.hex);
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
								<Grid
									item
									md={6}
								>
									<Stack className="px-16">
										<Paper className="w-full">
											<Stack className="p-16 gap-16">
												<TextField
													value={companyName}
													onChange={(e) => setCompanyName(e.target.value)}
													label="Nombre de la empresa"
												/>
												<TextField label="Dirección" />
												<SketchPicker
													color={color}
													onChangeComplete={handleChangeComplete}
												/>
											</Stack>
										</Paper>
									</Stack>
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
