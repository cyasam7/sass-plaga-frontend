import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Paper from '@mui/material/Paper';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { styled } from '@mui/material/styles';

import TabPanel from './components/TabPanel';
import ServiceTypes from './components/ServiceTypes';
import ApplicationTypes from './components/ApplicationTypes';
import Products from './components/Products';
import PestTypes from './components/PestTypes';

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

// Datos de ejemplo
const serviceTypes = [
	{ id: '1', name: 'Fumigación General', description: 'Tratamiento general para todo tipo de plagas' },
	{ id: '2', name: 'Control de Roedores', description: 'Tratamiento específico para roedores' },
	{ id: '3', name: 'Control de Insectos Rastreros', description: 'Tratamiento para cucarachas, hormigas, etc.' },
	{ id: '4', name: 'Control de Insectos Voladores', description: 'Tratamiento para moscas, mosquitos, etc.' },
	{ id: '5', name: 'Sanitización', description: 'Limpieza y desinfección de áreas' }
];

const applicationTypes = [
	{ id: '1', name: 'Aspersión', description: 'Aplicación de líquido a presión' },
	{ id: '2', name: 'Nebulización', description: 'Aplicación en forma de niebla' },
	{ id: '3', name: 'Cebos', description: 'Colocación de trampas con cebo' },
	{ id: '4', name: 'Polvo', description: 'Aplicación en forma de polvo' },
	{ id: '5', name: 'Gel', description: 'Aplicación en forma de gel' },
	{ id: '6', name: 'Inyección', description: 'Aplicación directa en grietas y hendiduras' }
];

const products = [
	{ id: '1', name: 'Cipermetrina', defaultDosage: '10', unit: 'ml', description: 'Insecticida de amplio espectro' },
	{ id: '2', name: 'Deltametrina', defaultDosage: '5', unit: 'ml', description: 'Insecticida para control residual' },
	{ id: '3', name: 'Bromadiolona', defaultDosage: '20', unit: 'g', description: 'Rodenticida anticoagulante' },
	{ id: '4', name: 'Fipronil', defaultDosage: '0.5', unit: 'g', description: 'Insecticida para control de hormigas y cucarachas' },
	{ id: '5', name: 'Imidacloprid', defaultDosage: '5', unit: 'ml', description: 'Insecticida sistémico' }
];

const pestTypes = [
	{ 
		id: '1', 
		name: 'Cucaracha Alemana', 
		description: 'Plaga común en cocinas y áreas húmedas'
	},
	{ 
		id: '2', 
		name: 'Hormiga Faraón', 
		description: 'Hormiga pequeña que forma colonias grandes'
	},
	{ 
		id: '3', 
		name: 'Araña de Rincón', 
		description: 'Araña venenosa común en rincones oscuros'
	},
	{ 
		id: '4', 
		name: 'Rata Gris', 
		description: 'Roedor común en áreas urbanas'
	}
];

export default function CatalogsV2() {
	const [tabValue, setTabValue] = React.useState(0);

	const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
		setTabValue(newValue);
	};

	return (
		<Root
			header={
				<div className="p-24">
					<Typography variant="h6">Catálogos</Typography>
				</div>
			}
			content={
				<div className="p-24 w-full">
					<Paper className="p-24 w-full">
						<Box>
							<Box sx={{ mb: 4 }}>
								<Typography variant="h4" component="h1" gutterBottom>
									Catálogos
								</Typography>
								<Typography variant="subtitle1" color="text.secondary">
									Gestiona los catálogos del sistema: tipos de servicio, tipos de aplicación, productos y plagas
								</Typography>
							</Box>

							<Paper sx={{ width: '100%' }}>
								<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
									<Tabs value={tabValue} onChange={handleTabChange} aria-label="catálogos tabs">
										<Tab label="Tipos de Servicio" />
										<Tab label="Tipos de Aplicación" />
										<Tab label="Productos y Dosis" />
										<Tab label="Tipos de Plagas" />
									</Tabs>
								</Box>

								<TabPanel value={tabValue} index={0}>
									<ServiceTypes serviceTypes={serviceTypes} />
								</TabPanel>

								<TabPanel value={tabValue} index={1}>
									<ApplicationTypes applicationTypes={applicationTypes} />
								</TabPanel>

								<TabPanel value={tabValue} index={2}>
									<Products products={products} />
								</TabPanel>

								<TabPanel value={tabValue} index={3}>
									<PestTypes pestTypes={pestTypes} />
								</TabPanel>
							</Paper>
						</Box>
					</Paper>
				</div>
			}
		/>
	);
}
