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
import { AreaFormProps, FormAreaType } from "./types"
import { Area } from "../../types"
import TextFieldForm from "app/shared-components/Form/TextFieldForm/TextFieldForm"
import { useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { formSchema } from "./types"

const defaultValues: FormAreaType = {
  id: "",
  branchId: "",
  clientId: "",
  name: "",
  description: "",
}

export function AreaForm({ open, onClose, onSave, area, isEditing, branchId, clientId }: AreaFormProps) {
  const {
    control,
    handleSubmit,
    reset
  } = useForm<FormAreaType>({
    resolver: zodResolver(formSchema),
    defaultValues: area ? area : defaultValues
  })
  useEffect(() => {
    reset(area ? {
      id: area.id,
      branchId,
      clientId,
      name: area.name,
      description: area.description,
    } : { ...defaultValues, branchId, clientId })
    return () => {
      reset(defaultValues)
    }
  }, [area, branchId, clientId, reset])

  const onSubmit = (data: FormAreaType) => {
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
                required
                rows={3}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button type="submit" variant="contained" color="primary">
            {isEditing ? "Actualizar" : "Guardar"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
} 