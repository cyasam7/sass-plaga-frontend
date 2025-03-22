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
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm } from 'react-hook-form';
import TextFieldForm from 'app/shared-components/Form/TextFieldForm/TextFieldForm';

interface PestType {
    id: string;
    name: string;
    description: string;
}

interface PestTypesProps {
    pestTypes: PestType[];
}

interface FormData {
    name: string;
    description: string;
}

export default function PestTypes({ pestTypes }: PestTypesProps) {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState(false);
    const [selectedPest, setSelectedPest] = React.useState<PestType | null>(null);

    const { control, handleSubmit, reset } = useForm<FormData>({
        defaultValues: {
            name: '',
            description: ''
        }
    });

    const handleOpenDialog = (pest?: PestType) => {
        if (pest) {
            setIsEditing(true);
            setSelectedPest(pest);
            reset({
                name: pest.name,
                description: pest.description
            });
        } else {
            setIsEditing(false);
            setSelectedPest(null);
            reset({
                name: '',
                description: ''
            });
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setIsEditing(false);
        setSelectedPest(null);
        reset({
            name: '',
            description: ''
        });
    };

    const onSubmit = (data: FormData) => {
        // Here you would typically make an API call to save the data
        console.log('Form submitted:', data);
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
                    Nueva Plaga
                </Button>
            </Box>

            <Grid container spacing={2}>
                {pestTypes.map((pest) => (
                    <Grid item xs={12} sm={6} md={4} key={pest.id}>
                        <Card>
                            <CardHeader title={pest.name} />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {pest.description}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ justifyContent: 'flex-end' }}>
                                <IconButton 
                                    aria-label="editar"
                                    onClick={() => handleOpenDialog(pest)}
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
                    {isEditing ? 'Editar Plaga' : 'Nueva Plaga'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {isEditing 
                            ? 'Modifica los datos de la plaga.'
                            : 'Agrega un nuevo tipo de plaga al catálogo.'}
                    </DialogContentText>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextFieldForm<FormData>
                            control={control}
                            name="name"
                            label="Nombre"
                            fullWidth
                            autoFocus
                            margin="dense"
                            sx={{ mt: 2 }}
                        />
                        <TextFieldForm<FormData>
                            control={control}
                            name="description"
                            label="Descripción"
                            fullWidth
                            multiline
                            rows={4}
                            margin="dense"
                            sx={{ mt: 2 }}
                        />
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>Cancelar</Button>
                            <Button type="submit" variant="contained">
                                {isEditing ? 'Actualizar' : 'Guardar'}
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
} 