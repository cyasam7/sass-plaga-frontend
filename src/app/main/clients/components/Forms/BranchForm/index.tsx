import type React from "react"
import { useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Grid } from "@mui/material"
import { BranchFormProps } from "./types"
import { Branch } from "../../../types"

export function BranchForm({ open, onClose, onSave, branch, isEditing }: BranchFormProps) {
  const [formData, setFormData] = useState<Branch>({
    id: branch?.id || "",
    clientId: branch?.clientId || "",
    name: branch?.name || "",
    address: branch?.address || "",
    contactPerson: branch?.contactPerson || "",
    contactPhone: branch?.contactPhone || "",
    notes: branch?.notes || "",
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "El nombre de la sucursal es obligatorio"
    }

    if (!formData.address.trim()) {
      newErrors.address = "La dirección es obligatoria"
    }

    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = "La persona de contacto es obligatoria"
    }

    if (!formData.contactPhone.trim()) {
      newErrors.contactPhone = "El teléfono de contacto es obligatorio"
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
      <DialogTitle>{isEditing ? "Editar Sucursal" : "Agregar Nueva Sucursal"}</DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Nombre de la Sucursal"
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
              name="address"
              label="Dirección"
              value={formData.address}
              onChange={handleChange}
              fullWidth
              error={!!errors.address}
              helperText={errors.address}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              name="contactPerson"
              label="Persona de Contacto"
              value={formData.contactPerson}
              onChange={handleChange}
              fullWidth
              error={!!errors.contactPerson}
              helperText={errors.contactPerson}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              name="contactPhone"
              label="Teléfono de Contacto"
              value={formData.contactPhone}
              onChange={handleChange}
              fullWidth
              error={!!errors.contactPhone}
              helperText={errors.contactPhone}
              required
            />
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