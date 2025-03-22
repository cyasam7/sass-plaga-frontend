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
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
} from "@mui/material"
import {
  ArrowBack,
  MeetingRoom,
  Add,
  Edit,
  Delete,
  MoreVert,
  BugReport,
  CalendarMonth,
  Warning,
} from "@mui/icons-material"
import { DeviceForm } from "./device-form"
import { DeviceCard } from "./device-card"

// Tipos
interface Area {
  id: string
  branchId: string
  name: string
  description?: string
  riskLevel: "high" | "medium" | "low"
  lastInspection?: string
  nextInspection?: string
}

interface Device {
  id: string
  areaId: string
  type: "trap" | "bait" | "monitor" | "other"
  code: string
  location: string
  installDate: string
  lastCheck?: string
  nextCheck?: string
  status: "active" | "inactive" | "maintenance"
  notes?: string
}

// Datos de ejemplo para dispositivos
const DEVICES: Device[] = [
  {
    id: "1",
    areaId: "1",
    type: "trap",
    code: "TR-001",
    location: "Esquina noreste",
    installDate: "01/01/2024",
    lastCheck: "10/03/2024",
    nextCheck: "10/04/2024",
    status: "active",
    notes: "Trampa para roedores",
  },
  {
    id: "2",
    areaId: "1",
    type: "bait",
    code: "BA-002",
    location: "Junto a la puerta trasera",
    installDate: "15/01/2024",
    lastCheck: "10/03/2024",
    nextCheck: "10/04/2024",
    status: "active",
    notes: "Cebo para insectos rastreros",
  },
  {
    id: "3",
    areaId: "1",
    type: "monitor",
    code: "MO-003",
    location: "Techo, zona central",
    installDate: "05/02/2024",
    lastCheck: "10/03/2024",
    nextCheck: "10/04/2024",
    status: "maintenance",
    notes: "Monitor de insectos voladores",
  },
  {
    id: "4",
    areaId: "2",
    type: "trap",
    code: "TR-004",
    location: "Pasillo principal",
    installDate: "10/01/2024",
    lastCheck: "05/03/2024",
    nextCheck: "05/04/2024",
    status: "active",
    notes: "Trampa para roedores",
  },
]

interface AreaDetailProps {
  areaId: string
  onBack: () => void
  areas: Area[]
  branchName: string
}

export function AreaDetail({ areaId, onBack, areas, branchName }: AreaDetailProps) {
  const area = areas.find((a) => a.id === areaId)

  const [activeTab, setActiveTab] = useState(0)
  const [devices, setDevices] = useState<Device[]>(DEVICES.filter((device) => device.areaId === areaId))
  const [showDeviceForm, setShowDeviceForm] = useState(false)
  const [currentDevice, setCurrentDevice] = useState<Device | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [deviceToDelete, setDeviceToDelete] = useState<string | null>(null)

  if (!area) {
    return (
      <Box sx={{ textAlign: "center", py: 5 }}>
        <Typography>Área no encontrada</Typography>
        <Button onClick={onBack} sx={{ mt: 2 }}>
          Volver
        </Button>
      </Box>
    )
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const handleAddDevice = () => {
    setCurrentDevice(null)
    setIsEditing(false)
    setShowDeviceForm(true)
  }

  const handleEditDevice = (device: Device) => {
    setCurrentDevice(device)
    setIsEditing(true)
    setShowDeviceForm(true)
    handleMenuClose()
  }

  const handleDeleteDevice = (deviceId: string) => {
    setDeviceToDelete(deviceId)
    setDeleteConfirmOpen(true)
    handleMenuClose()
  }

  const confirmDeleteDevice = () => {
    if (deviceToDelete) {
      setDevices(devices.filter((device) => device.id !== deviceToDelete))
      setDeleteConfirmOpen(false)
      setDeviceToDelete(null)
    }
  }

  const handleSaveDevice = (device: Device) => {
    if (isEditing && currentDevice) {
      // Actualizar dispositivo existente
      setDevices(devices.map((d) => (d.id === device.id ? device : d)))
    } else {
      // Agregar nuevo dispositivo
      const newDevice = {
        ...device,
        id: `${devices.length + 1}`, // En una aplicación real, esto vendría del backend
        areaId: areaId,
      }
      setDevices([...devices, newDevice])
    }
    setShowDeviceForm(false)
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, deviceId: string) => {
    setMenuAnchorEl(event.currentTarget)
    setSelectedDeviceId(deviceId)
  }

  const handleMenuClose = () => {
    setMenuAnchorEl(null)
    setSelectedDeviceId(null)
  }

  const getDeviceTypeLabel = (type: string) => {
    switch (type) {
      case "trap":
        return "Trampa"
      case "bait":
        return "Cebo"
      case "monitor":
        return "Monitor"
      default:
        return "Otro"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success"
      case "inactive":
        return "error"
      case "maintenance":
        return "warning"
      default:
        return "default"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Activo"
      case "inactive":
        return "Inactivo"
      case "maintenance":
        return "En mantenimiento"
      default:
        return status
    }
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
          Detalle del Área
        </Typography>
      </Box>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Box sx={{ mr: 2 }}>
                <MeetingRoom sx={{ fontSize: 40, color: "primary.main" }} />
              </Box>
              <Box>
                <Typography variant="h5">{area.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {branchName}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="body1">{area.description || "Sin descripción"}</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                Nivel de riesgo:
              </Typography>
              <Chip
                label={area.riskLevel === "high" ? "Alto" : area.riskLevel === "medium" ? "Medio" : "Bajo"}
                color={getRiskLevelColor(area.riskLevel) as any}
                size="small"
                icon={area.riskLevel === "high" ? <Warning fontSize="small" /> : undefined}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Información de Inspecciones
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Última inspección:
              </Typography>
              <Typography variant="body2">{area.lastInspection || "No disponible"}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Próxima inspección:
              </Typography>
              <Typography variant="body2">{area.nextInspection || "No programada"}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab label="Dispositivos de Control" />
            <Tab label="Historial de Inspecciones" />
            <Tab label="Documentos" />
          </Tabs>
        </Box>
        <Box sx={{ p: 3 }}>
          {activeTab === 0 && (
            <>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                <Typography variant="h6">Dispositivos de Control de Plagas</Typography>
                <Button variant="contained" startIcon={<Add />} onClick={handleAddDevice}>
                  Agregar Dispositivo
                </Button>
              </Box>

              <Grid container spacing={3}>
                {devices.map((device) => (
                  <Grid item xs={12} md={6} lg={4} key={device.id}>
                    <DeviceCard
                      device={device}
                      onMenuClick={handleMenuClick}
                      onEditDevice={handleEditDevice}
                      getDeviceTypeLabel={getDeviceTypeLabel}
                      getStatusLabel={getStatusLabel}
                      getStatusColor={getStatusColor}
                    />
                  </Grid>
                ))}
              </Grid>

              {devices.length === 0 && (
                <Box sx={{ textAlign: "center", py: 5 }}>
                  <BugReport sx={{ fontSize: 60, color: "text.secondary", mb: 2 }} />
                  <Typography color="text.secondary">
                    No hay dispositivos de control registrados para esta área.
                  </Typography>
                  <Button variant="outlined" startIcon={<Add />} sx={{ mt: 2 }} onClick={handleAddDevice}>
                    Agregar Dispositivo
                  </Button>
                </Box>
              )}
            </>
          )}

          {activeTab === 1 && <Typography>Historial de inspecciones (en desarrollo)</Typography>}

          {activeTab === 2 && <Typography>Documentos (en desarrollo)</Typography>}
        </Box>
      </Paper>

      {/* Menú de opciones para dispositivos */}
      <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={handleMenuClose}>
        <MenuItem
          onClick={() => {
            const device = devices.find((d) => d.id === selectedDeviceId)
            if (device) handleEditDevice(device)
          }}
        >
          <Edit fontSize="small" sx={{ mr: 1 }} /> Editar
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (selectedDeviceId) handleDeleteDevice(selectedDeviceId)
          }}
          sx={{ color: "error.main" }}
        >
          <Delete fontSize="small" sx={{ mr: 1 }} /> Eliminar
        </MenuItem>
      </Menu>

      {/* Formulario de dispositivo */}
      <DeviceForm
        open={showDeviceForm}
        onClose={() => setShowDeviceForm(false)}
        onSave={handleSaveDevice}
        device={currentDevice}
        isEditing={isEditing}
      />

      {/* Diálogo de confirmación para eliminar */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Está seguro de que desea eliminar este dispositivo? Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancelar</Button>
          <Button onClick={confirmDeleteDevice} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

