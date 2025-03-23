import type React from "react"
import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material"
import {
  ArrowBack,
  Store,
  LocationOn,
  Phone,
  Person,
  Add,
  Edit,
  Delete,
  MeetingRoom,
} from "@mui/icons-material"
import { Area } from "../types"
import { AreaCard } from "../Cards/AreaCard"
import { AreaForm } from "../Forms/AreaForm"
import { useNavigate } from "react-router"

// Datos de ejemplo para áreas
const AREAS: Area[] = [
  {
    id: "1",
    branchId: "1",
    name: "Cocina",
    description: "Área de preparación de alimentos",
  },
  {
    id: "2",
    branchId: "1",
    name: "Almacén",
    description: "Almacenamiento de productos secos",
  },
  {
    id: "3",
    branchId: "1",
    name: "Área de Ventas",
    description: "Zona de exhibición y venta",
  },
]

export function BranchDetail() {
  const navigate = useNavigate()
  const branch = {
    id: "1",
    clientId: "1",
    name: "Sucursal Principal",
    address: "Av. Principal 123",
    contactPerson: "Juan Pérez",
    contactPhone: "555-0123",
    notes: "Sucursal principal con área de ventas y almacén",
  }

  const [areas, setAreas] = useState<Area[]>(AREAS)
  const [showAreaForm, setShowAreaForm] = useState(false)
  const [currentArea, setCurrentArea] = useState<Area | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null)
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [areaToDelete, setAreaToDelete] = useState<string | null>(null)

  const handleOnBack = () => {
    navigate(-1)
  }

  if (!branch) {
    return (
      <Box sx={{ textAlign: "center", py: 5 }}>
        <Typography>Sucursal no encontrada</Typography>
        <Button onClick={handleOnBack} sx={{ mt: 2 }}>
          Volver
        </Button>
      </Box>
    )
  }

  const handleAddArea = () => {
    setCurrentArea(null)
    setIsEditing(false)
    setShowAreaForm(true)
  }

  const handleEditArea = (area: Area) => {
    setCurrentArea(area)
    setIsEditing(true)
    setShowAreaForm(true)
    handleMenuClose()
  }

  const handleDeleteArea = (areaId: string) => {
    setAreaToDelete(areaId)
    setDeleteConfirmOpen(true)
    handleMenuClose()
  }

  const confirmDeleteArea = () => {
    if (areaToDelete) {
      setAreas(areas.filter((area) => area.id !== areaToDelete))
      setDeleteConfirmOpen(false)
      setAreaToDelete(null)
    }
  }

  const handleSaveArea = (area: Area) => {
    if (isEditing && currentArea) {
      // Actualizar área existente
      setAreas(areas.map((a) => (a.id === area.id ? area : a)))
    } else {
      // Agregar nueva área
      const newArea = {
        ...area,
        id: `${areas.length + 1}`, // En una aplicación real, esto vendría del backend
        branchId: branch.id,
      }
      setAreas([...areas, newArea])
    }
    setShowAreaForm(false)
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, areaId: string) => {
    setMenuAnchorEl(event.currentTarget)
    setSelectedAreaId(areaId)
  }

  const handleMenuClose = () => {
    setMenuAnchorEl(null)
    setSelectedAreaId(null)
  }

  return (
    <Box>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
        <Button startIcon={<ArrowBack />} onClick={handleOnBack} sx={{ mr: 2 }}>
          Volver
        </Button>
        <Typography variant="h5" component="h1">
          Detalle de Sucursal
        </Typography>
      </Box>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Box sx={{ mr: 2 }}>
                <Store sx={{ fontSize: 48, color: "primary.main" }} />
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: "bold", color: "primary.main" }}>{branch.name}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {branch.notes}
                </Typography>
              </Box>
            </Box>

            <List dense>
              <ListItem>
                <ListItemIcon>
                  <LocationOn fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={branch.address}
                  secondary="Dirección"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Person fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={branch.contactPerson}
                  secondary="Contacto"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Phone fontSize="small" color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={branch.contactPhone}
                  secondary="Teléfono"
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h6" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <MeetingRoom color="primary" /> Áreas de la Sucursal
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddArea}
          >
            Agregar Área
          </Button>
        </Box>

        <Grid container spacing={2}>
          {areas.map((area) => (
            <Grid item xs={12} sm={6} md={4} key={area.id}>
              <AreaCard area={area} onMenuClick={handleMenuClick} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleEditArea(areas.find((a) => a.id === selectedAreaId)!)}>
          <Edit sx={{ mr: 1 }} /> Editar
        </MenuItem>
        <MenuItem onClick={() => handleDeleteArea(selectedAreaId!)}>
          <Delete sx={{ mr: 1 }} /> Eliminar
        </MenuItem>
      </Menu>

      <Dialog
        open={showAreaForm}
        onClose={() => setShowAreaForm(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {isEditing ? "Editar Área" : "Nueva Área"}
        </DialogTitle>
        <DialogContent>
          <AreaForm
            area={currentArea}
            onSave={handleSaveArea}
            onClose={() => {
              setShowAreaForm(false)
            }}
            open={showAreaForm}
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
            ¿Está seguro que desea eliminar esta área?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>
            Cancelar
          </Button>
          <Button
            onClick={confirmDeleteArea}
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

export default BranchDetail; 