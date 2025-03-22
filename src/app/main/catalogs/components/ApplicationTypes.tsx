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
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import DescriptionIcon from '@mui/icons-material/Description';
import ApplicationTypeDialog from './dialogs/ApplicationTypeDialog';

interface ApplicationType {
    id: string;
    name: string;
    description: string;
}

interface ApplicationTypesProps {
    applicationTypes: ApplicationType[];
}

interface FormData {
    name: string;
    description: string;
}

export default function ApplicationTypes({ applicationTypes }: ApplicationTypesProps) {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [isEditing, setIsEditing] = React.useState(false);
    const [selectedApplication, setSelectedApplication] = React.useState<ApplicationType | null>(null);

    const handleOpenDialog = (application?: ApplicationType) => {
        if (application) {
            setIsEditing(true);
            setSelectedApplication(application);
        } else {
            setIsEditing(false);
            setSelectedApplication(null);
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setIsEditing(false);
        setSelectedApplication(null);
    };

    const handleSubmit = (data: FormData) => {
        console.log('Form submitted:', data);
        handleCloseDialog();
    };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenDialog()}
                    sx={{
                        borderRadius: 2,
                        textTransform: 'none',
                        px: 3,
                        py: 1,
                        boxShadow: 2,
                        '&:hover': {
                            boxShadow: 4,
                            transform: 'translateY(-1px)',
                        },
                        transition: 'all 0.2s ease-in-out'
                    }}
                >
                    Nuevo Tipo de Aplicación
                </Button>
            </Box>

            <Grid container spacing={2}>
                {applicationTypes.map((application) => (
                    <Grid item xs={12} sm={6} md={4} key={application.id}>
                        <Card
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                borderRadius: 2,
                                bgcolor: 'background.paper',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: 3
                                }
                            }}
                        >
                            <Box sx={{ p: 2, pb: 0 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                    <WaterDropIcon
                                        color="primary"
                                        sx={{
                                            fontSize: 32,
                                            backgroundColor: 'rgba(25, 118, 210, 0.08)',
                                            borderRadius: '50%',
                                            p: 0.5
                                        }}
                                    />
                                    <Typography variant="h6" component="div">
                                        {application.name}
                                    </Typography>
                                </Box>
                            </Box>
                            <CardContent sx={{ flexGrow: 1, pt: 0 }}>
                                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                                    <DescriptionIcon
                                        fontSize="small"
                                        color="action"
                                        sx={{
                                            mt: 0.5,
                                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                            borderRadius: '50%',
                                            p: 0.5
                                        }}
                                    />
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            flex: 1,
                                            minHeight: 40,
                                            lineHeight: 1.5
                                        }}
                                    >
                                        {application.description}
                                    </Typography>
                                </Box>
                            </CardContent>
                            <CardActions
                                sx={{
                                    justifyContent: 'flex-end',
                                    borderTop: '1px solid',
                                    borderColor: 'divider',
                                    px: 2,
                                    py: 1,
                                    gap: 1,
                                    bgcolor: 'background.default'
                                }}
                            >
                                <Tooltip title="Editar tipo de aplicación" arrow>
                                    <IconButton
                                        aria-label="editar"
                                        onClick={() => handleOpenDialog(application)}
                                        color="primary"
                                        size="small"
                                        sx={{
                                            backgroundColor: 'rgba(25, 118, 210, 0.08)',
                                            color: 'primary.main',
                                            '&:hover': {
                                                backgroundColor: 'primary.main',
                                                color: 'primary.contrastText',
                                                transform: 'scale(1.1)',
                                            },
                                            transition: 'all 0.2s ease-in-out'
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Eliminar tipo de aplicación" arrow>
                                    <IconButton
                                        aria-label="eliminar"
                                        color="error"
                                        size="small"
                                        sx={{
                                            backgroundColor: 'rgba(211, 47, 47, 0.08)',
                                            color: 'error.main',
                                            '&:hover': {
                                                backgroundColor: 'error.main',
                                                color: 'error.contrastText',
                                                transform: 'scale(1.1)',
                                            },
                                            transition: 'all 0.2s ease-in-out'
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <ApplicationTypeDialog
                open={openDialog}
                isEditing={isEditing}
                selectedApplication={selectedApplication}
                onClose={handleCloseDialog}
                onSubmit={handleSubmit}
            />
        </>
    );
} 