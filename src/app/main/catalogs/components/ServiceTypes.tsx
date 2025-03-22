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
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface ServiceType {
    id: string;
    name: string;
    description: string;
}

interface ServiceTypesProps {
    serviceTypes: ServiceType[];
}

export default function ServiceTypes({ serviceTypes }: ServiceTypesProps) {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState(false);
    const [selectedService, setSelectedService] = React.useState<ServiceType | null>(null);
    const [formData, setFormData] = React.useState({
        name: '',
        description: ''
    });

    const handleOpenDialog = (service?: ServiceType) => {
        if (service) {
            setIsEditing(true);
            setSelectedService(service);
            setFormData({
                name: service.name,
                description: service.description
            });
        } else {
            setIsEditing(false);
            setSelectedService(null);
            setFormData({
                name: '',
                description: ''
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setIsEditing(false);
        setSelectedService(null);
        setFormData({
            name: '',
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
                    Nuevo Tipo de Servicio
                </Button>
            </Box>

            <Grid container spacing={2}>
                {serviceTypes.map((service) => (
                    <Grid item xs={12} sm={6} md={4} key={service.id}>
                        <Card>
                            <CardHeader title={service.name} />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {service.description}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'flex-end' }}>
                                <IconButton 
                                    aria-label="editar"
                                    onClick={() => handleOpenDialog(service)}
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
                    {isEditing ? 'Editar Tipo de Servicio' : 'Nuevo Tipo de Servicio'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {isEditing 
                            ? 'Modifica los datos del tipo de servicio.'
                            : 'Agrega un nuevo tipo de servicio al catálogo.'}
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