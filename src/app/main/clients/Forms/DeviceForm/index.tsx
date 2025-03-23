import type React from "react"
import { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"
import { DeviceFormProps } from "./types"
import { Device } from "../../types"

export function DeviceForm({ open, onClose, onSave, device, isEditing }: DeviceFormProps) {
  const [formData, setFormData] = useState<Device>({
    id: device?.id || "",
    areaId: device?.areaId || "",
    type: device?.type || "trap",
    code: device?.code || "",
    installDate: device?.installDate || "",
    status: device?.status || "active",
    notes: device?.notes || "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpiar error cuando el usuario escribe
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.code.trim()) {
      newErrors.code = "El código del dispositivo es obligatorio"
    }

    if (!formData.installDate.trim()) {
      newErrors.installDate = "La fecha de instalación es obligatoria"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData)
      onClose()
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{isEditing ? "Editar Dispositivo" : "Agregar Nuevo Dispositivo"}</DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Tipo de Dispositivo</InputLabel>
              <Select name="type" value={formData.type} label="Tipo de Dispositivo" onChange={handleSelectChange}>
                <MenuItem value="trap">Trampa</MenuItem>
                <MenuItem value="bait">Cebo</MenuItem>
                <MenuItem value="monitor">Monitor</MenuItem>
                <MenuItem value="other">Otro</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              name="code"
              label="Código"
              value={formData.code}
              onChange={handleChange}
              fullWidth
              error={!!errors.code}
              helperText={errors.code}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              name="installDate"
              label="Fecha de Instalación"
              type="date"
              value={formData.installDate}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={!!errors.installDate}
              helperText={errors.installDate}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Estado</InputLabel>
              <Select name="status" value={formData.status} label="Estado" onChange={handleSelectChange}>
                <MenuItem value="active">Activo</MenuItem>
                <MenuItem value="inactive">Inactivo</MenuItem>
                <MenuItem value="maintenance">En mantenimiento</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="notes"
              label="Notas"
              value={formData.notes}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained">
          {isEditing ? "Actualizar" : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  )
} 