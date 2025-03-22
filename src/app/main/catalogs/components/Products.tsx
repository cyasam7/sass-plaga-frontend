import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Product {
    id: string;
    name: string;
    defaultDosage: string;
    unit: string;
    description: string;
}

interface ProductsProps {
    products: Product[];
}

const units = [
    { value: 'ml', label: 'Mililitros (ml)' },
    { value: 'g', label: 'Gramos (g)' },
    { value: 'kg', label: 'Kilogramos (kg)' },
    { value: 'l', label: 'Litros (l)' }
];

export default function Products({ products }: ProductsProps) {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState(false);
    const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
    const [formData, setFormData] = React.useState({
        name: '',
        defaultDosage: '',
        unit: 'ml',
        description: ''
    });

    const handleOpenDialog = (product?: Product) => {
        if (product) {
            setIsEditing(true);
            setSelectedProduct(product);
            setFormData({
                name: product.name,
                defaultDosage: product.defaultDosage,
                unit: product.unit,
                description: product.description
            });
        } else {
            setIsEditing(false);
            setSelectedProduct(null);
            setFormData({
                name: '',
                defaultDosage: '',
                unit: 'ml',
                description: ''
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setIsEditing(false);
        setSelectedProduct(null);
        setFormData({
            name: '',
            defaultDosage: '',
            unit: 'ml',
            description: ''
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        // Here you would typically make an API call to save the data
        console.log('Form submitted:', formData);
        handleCloseDialog();
    };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenDialog()}
                >
                    Nuevo Producto
                </Button>
            </Box>

            <Grid container spacing={2}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Card>
                            <CardHeader title={product.name} />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {product.description}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    Dosis por defecto: {product.defaultDosage} {product.unit}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'flex-end' }}>
                                <IconButton 
                                    aria-label="editar"
                                    onClick={() => handleOpenDialog(product)}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton aria-label="eliminar">
                                    <DeleteIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>
                    {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {isEditing 
                            ? 'Modifica los datos del producto.'
                            : 'Agrega un nuevo producto al catálogo.'}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        label="Nombre"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={formData.name}
                        onChange={handleInputChange}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        margin="dense"
                        id="defaultDosage"
                        name="defaultDosage"
                        label="Dosis por defecto"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={formData.defaultDosage}
                        onChange={handleInputChange}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        select
                        margin="dense"
                        id="unit"
                        name="unit"
                        label="Unidad"
                        value={formData.unit}
                        onChange={handleInputChange}
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 2 }}
                    >
                        {units.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        margin="dense"
                        id="description"
                        name="description"
                        label="Descripción"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={formData.description}
                        onChange={handleInputChange}
                        sx={{ mt: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={handleSubmit} variant="contained">
                        {isEditing ? 'Actualizar' : 'Guardar'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
} 