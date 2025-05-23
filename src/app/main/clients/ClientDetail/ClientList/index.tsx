import type React from 'react';
import { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';
import { Search, Edit, Delete, Add, People } from '@mui/icons-material';
import { ClientType } from '../../types';
import { ClientListProps } from './types';
import { NewClientForm } from '../../Forms/NewClientForm';
import { FormClientValues } from '../../Forms/NewClientForm/types';
import { ClientCard } from '../../Cards/ClientCard';

const EmptyClientList = ({ onAddClick }: { onAddClick: () => void }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        textAlign: 'center',
        bgcolor: 'background.paper',
        borderRadius: 1,
        minHeight: 400,
      }}
    >
      <People sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
      <Typography variant="h6" color="text.secondary" gutterBottom>
        No hay clientes
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Comienza agregando tu primer cliente
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        onClick={onAddClick}
      >
        Agregar Cliente
      </Button>
    </Box>
  )
}

export function ClientList({ clients, onSaveClient, onDeleteClient }: ClientListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | ClientType>('all');
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [showSaveClientForm, setShowSaveClientForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  // Filtrar clientes según búsqueda y tipo
  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm);

    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && client.type === activeTab;
  });

  const selectedClient = selectedClientId ? clients.find(client => client.id === selectedClientId) : null;

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, clientId: string) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedClientId(clientId);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: 'all' | ClientType) => {
    setActiveTab(newValue);
  };

  const handleEdit = () => {
    handleMenuClose();
    setShowSaveClientForm(true);
  };

  const handleDelete = () => {
    handleMenuClose();
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (selectedClientId && onDeleteClient) {
      onDeleteClient(selectedClientId);
    }
    setShowDeleteDialog(false);
    setSelectedClientId(null);
  };

  const handleFormSubmit = (data: FormClientValues) => {
    onSaveClient(data, selectedClientId);
    handleFormClose();
  };

  const handleFormClose = () => {
    setShowSaveClientForm(false);
    setSelectedClientId(null);
  };

  const showEmptyState = clients.length === 0;
  const showNoResults = clients.length > 0 && filteredClients.length === 0;

  return (
    <Box sx={{ mt: 4 }}>
      {!showEmptyState && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            mb: 3,
            alignItems: { xs: 'stretch', sm: 'center' },
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' }, flex: 1 }}>
            <TextField
              placeholder="Buscar clientes..."
              variant="outlined"
              size="small"
              fullWidth
              sx={{ maxWidth: { sm: 300 } }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="small" />
                  </InputAdornment>
                )
              }}
            />
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              sx={{
                minHeight: '40px',
                '.MuiTab-root': { minHeight: '40px' }
              }}
            >
              <Tab
                label="Todos"
                value="all"
              />
              <Tab
                label="Empresas"
                value="business"
              />
              <Tab
                label="Personas"
                value="individual"
              />
            </Tabs>
          </Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => setShowSaveClientForm(true)}
            sx={{ height: 40 }}
          >
            Nuevo Cliente
          </Button>
        </Box>
      )}

      {showEmptyState ? (
        <EmptyClientList onAddClick={() => setShowSaveClientForm(true)} />
      ) : showNoResults ? (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
            px: 3,
          }}
        >
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No se encontraron resultados
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Intenta con otros términos de búsqueda o filtros
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredClients.map((client) => (
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              key={client.id}
            >
              <ClientCard client={client} onMenuOpen={handleMenuOpen} />
            </Grid>
          ))}
        </Grid>
      )}

      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>
          <Edit fontSize="small" sx={{ mr: 1 }} />
          Editar
        </MenuItem>
        {/* <MenuItem onClick={handleMenuClose}>
          <Schedule fontSize="small" sx={{ mr: 1 }} />
          Programar servicio
        </MenuItem> */}
        <Divider />
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Delete fontSize="small" sx={{ mr: 1 }} />
          Eliminar
        </MenuItem>
      </Menu>

      {/* Form unificado para crear/editar cliente */}
      <NewClientForm
        open={showSaveClientForm}
        onClose={handleFormClose}
        onSubmit={handleFormSubmit}
        defaultValues={selectedClient ? {
          type: selectedClient.type,
          name: selectedClient.name,
          email: selectedClient.email,
          phone: selectedClient.phone,
          address: selectedClient.address,
          contactPerson: selectedClient.businessDetails?.contactPerson,
          position: selectedClient.businessDetails?.position,
        } : undefined}
      />

      {/* Dialog de confirmación para eliminar */}
      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      >
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar este cliente? Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>Cancelar</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
} 