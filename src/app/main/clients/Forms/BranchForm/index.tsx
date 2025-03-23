import type React from "react"
import { useEffect } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Typography } from "@mui/material"
import { BranchFormProps, FormBranchValues, formSchema } from "./types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import TextFieldForm from "src/app/shared-components/Form/TextFieldForm/TextFieldForm"

const defaultValues: FormBranchValues = {
  id: "",
  clientId: "",
  name: "",
  address: "",
  contactPerson: "",
  contactPhone: "",
  notes: "",
}

export function BranchForm({ open, onClose, onSave, branch, isEditing, clientId }: BranchFormProps) {
  const {
    control,
    handleSubmit,
    reset,
  } = useForm<FormBranchValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })



  useEffect(() => {
    if (open) {
      reset(
        branch
          ? {
            id: branch.id,
            name: branch.name,
            address: branch.address,
            contactPerson: branch.contactPerson,
            contactPhone: branch.contactPhone,
            notes: branch.notes || "",
            clientId: clientId,
          }
          : { ...defaultValues, clientId }
      )
    }
    return () => {
      reset(defaultValues)
    }
  }, [branch, open, reset, clientId])

  function onFormSubmit(data: FormBranchValues) {
    const branchData = {
      id: data?.id || "",
      clientId: clientId,
      name: data.name,
      address: data.address,
      contactPerson: data.contactPerson,
      contactPhone: data.contactPhone,
      notes: data.notes || "",
    }
    onSave(branchData)
    reset(defaultValues)
  }

  const handleClose = () => {
    reset(defaultValues)
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Typography variant="h6">{isEditing ? "Editar Sucursal" : "Agregar Nueva Sucursal"}</Typography>
        <Typography variant="body2" color="text.secondary">
          {isEditing
            ? "Modifique los campos para actualizar la información de la sucursal."
            : "Complete los campos para registrar una nueva sucursal en el sistema."
          }
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <form id="branch-form" onSubmit={handleSubmit(onFormSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextFieldForm<FormBranchValues>
                name="name"
                control={control}
                label="Nombre de la Sucursal"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextFieldForm<FormBranchValues>
                name="address"
                control={control}
                label="Dirección"
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextFieldForm<FormBranchValues>
                name="contactPerson"
                control={control}
                label="Persona de Contacto"
                fullWidth
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextFieldForm<FormBranchValues>
                name="contactPhone"
                control={control}
                label="Teléfono de Contacto"
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextFieldForm<FormBranchValues>
                name="notes"
                control={control}
                label="Notas"
                fullWidth
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button
          type="submit"
          form="branch-form"
          variant="contained"
          color="primary"
        >
          {isEditing ? "Actualizar" : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  )
} 