"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Chip,
  IconButton,
  Divider,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Menu,
} from "@mui/material"
import {
  ArrowBack,
  Business,
  Person,
  LocationOn,
  Phone,
  Email,
  Add,
  Edit,
  Delete,
  MoreVert,
  Store,
  Apartment,
} from "@mui/icons-material"
import { BranchForm } from "./branch-form"
import { BranchDetail } from "./branch-detail"

// Tipos
interface Client {
  id: string
  name: string
  type: "business" | "individual"
  email: string
  phone: string
  address: string
  lastService?: string
  nextService?: string
  image?: string
  businessDetails?: {
    contactPerson: string
    position: string
    employeeCount: number
  }
}

interface Branch {
  id: string
  clientId: string
  name: string
  address: string
  contactPerson: string
  contactPhone: string
  notes?: string
}

interface ClientDetailProps {
  clientId: string
  onBack: () => void
}

// Datos de ejemplo
const CLIENT: Client = {
  id: "1",
  name: "Supermercados El Ahorro",
  type: "business",
  email: "contacto@elahorro.com",
  phone: "555-123-4567",
  address: "Av. Principal #123, Zona Comercial",
  lastService: "15/02/2024",
  nextService: "15/05/2024",
  image: "/placeholder.svg?height=40&width=40",
  businessDetails: {
    contactPerson: "María Rodríguez",
    position: "Gerente de Operaciones",
    employeeCount: 120,
  },
}

const BRANCHES: Branch[] = [
  {
    id: "1",
    clientId: "1",
    name: "Sucursal Centro",
    address: "Calle Central #123",
    contactPerson: "Carlos Pérez",
    contactPhone: "555-987-6543",
  },
  {
    id: "2",
    clientId: "1",
    name: "Sucursal Norte",
    address: "Avenida del Norte #456",
    contactPerson: "Ana Gómez",
    contactPhone: "555-246-8013",
  },
]

export function ClientDetail({ clientId, onBack }: ClientDetailProps) {
  // En una aplicación real, aquí se cargarían los datos del cliente según el ID
  // Por ahora, usamos el cliente de ejemplo
  const client = CLIENT

  const [activeTab, setActiveTab] = useState(0)
  const [branches, setBranches] = useState<Branch[]>(BRANCHES)
  const [showBranchForm, setShowBranchForm] = useState(false)
  const [currentBranch, setCurrentBranch] = useState<Branch | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null)
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [branchToDelete, setBranchToDelete] = useState<string | null>(null)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const handleAddBranch = () => {
    setCurrentBranch(null)
    setIsEditing(false)
    setShowBranchForm(true)
  }

  const handleEditBranch = (branch: Branch) => {
    setCurrentBranch(branch)
    setIsEditing(true)
    setShowBranchForm(true)
    handleMenuClose()
  }

  const handleDeleteBranch = (branchId: string) => {
    setBranchToDelete(branchId)
    setDeleteConfirmOpen(true)
    handleMenuClose()
  }

  const confirmDeleteBranch = () => {
    if (branchToDelete) {
      setBranches(branches.filter((branch) => branch.id !== branchToDelete))
      setDeleteConfirmOpen(false)
      setBranchToDelete(null)
    }
  }

  const handleSaveBranch = (branch: Branch) => {
    if (isEditing && currentBranch) {
      // Actualizar sucursal existente
      setBranches(branches.map((b) => (b.id === branch.id ? branch : b)))
    } else {
      // Agregar nueva sucursal
      const newBranch = {
        ...branch,
        id: `${branches.length + 1}`, // En una aplicación real, esto vendría del backend
        clientId: CLIENT.id,
      }
      setBranches([...branches, newBranch])
    }
    setShowBranchForm(false)
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, branchId: string) => {
    setMenuAnchorEl(event.currentTarget)
    setSelectedBranchId(branchId)
  }

  const handleMenuClose = () => {
    setMenuAnchorEl(null)
    setSelectedBranchId(null)
  }

  const handleBranchClick = (branchId: string) => {
    // Cerrar el menú si está abierto
    setMenuAnchorEl(null)
    setSelectedBranchId(branchId)
  }

  return (
    <Box>
      {selectedBranchId ? (
        // Vista de detalle de sucursal
        <BranchDetail
          branchId={selectedBranchId}
          onBack={() => {
            setMenuAnchorEl(null)
            setSelectedBranchId(null)
          }}
          branches={branches}
        />
      ) : (
        // Vista de detalle de cliente
        <>
          <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
            <Button startIcon={<ArrowBack />} onClick={onBack} sx={{ mr: 2 }}>
              Volver
            </Button>
            <Typography variant="h5" component="h1">
              Detalle del Cliente
            </Typography>
          </Box>

          <Paper sx={{ p: 3, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Box sx={{ mr: 2 }}>
                    {CLIENT.type === "business" ? (
                      <Business sx={{ fontSize: 40, color: "primary.main" }} />
                    ) : (
                      <Person sx={{ fontSize: 40, color: "primary.main" }} />
                    )}
                  </Box>
                  <Box>
                    <Typography variant="h5">{CLIENT.name}</Typography>
                    <Chip
                      label={CLIENT.type === "business" ? "Empresa" : "Persona"}
                      color={CLIENT.type === "business" ? "primary" : "secondary"}
                      size="small"
                      sx={{ mt: 0.5 }}
                    />
                  </Box>
                </Box>

                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <Email fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={CLIENT.email} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Phone fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={CLIENT.phone} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <LocationOn fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={CLIENT.address} />
                  </ListItem>
                </List>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Información de Servicio
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Último servicio:
                  </Typography>
                  <Typography variant="body2">{CLIENT.lastService}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Próximo servicio:
                  </Typography>
                  <Typography variant="body2">{CLIENT.nextService}</Typography>
                </Box>

                {CLIENT.type === "business" && CLIENT.businessDetails && (
                  <>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1" gutterBottom>
                      Información Empresarial
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Contacto:
                      </Typography>
                      <Typography variant="body2">{CLIENT.businessDetails.contactPerson}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Cargo:
                      </Typography>
                      <Typography variant="body2">{CLIENT.businessDetails.position}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Empleados:
                      </Typography>
                      <Typography variant="body2">{CLIENT.businessDetails.employeeCount}</Typography>
                    </Box>
                  </>
                )}
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={{ mb: 4 }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab label="Sucursales" />
                <Tab label="Historial de Servicios" />
                <Tab label="Documentos" />
              </Tabs>
            </Box>
            <Box sx={{ p: 3 }}>
              {activeTab === 0 && (
                <>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                    <Typography variant="h6">Sucursales</Typography>
                    <Button variant="contained" startIcon={<Add />} onClick={handleAddBranch}>
                      Agregar Sucursal
                    </Button>
                  </Box>

                  <Grid container spacing={3}>
                    {branches.map((branch) => (
                      <Grid item xs={12} md={6} lg={4} key={branch.id}>
                        <Card variant="outlined">
                          <CardHeader
                            avatar={<Store color="primary" />}
                            action={
                              <IconButton aria-label="opciones" onClick={(e) => handleMenuClick(e, branch.id)}>
                                <MoreVert />
                              </IconButton>
                            }
                            title={branch.name}
                            subheader={branch.address}
                          />
                          <CardContent sx={{ pt: 0 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                              <Typography variant="body2" color="text.secondary">
                                Contacto:
                              </Typography>
                              <Typography variant="body2">{branch.contactPerson}</Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                              <Typography variant="body2" color="text.secondary">
                                Teléfono:
                              </Typography>
                              <Typography variant="body2">{branch.contactPhone}</Typography>
                            </Box>
                          </CardContent>
                          <CardActions>
                            <Button size="small" onClick={() => handleBranchClick(branch.id)}>
                              Ver Detalle
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>

                  {branches.length === 0 && (
                    <Box sx={{ textAlign: "center", py: 5 }}>
                      <Apartment sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
                      <Typography color="text.secondary">No hay sucursales registradas para este cliente.</Typography>
                      <Button variant="outlined" startIcon={<Add />} sx={{ mt: 2 }} onClick={handleAddBranch}>
                        Agregar Sucursal
                      </Button>
                    </Box>
                  )}
                </>
              )}

              {activeTab === 1 && <Typography>Historial de servicios (en desarrollo)</Typography>}

              {activeTab === 2 && <Typography>Documentos (en desarrollo)</Typography>}
            </Box>
          </Paper>

          {/* Menú de opciones para sucursales */}
          <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose}>
            <MenuItem
              onClick={() => {
                const branch = branches.find((b) => b.id === selectedBranchId)
                if (branch) handleEditBranch(branch)
              }}
            >
              <Edit fontSize="small" sx={{ mr: 1 }} /> Editar
            </MenuItem>
            <MenuItem
              onClick={() => {
                if (selectedBranchId) handleDeleteBranch(selectedBranchId)
              }}
              sx={{ color: "error.main" }}
            >
              <Delete fontSize="small" sx={{ mr: 1 }} /> Eliminar
            </MenuItem>
          </Menu>

          {/* Formulario de sucursal */}
          <BranchForm
            open={showBranchForm}
            onClose={() => setShowBranchForm(false)}
            onSave={handleSaveBranch}
            branch={currentBranch}
            isEditing={isEditing}
          />

          {/* Diálogo de confirmación para eliminar */}
          <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogContent>
              <Typography>
                ¿Está seguro de que desea eliminar esta sucursal? Esta acción no se puede deshacer.
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteConfirmOpen(false)}>Cancelar</Button>
              <Button onClick={confirmDeleteBranch} color="error" variant="contained">
                Eliminar
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  )
}

