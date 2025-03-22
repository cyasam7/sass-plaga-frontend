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
} from "@mui/icons-material"
import { AreaForm } from "./area-form"
import { AreaDetail } from "./area-detail"

// Tipos
interface Branch {
  id: string
  clientId: string
  name: string
  address: string
  contactPerson: string
  contactPhone: string
  notes?: string
}

interface Area {
  id: string
  branchId: string
  name: string
  description?: string
  riskLevel: "high" | "medium" | "low"
  lastInspection?: string
  nextInspection?: string
}

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

interface BranchDetailProps {
  branchId: string
  onBack: () => void
  branches: Branch[]
}

export function BranchDetail({ branchId, onBack, branches }: BranchDetailProps) {
  const branch = branches.find((b) => b.id === branchId)

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
      {selectedAreaId ? (
        // Vista de detalle de área
        <AreaDetail
          areaId={selectedAreaId}
          onBack={() => {
            setMenuAnchorEl(null)
            setSelectedAreaId(null)
          }}
          areas={areas}
          branchName={branch.name}
        />
      ) : (
        // Vista de detalle de sucursal
        <>
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
                    <ListItemText primary={branch.contactPerson} />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <Phone fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={branch.contactPhone} />
                  </ListItem>
                </List>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" gutterBottom>
                  Notas
                </Typography>
                <Typography variant="body2">
                  {branch.notes || "No hay notas disponibles para esta sucursal."}
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          <Paper sx={{ mb: 4 }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab label="Áreas" />
                <Tab label="Historial de Inspecciones" />
                <Tab label="Documentos" />
              </Tabs>
            </Box>
            <Box sx={{ p: 3 }}>
              {activeTab === 0 && (
                <>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                    <Typography variant="h6">Áreas</Typography>
                    <Button variant="contained" startIcon={<Add />} onClick={handleAddArea}>
                      Agregar Área
                    </Button>
                  </Box>

                  <Grid container spacing={3}>
                    {areas.map((area) => (
                      <Grid item xs={12} md={6} lg={4} key={area.id}>
                        <Card variant="outlined">
                          <CardHeader
                            avatar={<MeetingRoom color="primary" />}
                            action={
                              <IconButton aria-label="opciones" onClick={(e) => handleMenuClick(e, area.id)}>
                                <MoreVert />
                              </IconButton>
                            }
                            title={area.name}
                            subheader={area.description}
                          />
                          <CardContent sx={{ pt: 0 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                              <Typography variant="body2" color="text.secondary">
                                Nivel de riesgo:
                              </Typography>
                              <Typography
                                variant="body2"
                                color={getRiskLevelColor(area.riskLevel) + ".main"}
                                fontWeight="bold"
                              >
                                {area.riskLevel === "high" ? "Alto" : area.riskLevel === "medium" ? "Medio" : "Bajo"}
                              </Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                              <Typography variant="body2" color="text.secondary">
                                Última inspección:
                              </Typography>
                              <Typography variant="body2">{area.lastInspection}</Typography>
                            </Box>
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                              <Typography variant="body2" color="text.secondary">
                                Próxima inspección:
                              </Typography>
                              <Typography variant="body2">{area.nextInspection}</Typography>
                            </Box>
                          </CardContent>
                          <CardActions>
                            <Button size="small" onClick={() => handleAreaClick(area.id)}>
                              Ver Dispositivos
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>

                  {areas.length === 0 && (
                    <Box sx={{ textAlign: "center", py: 5 }}>
                      <MeetingRoom sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
                      <Typography color="text.secondary">No hay áreas registradas para esta sucursal.</Typography>
                      <Button variant="outlined" startIcon={<Add />} sx={{ mt: 2 }} onClick={handleAddArea}>
                        Agregar Área
                      </Button>
                    </Box>
                  )}
                </>
              )}

              {activeTab === 1 && <Typography>Historial de inspecciones (en desarrollo)</Typography>}

              {activeTab === 2 && <Typography>Documentos (en desarrollo)</Typography>}
            </Box>
          </Paper>

          {/* Menú de opciones para áreas */}
          <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose}>
            <MenuItem
              onClick={() => {
                const area = areas.find((a) => a.id === selectedAreaId)
                if (area) handleEditArea(area)
              }}
            >
              <Edit fontSize="small" sx={{ mr: 1 }} /> Editar
            </MenuItem>
            <MenuItem
              onClick={() => {
                if (selectedAreaId) handleDeleteArea(selectedAreaId)
              }}
              sx={{ color: "error.main" }}
            >
              <Delete fontSize="small" sx={{ mr: 1 }} /> Eliminar
            </MenuItem>
          </Menu>

          {/* Formulario de área */}
          <AreaForm
            open={showAreaForm}
            onClose={() => setShowAreaForm(false)}
            onSave={handleSaveArea}
            area={currentArea}
            isEditing={isEditing}
          />

          {/* Diálogo de confirmación para eliminar */}
          <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogContent>
              <Typography>¿Está seguro de que desea eliminar esta área? Esta acción no se puede deshacer.</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteConfirmOpen(false)}>Cancelar</Button>
              <Button onClick={confirmDeleteArea} color="error" variant="contained">
                Eliminar
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  )
}

