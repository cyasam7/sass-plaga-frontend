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
  Container,
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
import { BranchForm } from "../../BranchSection/BranchForm"
import { BranchDetail } from "../../BranchSection/BranchDetail"
import { DetailTabs } from "../../DetailTabs"
import { useNavigate } from "react-router"
import { ClientInfo } from "../ClientInfo"
import { Branch, Client } from "../types"
import { BranchCard } from "../BranchCard"
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

export function ClientDetail() {
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


  const navigate = useNavigate()

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
      <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mr: 2 }}>
          Volver
        </Button>
        <Typography variant="h5" component="h1">
          Detalle del Cliente
        </Typography>
      </Box>

      <ClientInfo client={CLIENT} />

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <DetailTabs
            activeTab={activeTab}
            onTabChange={handleTabChange}
            type="client"
          />

          {activeTab === 0 && (
            <>
              <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={handleAddBranch}
                  color="primary"
                  sx={{
                    bgcolor: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    }
                  }}
                >
                  Agregar Sucursal
                </Button>
              </Box>

              <Grid container spacing={2}>
                {branches.map((branch) => (
                  <Grid item xs={12} sm={6} md={4} key={branch.id}>
                    <BranchCard branch={branch} onMenuClick={handleMenuClick} onBranchClick={handleBranchClick} />
                  </Grid>
                ))}
              </Grid>

              <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => handleEditBranch(branches.find((b) => b.id === selectedBranchId)!)}>
                  <Edit sx={{ mr: 1, color: 'primary.main' }} /> Editar
                </MenuItem>
                <MenuItem onClick={() => handleDeleteBranch(selectedBranchId!)}>
                  <Delete sx={{ mr: 1, color: 'error.main' }} /> Eliminar
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
                  <Button
                    onClick={() => setDeleteConfirmOpen(false)}
                    color="inherit"
                  >
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
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <CalendarMonth sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
              <Typography variant="h6" color="success.main" gutterBottom>
                Historial de Servicios
              </Typography>
              <Typography color="text.secondary">
                Aquí se mostrará el historial de servicios y mantenimientos
              </Typography>
            </Box>
          )}

          {activeTab === 2 && (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Warning sx={{ fontSize: 48, color: 'warning.main', mb: 2 }} />
              <Typography variant="h6" color="warning.main" gutterBottom>
                Alertas y Notificaciones
              </Typography>
              <Typography color="text.secondary">
                Aquí se mostrarán las alertas y notificaciones importantes
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

export default ClientDetail; 