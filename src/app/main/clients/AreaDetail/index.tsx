"use client"

import type React from "react"
import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
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
  Add,
  Edit,
  Delete,
  BugReport,
} from "@mui/icons-material"
import { Area, Device } from "../types"
import { DeviceCard } from "../components/Cards/DeviceCard"
import { DeviceForm } from "../components/Forms/DeviceForm"
import { useNavigate } from "react-router"

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
]

export function AreaDetail() {
  const navigate = useNavigate()
  const area: Area = {
    id: "1",
    name: "Área 1",
    description: "Descripción de la área 1",
    branchId: "1",
  }

  const [devices, setDevices] = useState<Device[]>(DEVICES)
  const [showDeviceForm, setShowDeviceForm] = useState(false)
  const [currentDevice, setCurrentDevice] = useState<Device | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null)
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
  const [deviceToDelete, setDeviceToDelete] = useState<string | null>(null)

  const handleOnBack = () => {
    navigate(-1)
  }

  if (!area) {
    return (
      <Box sx={{ textAlign: "center", py: 5 }}>
        <Typography>Área no encontrada</Typography>
        <Button onClick={handleOnBack} sx={{ mt: 2 }}>
          Volver
        </Button>
      </Box>
    )
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
        areaId: area.id,
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

  return (
    <Box>
      <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
        <Button startIcon={<ArrowBack />} onClick={handleOnBack} sx={{ mr: 2 }}>
          Volver
        </Button>
        <Typography variant="h5" component="h1">
          Detalle del Área
        </Typography>
      </Box>

      <Paper sx={{ p: 3, mb: 4, background: "linear-gradient(to bottom, rgba(25, 118, 210, 0.05), transparent)" }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2, mb: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", color: "primary.main" }}>
                {area.name}
              </Typography>
            </Box>
            {area.description && (
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {area.description}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
          <Typography variant="h6" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <BugReport color="primary" /> Dispositivos del Área
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddDevice}
          >
            Agregar Dispositivo
          </Button>
        </Box>

        <Grid container spacing={2}>
          {devices.map((device) => (
            <Grid item xs={12} sm={6} md={4} key={device.id}>
              <DeviceCard
                getDeviceTypeLabel={getDeviceTypeLabel}
                getStatusLabel={getStatusLabel}
                getStatusColor={getStatusColor}
                onEditDevice={handleEditDevice}
                device={device}
                onMenuClick={(event) => handleMenuClick(event, device.id)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleEditDevice(devices.find((d) => d.id === selectedDeviceId)!)}>
          <Edit sx={{ mr: 1 }} /> Editar
        </MenuItem>
        <MenuItem onClick={() => handleDeleteDevice(selectedDeviceId!)}>
          <Delete sx={{ mr: 1 }} /> Eliminar
        </MenuItem>
      </Menu>

      <Dialog
        open={showDeviceForm}
        onClose={() => setShowDeviceForm(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {isEditing ? "Editar Dispositivo" : "Nuevo Dispositivo"}
        </DialogTitle>
        <DialogContent>
          <DeviceForm
            device={currentDevice}
            onSave={handleSaveDevice}
            onClose={() => {
              setShowDeviceForm(false)
            }}
            open={showDeviceForm}
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
            ¿Está seguro que desea eliminar este dispositivo?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>
            Cancelar
          </Button>
          <Button
            onClick={confirmDeleteDevice}
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

export default AreaDetail; 