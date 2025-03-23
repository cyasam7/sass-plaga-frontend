"use client"

import type React from "react"
import { useForm } from "react-hook-form"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
} from "@mui/material"
import { AreaFormProps } from "./types"
import { Area } from "../../types"
import TextFieldForm from "app/shared-components/Form/TextFieldForm/TextFieldForm"
import { useEffect } from "react"

const defaultValues: Area = {
  id: "",
  branchId: "",
  name: "",
  description: "",
}

export function AreaForm({ open, onClose, onSave, area, isEditing }: AreaFormProps) {
  const {
    control,
    handleSubmit,
    reset
  } = useForm<Area>({
    defaultValues: area ? area : defaultValues
  })

  useEffect(() => {
    reset(area ? area : defaultValues)
    return () => {
      reset(defaultValues)
    }
  }, [area])

  const onSubmit = (data: Area) => {
    onSave(data)
    onClose()
    reset()
  }

  const handleClose = () => {
    reset(defaultValues)
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>{isEditing ? "Editar Área" : "Agregar Nueva Área"}</DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextFieldForm
                name="name"
                control={control}
                label="Nombre del Área"
                fullWidth
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextFieldForm
                name="description"
                control={control}
                label="Descripción"
                fullWidth
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit" variant="contained">
            {isEditing ? "Actualizar" : "Guardar"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
} 