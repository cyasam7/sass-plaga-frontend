'use client';

import type React from 'react';

import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Grid,
  Avatar,
  Chip,
  Button,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  IconButton,
  Divider
} from '@mui/material';
import { Business, Person, Search, MoreVert, Edit, Schedule, History, Delete } from '@mui/icons-material';

// Tipos de cliente
type ClientType = 'business' | 'individual';

// Interfaz para clientes
interface Client {
  id: string;
  name: string;
  type: ClientType;
  email: string;
  phone: string;
  address: string;
  lastService?: string;
  nextService?: string;
  image?: string;
  businessDetails?: {
    contactPerson: string;
    position: string;
    employeeCount: number;
  };
}

// Datos de ejemplo
const CLIENTS: Client[] = [
  {
    id: '1',
    name: 'Supermercados El Ahorro',
    type: 'business',
    email: 'contacto@elahorro.com',
    phone: '555-123-4567',
    address: 'Av. Principal #123, Zona Comercial',
    lastService: '15/02/2024',
    nextService: '15/05/2024',
    image: '/placeholder.svg?height=40&width=40',
    businessDetails: {
      contactPerson: 'María Rodríguez',
      position: 'Gerente de Operaciones',
      employeeCount: 120
    }
  },
  {
    id: '2',
    name: 'Restaurante La Buena Mesa',
    type: 'business',
    email: 'reservas@labuenamese.com',
    phone: '555-987-6543',
    address: 'Calle Gourmet #45, Centro',
    lastService: '01/03/2024',
    nextService: '01/06/2024',
    image: '/placeholder.svg?height=40&width=40',
    businessDetails: {
      contactPerson: 'Carlos Méndez',
      position: 'Propietario',
      employeeCount: 25
    }
  },
  {
    id: '3',
    name: 'Juan Pérez',
    type: 'individual',
    email: 'juan.perez@email.com',
    phone: '555-111-2222',
    address: 'Calle Residencial #78, Colonia Las Flores',
    lastService: '10/03/2024',
    nextService: '10/06/2024',
    image: '/placeholder.svg?height=40&width=40'
  },
  {
    id: '4',
    name: 'Ana García',
    type: 'individual',
    email: 'ana.garcia@email.com',
    phone: '555-333-4444',
    address: 'Av. Los Pinos #56, Residencial El Bosque',
    lastService: '05/03/2024',
    nextService: '05/06/2024',
    image: '/placeholder.svg?height=40&width=40'
  },
  {
    id: '5',
    name: 'Hotel Vista Hermosa',
    type: 'business',
    email: 'reservaciones@vistahermosa.com',
    phone: '555-777-8888',
    address: 'Blvd. Turístico #100, Zona Hotelera',
    lastService: '20/02/2024',
    nextService: '20/05/2024',
    image: '/placeholder.svg?height=40&width=40',
    businessDetails: {
      contactPerson: 'Roberto Sánchez',
      position: 'Director de Mantenimiento',
      employeeCount: 85
    }
  },
  {
    id: '6',
    name: 'Carmen Martínez',
    type: 'individual',
    email: 'carmen.martinez@email.com',
    phone: '555-555-6666',
    address: 'Calle Las Palmas #23, Fraccionamiento El Paraíso',
    lastService: '25/02/2024',
    nextService: '25/05/2024',
    image: '/placeholder.svg?height=40&width=40'
  }
];

interface ClientListProps {
  onViewDetails: (clientId: string) => void;
}

export function ClientList({ onViewDetails }: ClientListProps) {
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
            <Card variant="outlined">
              <CardHeader
                avatar={
                  <Avatar src={client.image}>
                    {client.type === 'business' ? <Business /> : <Person />}
                  </Avatar>
                }
                action={
                  <IconButton
                    aria-label="opciones"
                    onClick={(e) => handleMenuOpen(e, client.id)}
                  >
                    <MoreVert />
                  </IconButton>
                }
                title={
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <Typography
                      variant="h6"
                      component="div"
                      noWrap
                    >
                      {client.name}
                    </Typography>
                  </Box>
                }
                subheader={client.email}
              />
              <CardContent sx={{ pt: 0 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Chip
                    label={client.type === 'business' ? 'Empresa' : 'Persona'}
                    color={client.type === 'business' ? 'primary' : 'secondary'}
                    size="small"
                    sx={{ mb: 1 }}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Teléfono:
                  </Typography>
                  <Typography variant="body2">{client.phone}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Último servicio:
                  </Typography>
                  <Typography variant="body2">{client.lastService}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Próximo servicio:
                  </Typography>
                  <Typography variant="body2">{client.nextService}</Typography>
                </Box>

                {client.type === 'business' && client.businessDetails && (
                  <>
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        Contacto:
                      </Typography>
                      <Typography variant="body2">
                        {client.businessDetails.contactPerson}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        Cargo:
                      </Typography>
                      <Typography variant="body2">{client.businessDetails.position}</Typography>
                    </Box>
                  </>
                )}
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => onViewDetails(client.id)}
                >
                  Ver detalles
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredClients.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 5 }}>
          <Typography color="text.secondary">
            No se encontraron clientes con los criterios de búsqueda.
          </Typography>
        </Box>
      )}

      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <Edit
            fontSize="small"
            sx={{ mr: 1 }}
          />{' '}
          Editar
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Schedule
            fontSize="small"
            sx={{ mr: 1 }}
          />{' '}
          Programar servicio
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <History
            fontSize="small"
            sx={{ mr: 1 }}
          />{' '}
          Ver historial
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleMenuClose}
          sx={{ color: 'error.main' }}
        >
          <Delete
            fontSize="small"
            sx={{ mr: 1 }}
          />{' '}
          Eliminar
        </MenuItem>
      </Menu>
    </Box>
  );
}
