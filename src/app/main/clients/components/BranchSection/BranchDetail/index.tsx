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
  IconButton,
  Tabs,
  Tab,
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
  MoreVert,
  MeetingRoom,
  Warning,
  CalendarMonth,
} from "@mui/icons-material"
import { AreaForm } from "../../AreaSection/AreaForm"
import { AreaDetail } from "../../AreaSection/AreaDetail"
import type { Area, Branch } from "./types"
import { DetailTabs } from "../../DetailTabs"

// Datos de ejemplo para áreas
const AREAS: Area[] = [
  {
    id: "1",
    branchId: "1",
    name: "Cocina",
    description: "Área de preparación de alimentos",
    riskLevel: "high",
    lastInspection: "10/03/2024",
    nextInspection: "10/04/2024",
  },
  {
    id: "2",
    branchId: "1",
    name: "Almacén",
    description: "Almacenamiento de productos secos",
    riskLevel: "medium",
    lastInspection: "05/03/2024",
    nextInspection: "05/04/2024",
  },
  {
    id: "3",
    branchId: "1",
    name: "Área de Ventas",
    description: "Zona de exhibición y venta",
    riskLevel: "low",
    lastInspection: "01/03/2024",
    nextInspection: "01/05/2024",
  },
  {
    id: "4",
    branchId: "2",
    name: "Cocina",
    description: "Área de preparación de alimentos",
    riskLevel: "high",
    lastInspection: "12/03/2024",
    nextInspection: "12/04/2024",
  },
  {
    id: "5",
    branchId: "2",
    name: "Almacén",
    description: "Almacenamiento de productos secos",
    riskLevel: "medium",
    lastInspection: "08/03/2024",
    nextInspection: "08/04/2024",
  },
]

export function BranchDetail({ branchId, onBack }: { branchId: string; onBack: () => void }) {
  const branch = {
    id: "1",
    clientId: "1",
    name: "Sucursal Principal",
    address: "Av. Principal 123",
    contactPerson: "Juan Pérez",
    contactPhone: "555-0123",
    notes: "Sucursal principal con área de ventas y almacén",
  }

  const [activeTab, setActiveTab] = useState(0)
  const [areas, setAreas] = useState<Area[]>(AREAS.filter((area) => area.branchId === branchId))
  const [showAreaForm, setShowAreaForm] = useState(false)
  const [currentArea, setCurrentArea] = useState<Area | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null)
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [areaToDelete, setAreaToDelete] = useState<string | null>(null)

  if (!branch) {
    return (
      <Box sx={{ textAlign: "center", py: 5 }}>
        <Typography>Sucursal no encontrada</Typography>
        <Button onClick={onBack} sx={{ mt: 2 }}>
          Volver
        </Button>
      </Box>
    )
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
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
        branchId: branchId,
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

  const handleAreaClick = (areaId: string) => {
    // Cerrar el menú si está abierto
    setMenuAnchorEl(null)
    setSelectedAreaId(areaId)
  }

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "high":
        return "error"
      case "medium":
        return "warning"
      case "low":
        return "success"
      default:
        return "default"
    }
  }

  return (
    <Box>

      <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
        <Button startIcon={<ArrowBack />} onClick={onBack} sx={{ mr: 2 }}>
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
                <Store sx={{ fontSize: 40, color: "primary.main" }} />
              </Box>
              <Box>
                <Typography variant="h5">{branch.name}</Typography>
              </Box>
            </Box>

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
              {branch.notes && (
                <ListItem>
                  <ListItemIcon>
                    <MeetingRoom fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={branch.notes} />
                </ListItem>
              )}
            </List>
          </Grid>
        </Grid>
      </Paper>

      <DetailTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        type="branch"
      />

      {activeTab === 0 && (
        <>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
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
                <Card>
                  <CardHeader
                    title={area.name}
                    action={
                      <IconButton
                        size="small"
                        onClick={(event) => handleMenuClick(event, area.id)}
                      >
                        <MoreVert />
                      </IconButton>
                    }
                  />
                  <CardContent>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <MeetingRoom fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary={area.description} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Warning fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={area.riskLevel.toUpperCase()}
                          secondary="Nivel de Riesgo"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CalendarMonth fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                          primary={area.nextInspection || "Sin inspección programada"}
                          secondary="Próxima Inspección"
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      startIcon={<MeetingRoom />}
                      onClick={() => handleAreaClick(area.id)}
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
        </>
      )}

      {activeTab === 1 && (
        <Typography>Historial de inspecciones y mantenimientos</Typography>
      )}

      {activeTab === 2 && (
        <Typography>Alertas y notificaciones</Typography>
      )}
    </Box>
  )
}

export default BranchDetail; 