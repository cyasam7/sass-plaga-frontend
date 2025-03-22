"use client"

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

interface Area {
  id: string
  branchId: string
  name: string
  description?: string
  riskLevel: "high" | "medium" | "low"
  lastInspection?: string
  nextInspection?: string
}

interface AreaFormProps {
  open: boolean
  onClose: () => void
  onSave: (area: Area) => void
  area: Area | null
  isEditing: boolean
}

export function AreaForm({ open, onClose, onSave, area, isEditing }: AreaFormProps) {
  const [formData, setFormData] = useState<Area>({
    id: area?.id || "",
    branchId: area?.branchId || "",
    name: area?.name || "",
    description: area?.description || "",
    riskLevel: area?.riskLevel || "medium",
    lastInspection: area?.lastInspection || "",
    nextInspection: area?.nextInspection || "",
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

    if (!formData.name.trim()) {
      newErrors.name = "El nombre del área es obligatorio"
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
      <DialogTitle>{isEditing ? "Editar Área" : "Agregar Nueva Área"}</DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Nombre del Área"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              error={!!errors.name}
              helperText={errors.name}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="description"
              label="Descripción"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={2}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Nivel de Riesgo</InputLabel>
              <Select name="riskLevel" value={formData.riskLevel} label="Nivel de Riesgo" onChange={handleSelectChange}>
                <MenuItem value="low">Bajo</MenuItem>
                <MenuItem value="medium">Medio</MenuItem>
                <MenuItem value="high">Alto</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              name="lastInspection"
              label="Última Inspección"
              type="date"
              value={formData.lastInspection}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              name="nextInspection"
              label="Próxima Inspección"
              type="date"
              value={formData.nextInspection}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
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

