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
  CalendarMonth,
  Warning,
} from "@mui/icons-material"
import { BranchForm } from "../../components/BranchForm"
import { BranchDetail } from "../../components/BranchDetail"
import type { Client, Branch, ClientDetailProps } from "./types"

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

                {CLIENT.businessDetails && (
                  <>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Detalles de la Empresa
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <Person fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={CLIENT.businessDetails.contactPerson}
                          secondary="Contacto Principal"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Business fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={CLIENT.businessDetails.position}
                          secondary="Cargo"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Store fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={CLIENT.businessDetails.employeeCount.toString()}
                          secondary="Empleados"
                        />
                      </ListItem>
                    </List>
                  </>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardHeader
                    title="Servicios"
                    action={
                      <Chip
                        label={CLIENT.nextService ? "Próximo: " + CLIENT.nextService : "Sin servicio programado"}
                        color={CLIENT.nextService ? "primary" : "default"}
                        size="small"
                      />
                    }
                  />
                  <CardContent>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <CalendarMonth fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={CLIENT.lastService || "Sin servicio previo"}
                          secondary="Último Servicio"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CalendarMonth fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={CLIENT.nextService || "Sin servicio programado"}
                          secondary="Próximo Servicio"
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>

          <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
            <Tabs value={activeTab} onChange={handleTabChange}>
              <Tab
                icon={<Store />}
                label="Sucursales"
                iconPosition="start"
              />
              <Tab
                icon={<CalendarMonth />}
                label="Historial"
                iconPosition="start"
              />
              <Tab
                icon={<Warning />}
                label="Alertas"
                iconPosition="start"
              />
            </Tabs>
          </Box>

          {activeTab === 0 && (
            <>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={handleAddBranch}
                >
                  Agregar Sucursal
                </Button>
              </Box>

              <Grid container spacing={2}>
                {branches.map((branch) => (
                  <Grid item xs={12} sm={6} md={4} key={branch.id}>
                    <Card>
                      <CardHeader
                        title={branch.name}
                        action={
                          <IconButton
                            size="small"
                            onClick={(event) => handleMenuClick(event, branch.id)}
                          >
                            <MoreVert />
                          </IconButton>
                        }
                      />
                      <CardContent>
                        <List dense>
                          <ListItem>
                            <ListItemIcon>
                              <LocationOn fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary={branch.address} />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <Person fontSize="small" />
                            </ListItemIcon>
                            <ListItemText
                              primary={branch.contactPerson}
                              secondary="Contacto"
                            />
                          </ListItem>
                          <ListItem>
                            <ListItemIcon>
                              <Phone fontSize="small" />
                            </ListItemIcon>
                            <ListItemText primary={branch.contactPhone} />
                          </ListItem>
                        </List>
                      </CardContent>
                      <CardActions>
                        <Button
                          size="small"
                          startIcon={<Apartment />}
                          onClick={() => handleBranchClick(branch.id)}
                        >
                          Ver Detalles
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => handleEditBranch(branches.find((b) => b.id === selectedBranchId)!)}>
                  <Edit sx={{ mr: 1 }} /> Editar
                </MenuItem>
                <MenuItem onClick={() => handleDeleteBranch(selectedBranchId!)}>
                  <Delete sx={{ mr: 1 }} /> Eliminar
                </MenuItem>
              </Menu>

              <Dialog
                open={showBranchForm}
                onClose={() => setShowBranchForm(false)}
                maxWidth="sm"
                fullWidth
              >
                <DialogTitle>
                  {isEditing ? "Editar Sucursal" : "Nueva Sucursal"}
                </DialogTitle>
                <DialogContent>
                  <BranchForm
                    branch={currentBranch}
                    onSave={handleSaveBranch}
                    onClose={() => {
                      setShowBranchForm(false)
                    }}
                    open={showBranchForm}
                    isEditing={isEditing}
                  />
                </DialogContent>
              </Dialog>

              <Dialog
                open={deleteConfirmOpen}
                onClose={() => setDeleteConfirmOpen(false)}
              >
                <DialogTitle>Confirmar Eliminación</DialogTitle>
                <DialogContent>
                  <Typography>
                    ¿Está seguro que desea eliminar esta sucursal?
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setDeleteConfirmOpen(false)}>
                    Cancelar
                  </Button>
                  <Button
                    onClick={confirmDeleteBranch}
                    color="error"
                    variant="contained"
                  >
                    Eliminar
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          )}

          {activeTab === 1 && (
            <Typography>Historial de servicios y mantenimientos</Typography>
          )}

          {activeTab === 2 && (
            <Typography>Alertas y notificaciones</Typography>
          )}
        </>
      )}
    </Box>
  )
} 