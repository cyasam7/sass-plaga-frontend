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
  Divider
} from '@mui/material';
import { Search, Edit, Schedule, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import { Client, ClientType } from '../../types';
import ClientCard from '../../components/Cards/ClientCard';
// Datos de ejemplo
const CLIENTS: Client[] = [
  {
    id: '1',
    name: 'Supermercados El Ahorro',
    type: 'business',
    email: 'contacto@elahorro.com',
    phone: '555-123-4567',
    address: 'Av. Principal #123, Zona Comercial',
    businessDetails: {
      contactPerson: 'María Rodríguez',
      position: 'Gerente de Operaciones',
    }
  },
  {
    id: '2',
    name: 'Restaurante La Buena Mesa',
    type: 'business',
    email: 'reservas@labuenamese.com',
    phone: '555-987-6543',
    address: 'Calle Gourmet #45, Centro',
    businessDetails: {
      contactPerson: 'Carlos Méndez',
      position: 'Propietario',
    }
  },
  {
    id: '3',
    name: 'Juan Pérez',
    type: 'individual',
    email: 'juan.perez@email.com',
    phone: '555-111-2222',
    address: 'Calle Residencial #78, Colonia Las Flores',
  },
  {
    id: '4',
    name: 'Ana García',
    type: 'individual',
    email: 'ana.garcia@email.com',
    phone: '555-333-4444',
    address: 'Av. Los Pinos #56, Residencial El Bosque',
  },
  {
    id: '5',
    name: 'Hotel Vista Hermosa',
    type: 'business',
    email: 'reservaciones@vistahermosa.com',
    phone: '555-777-8888',
    address: 'Blvd. Turístico #100, Zona Hotelera',
    businessDetails: {
      contactPerson: 'Roberto Sánchez',
      position: 'Director de Mantenimiento',
    }
  },
  {
    id: '6',
    name: 'Carmen Martínez',
    type: 'individual',
    email: 'carmen.martinez@email.com',
    phone: '555-555-6666',
    address: 'Calle Las Palmas #23, Fraccionamiento El Paraíso',
  }
];

export function ClientList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | ClientType>('all');
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  // Filtrar clientes según búsqueda y tipo
  const filteredClients = CLIENTS.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm);

    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && client.type === activeTab;
  });

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, clientId: string) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedClientId(clientId);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedClientId(null);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: 'all' | ClientType) => {
    setActiveTab(newValue);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          mb: 3,
          alignItems: { xs: 'stretch', sm: 'center' }
        }}
      >
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

      <Grid
        container
        spacing={3}
      >
        {filteredClients.map((client) => (
          <Grid
            item
            xs={12}
            md={6}
            lg={4}
            key={client.id}
          >
            <ClientCard client={client} onMenuOpen={() => { }} />
          </Grid>
        ))}
      </Grid>

      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Edit fontSize="small" sx={{ mr: 1 }} />
          Editar
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Schedule fontSize="small" sx={{ mr: 1 }} />
          Programar servicio
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <Delete fontSize="small" sx={{ mr: 1 }} />
          Eliminar
        </MenuItem>
      </Menu>
    </Box>
  );
} 