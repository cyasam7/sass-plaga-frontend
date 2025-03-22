import React, { useState } from 'react';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	IconButton,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TextField
} from '@mui/material';
import TableRow from 'material-ui/Table/TableRow';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TabPanel from './TabPanel';

interface ProductsAndDosesProps {
	tabValue: number;
}

function ProductsAndDoses(props: ProductsAndDosesProps) {
	const { tabValue } = props;
	const [openProductDialog, setOpenProductDialog] = useState(false);
	const [unitValue, setUnitValue] = useState('ml');

	const handleUnitChange = (event: any) => {
		setUnitValue(event.target.value);
	};

	const products = [];

	return (
		<TabPanel
			value={tabValue}
			index={2}
		>
			<Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
				<Button
					variant="contained"
					startIcon={<AddIcon />}
					onClick={() => setOpenProductDialog(true)}
				>
					Nuevo Producto
				</Button>
			</Box>

			<TableContainer component={Paper}>
				<Table
					sx={{ minWidth: 650 }}
					aria-label="productos table"
				>
					<TableHead>
						<TableRow>
							<TableCell>Nombre</TableCell>
							<TableCell>Dosis Recomendada</TableCell>
							<TableCell>Descripción</TableCell>
							<TableCell align="right">Acciones</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{products.map((product) => (
							<TableRow key={product.id}>
								<TableCell
									component="th"
									scope="row"
								>
									{product.name}
								</TableCell>
								<TableCell>
									{product.defaultDosage} {product.unit}
								</TableCell>
								<TableCell>{product.description}</TableCell>
								<TableCell align="right">
									<IconButton aria-label="editar">
										<EditIcon />
									</IconButton>
									<IconButton aria-label="eliminar">
										<DeleteIcon />
									</IconButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			{/* Diálogo para nuevo producto */}
			<Dialog
				open={openProductDialog}
				onClose={() => setOpenProductDialog(false)}
			>
				<DialogTitle>Nuevo Producto</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Agrega un nuevo producto al catálogo con su dosis recomendada.
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="Nombre del Producto"
						type="text"
						fullWidth
						variant="outlined"
						sx={{ mt: 2 }}
					/>
					<Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
						<TextField
							margin="dense"
							id="dosage"
							label="Dosis Recomendada"
							type="number"
							variant="outlined"
							sx={{ flex: 1 }}
						/>
						<FormControl
							variant="outlined"
							sx={{ flex: 1, mt: 1 }}
						>
							<InputLabel id="unit-label">Unidad</InputLabel>
							<Select
								labelId="unit-label"
								id="unit"
								value={unitValue}
								onChange={handleUnitChange}
								label="Unidad"
							>
								<MenuItem value="ml">ml</MenuItem>
								<MenuItem value="l">litros</MenuItem>
								<MenuItem value="g">gramos</MenuItem>
								<MenuItem value="kg">kg</MenuItem>
								<MenuItem value="oz">onzas</MenuItem>
							</Select>
						</FormControl>
					</Box>
					<TextField
						margin="dense"
						id="description"
						label="Descripción"
						type="text"
						fullWidth
						multiline
						rows={4}
						variant="outlined"
						sx={{ mt: 2 }}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenProductDialog(false)}>Cancelar</Button>
					<Button
						onClick={() => setOpenProductDialog(false)}
						variant="contained"
					>
						Guardar
					</Button>
				</DialogActions>
			</Dialog>
		</TabPanel>
	);
}

export default ProductsAndDoses;
