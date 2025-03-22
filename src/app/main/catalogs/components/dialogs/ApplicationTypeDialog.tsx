import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import TextFieldForm from 'app/shared-components/Form/TextFieldForm/TextFieldForm';
import { Box, useTheme } from '@mui/material';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

interface ApplicationType {
    id: string;
    name: string;
    description: string;
}

interface FormData {
    name: string;
    description: string;
}

interface ApplicationTypeDialogProps {
    open: boolean;
    isEditing: boolean;
    selectedApplication: ApplicationType | null;
    onClose: () => void;
    onSubmit: (data: FormData) => void;
}

export default function ApplicationTypeDialog({
    open,
    isEditing,
    selectedApplication,
    onClose,
    onSubmit
}: ApplicationTypeDialogProps) {
    const theme = useTheme();
    const { control, handleSubmit, reset } = useForm<FormData>({
        defaultValues: {
            name: '',
            description: ''
        }
    });

    React.useEffect(() => {
        if (selectedApplication) {
            reset({
                name: selectedApplication.name,
                description: selectedApplication.description
            });
        } else {
            reset({
                name: '',
                description: ''
            });
        }
    }, [selectedApplication, reset]);

    const handleClose = () => {
        reset({
            name: '',
            description: ''
        });
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                sx: {
                    minWidth: '500px'
                }
            }}
        >
            <Box sx={{
                backgroundColor: theme.palette.info.main,
                color: theme.palette.info.contrastText,
                p: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1
            }}>
                <WaterDropIcon />
                <DialogTitle sx={{ p: 0, color: 'inherit' }}>
                    {isEditing ? 'Editar Tipo de Aplicación' : 'Nuevo Tipo de Aplicación'}
                </DialogTitle>
            </Box>
            <DialogContent>
                <DialogContentText sx={{ mt: 2 }}>
                    {isEditing
                        ? 'Modifica los datos del tipo de aplicación.'
                        : 'Agrega un nuevo tipo de aplicación al catálogo.'}
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
                        <Button onClick={handleClose} color="inherit">Cancelar</Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="info"
                            sx={{ color: theme.palette.info.contrastText }}
                        >
                            {isEditing ? 'Actualizar' : 'Guardar'}
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
} 