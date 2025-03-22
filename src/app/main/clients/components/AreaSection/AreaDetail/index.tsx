"use client"

import type React from "react"
import { useState } from "react"
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
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
import { DeviceForm } from "../DeviceForm"
import { DeviceCard } from "../DeviceCard"
import type { Area, Device, AreaDetailProps } from "./types"
import { DetailTabs } from "../../DetailTabs"

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

export function AreaDetail() {
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
      <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={onBack}
          sx={{ mr: 2 }}
        >
          Volver
        </Button>
        <Typography variant="h5" component="h1">
          {area.name}
        </Typography>
      </Box>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Sucursal
            </Typography>
            <Typography variant="body1">{branchName}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Nivel de Riesgo
            </Typography>
            <Chip
              label={area.riskLevel.toUpperCase()}
              color={getRiskLevelColor(area.riskLevel)}
              size="small"
              sx={{ mt: 0.5 }}
            />
          </Grid>
          {area.description && (
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">
                Descripción
              </Typography>
              <Typography variant="body1">{area.description}</Typography>
            </Grid>
          )}
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Última Inspección
            </Typography>
            <Typography variant="body1">
              {area.lastInspection || "No registrada"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle2" color="text.secondary">
              Próxima Inspección
            </Typography>
            <Typography variant="body1">
              {area.nextInspection || "No programada"}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <DetailTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        type="area"
      />

      {activeTab === 0 && (
        <>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
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

export default AreaDetail; 