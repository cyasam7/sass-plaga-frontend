import type React from "react"
import { useState } from "react"
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
} from "@mui/material"
import {
  ArrowBack,
  Add,
  Edit,
  Delete,
  CalendarMonth,
  Warning,
} from "@mui/icons-material"
import { useNavigate } from "react-router"
import DetailTabs from "./DetailTabs"
import { Branch, Client } from "../types"
import ClientInfo from "./ClientInfo"
import { BranchCard } from "../Cards/BranchCard"
import { BranchForm } from "../Forms/BranchForm"

// Datos de ejemplo
const CLIENT: Client = {
  id: "1",
  name: "Supermercados El Ahorro",
  type: "business",
  email: "contacto@elahorro.com",
  phone: "555-123-4567",
  address: "Av. Principal #123, Zona Comercial",
  businessDetails: {
    contactPerson: "María Rodríguez",
    position: "Gerente de Operaciones",
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
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)
  const [branches, setBranches] = useState<Branch[]>(BRANCHES)
  const [showBranchForm, setShowBranchForm] = useState(false)
  const [currentBranch, setCurrentBranch] = useState<Branch | null>(null)
  const [isEditing, setIsEditing] = useState(false)
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

  const handleConfirmDelete = () => {
    if (branchToDelete) {
      setBranches(branches.filter((branch) => branch.id !== branchToDelete))
      setBranchToDelete(null)
    }
    setDeleteConfirmOpen(false)
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
    const branch = branches.find((b) => b.id === branchId)
    if (branch) {
      setCurrentBranch(branch)
    }
  }

  const handleMenuClose = () => {
    setMenuAnchorEl(null)
    setCurrentBranch(null)
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
                    <BranchCard branch={branch} onMenuClick={handleMenuClick} />
                  </Grid>
                ))}
              </Grid>
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

      {/* Menú de opciones para cada sucursal */}
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <Button
          onClick={() => currentBranch && handleEditBranch(currentBranch)}
          startIcon={<Edit />}
          fullWidth
          sx={{ justifyContent: "flex-start", px: 2, py: 1 }}
        >
          Editar
        </Button>
        <Button
          onClick={() => currentBranch && handleDeleteBranch(currentBranch.id)}
          startIcon={<Delete />}
          color="error"
          fullWidth
          sx={{ justifyContent: "flex-start", px: 2, py: 1 }}
        >
          Eliminar
        </Button>
      </Menu>

      {/* Formulario de sucursal */}
      <BranchForm
        open={showBranchForm}
        onClose={() => setShowBranchForm(false)}
        onSave={handleSaveBranch}
        branch={currentBranch}
        isEditing={isEditing}
      />

      {/* Diálogo de confirmación de eliminación */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Está seguro que desea eliminar esta sucursal? Esta acción no se puede deshacer.
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
            onClick={handleConfirmDelete}
            color="error"
            variant="contained"
          >
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default ClientDetail; 