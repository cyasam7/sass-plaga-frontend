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
} from "@mui/material"
import {
  ArrowBack,
  Add,
  Edit,
  Delete,
  BugReport,
} from "@mui/icons-material"
import { Area, Device } from "../types"
import { DeviceCard } from "../Cards/DeviceCard"
import { DeviceForm } from "../Forms/DeviceForm"
import { useNavigate, useParams } from "react-router"
import { AreaService } from "src/app/shared/services/AreaService"
import { useQuery } from "react-query"
import AreaHeader from './AreaHeader'
import DeviceList from './DeviceList'
import PageHeader from '../PageHeader'
import { openDialog } from "app/shared-components/GlobalDialog/openDialog"

// Datos de ejemplo para dispositivos


export function AreaDetail() {
  const navigate = useNavigate()
  const { areaId, branchId } = useParams()

  const { data: area, isLoading: isLoadingArea } = useQuery({
    queryKey: ["area", areaId],
    queryFn: () => AreaService.getById(areaId)
  })

  const devices = []

  const [showDeviceForm, setShowDeviceForm] = useState(false)
  const [currentDevice, setCurrentDevice] = useState<Device | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null)
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null)


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
    openDialog({
      title: "Eliminar Dispositivo",
      text: "¿Estás seguro de querer eliminar este dispositivo?",
      onAccept: () => {

        handleMenuClose()
      }
    })
  }


  const handleSaveDevice = (device: Device) => {
    const newDevice = {
      ...device,
      id: `${devices.length + 1}`, // En una aplicación real, esto vendría del backend
      areaId: area.id,
    }
    console.log(newDevice);
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

  return (
    <Box>
      <PageHeader
        title="Detalle del Área"
        onBack={() => navigate(-1)}
        breadcrumbs={[
          { label: "Clientes", onClick: () => navigate("/clients") },
          { label: "Sucursal", onClick: () => navigate(`/clients/${branchId}/branches/${branchId}`) },
          { label: "Áreas", onClick: () => navigate(`/clients/${branchId}/branches/${branchId}/areas`) },
          { label: "Detalle del Área", onClick: () => navigate(`/clients/${branchId}/branches/${branchId}/areas/${areaId}`) }
        ]}
      />

      <AreaHeader area={area} isLoading={isLoadingArea} />


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

        <DeviceList
          devices={devices}
          onMenuClick={handleMenuClick}
          isLoading={isLoadingArea}
        />
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


      <DeviceForm
        device={currentDevice}
        onSave={handleSaveDevice}
        onClose={() => {
          setShowDeviceForm(false)
        }}
        open={showDeviceForm}
        isEditing={isEditing}
      />
    </Box>
  )
}

export default AreaDetail; 