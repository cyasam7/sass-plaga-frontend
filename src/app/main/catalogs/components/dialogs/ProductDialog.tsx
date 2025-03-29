import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useForm, useFieldArray } from 'react-hook-form';
import TextFieldForm from 'app/shared-components/Form/TextFieldForm/TextFieldForm';
import { Box, useTheme, IconButton, Typography, Grid, Paper, MenuItem } from '@mui/material';
import ScienceIcon from '@mui/icons-material/Science';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { IProduct } from '../types';

interface FormData {
    name: string;
    description: string;
    availableDoses: Array<{
        amount: string;
        unit: string;
    }>;
}

interface ProductDialogProps {
    open: boolean;
    isEditing: boolean;
    selectedProduct: IProduct | null;
    onClose: () => void;
    onSubmit: (data: FormData) => void;
}

const units = [
    { value: 'ml', label: 'Mililitros (ml)' },
    { value: 'g', label: 'Gramos (g)' },
    { value: 'kg', label: 'Kilogramos (kg)' },
    { value: 'l', label: 'Litros (l)' }
];

export default function ProductDialog({
    open,
    isEditing,
    selectedProduct,
    onClose,
    onSubmit
}: ProductDialogProps) {
    const theme = useTheme();
    const { control, handleSubmit, reset } = useForm<FormData>({
        defaultValues: {
            name: '',
            description: '',
            availableDoses: []
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "availableDoses"
    });

    React.useEffect(() => {
        if (selectedProduct) {
            reset({
                name: selectedProduct.name,
                description: selectedProduct.description,
                availableDoses: selectedProduct.availableDoses || []
            });
        } else {
            reset({
                name: '',
                description: '',
                availableDoses: []
            });
        }
    }, [selectedProduct, reset]);

    const handleClose = () => {
        reset({
            name: '',
            description: '',
            availableDoses: []
        });
        onClose();
    };

    const handleAddDose = () => {
        append({ amount: '', unit: 'ml' });
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                sx: {
                    minWidth: '600px'
                }
            }}
        >
            <Box sx={{
                backgroundColor: theme.palette.success.main,
                color: theme.palette.success.contrastText,
                p: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1
            }}>
                <ScienceIcon />
                <DialogTitle sx={{ p: 0, color: 'inherit' }}>
                    {isEditing ? 'Editar Producto' : 'Nuevo Producto'}
                </DialogTitle>
            </Box>
            <DialogContent>
                <DialogContentText sx={{ mt: 2 }}>
                    {isEditing
                        ? 'Modifica los datos del producto.'
                        : 'Agrega un nuevo producto al catálogo.'}
                </DialogContentText>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ mb: 4 }}>
                        <TextFieldForm<FormData>
                            control={control}
                            name="name"
                            label="Nombre del Producto"
                            fullWidth
                            autoFocus
                            margin="dense"
                            sx={{ mt: 2 }}
                        />
                        <TextFieldForm<FormData>
                            control={control}
                            name="description"
                            label="Descripción del Producto"
                            fullWidth
                            multiline
                            rows={3}
                            margin="dense"
                            sx={{ mt: 2 }}
                        />
                    </Box>

                    <Paper variant="outlined" sx={{ p: 2, bgcolor: 'background.default' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                            <LocalHospitalIcon color="success" />
                            <Typography variant="subtitle1" color="text.primary">
                                Dosis Disponibles
                            </Typography>
                        </Box>

                        {fields.map((field, index) => (
                            <Box
                                key={field.id}
                                sx={{
                                    mt: 2,
                                    p: 2,
                                    bgcolor: 'background.paper',
                                    borderRadius: 1,
                                    boxShadow: 1
                                }}
                            >
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={5}>
                                        <TextFieldForm<FormData>
                                            control={control}
                                            name={`availableDoses.${index}.amount`}
                                            label="Cantidad"
                                            fullWidth
                                            margin="dense"
                                            type="number"
                                        />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <TextFieldForm<FormData>
                                            control={control}
                                            name={`availableDoses.${index}.unit`}
                                            label="Unidad"
                                            fullWidth
                                            select
                                            margin="dense"
                                            defaultValue="ml"
                                        >
                                            {units.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextFieldForm>
                                    </Grid>
                                    <Grid item xs={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <IconButton
                                            onClick={() => remove(index)}
                                            color="error"
                                            size="small"
                                        >
                                            <DeleteOutlineIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Box>
                        ))}

                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                            <Button
                                startIcon={<AddCircleOutlineIcon />}
                                onClick={handleAddDose}
                                color="success"
                                variant="outlined"
                                sx={{ mt: fields.length > 0 ? 2 : 0 }}
                            >
                                Agregar Nueva Dosis
                            </Button>
                        </Box>
                    </Paper>

                    <DialogActions sx={{ mt: 3 }}>
                        <Button onClick={handleClose} color="inherit">Cancelar</Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="success"
                            sx={{ color: theme.palette.success.contrastText }}
                        >
                            {isEditing ? 'Actualizar' : 'Guardar'}
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
} 
