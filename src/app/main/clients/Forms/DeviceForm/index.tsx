import type React from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  MenuItem,
} from "@mui/material"
import { DeviceFormData, DeviceFormProps, deviceSchema } from "./types"
import { Device, StatusDevice, TypeDevice } from "../../types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import TextFieldForm from "app/shared-components/Form/TextFieldForm/TextFieldForm"
import { useEffect } from "react"


const defaultValues: DeviceFormData = {
  id: "",
  clientId: "",
  branchId: "",
  areaId: "",
  type: TypeDevice.CRAWLING,
  stationNumber: "",
  status: StatusDevice.ENABLED
}

export function DeviceForm({ open, onClose, onSave, device, isEditing, clientId, branchId, areaId }: DeviceFormProps) {
  const {
    control,
    handleSubmit,
    reset,
  } = useForm<DeviceFormData>({
    defaultValues,
    resolver: zodResolver(deviceSchema),
  })

  useEffect(() => {
    if (device) {
      reset({ ...device, clientId, branchId, areaId })
    } else {
      reset({ ...defaultValues, clientId, branchId, areaId })
    }
    return () => {
      reset(defaultValues)
    }
  }, [device])

  const onSubmit = (data: DeviceFormData) => {
    onSave(data)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{isEditing ? "Editar Dispositivo" : "Agregar Nuevo Dispositivo"}</DialogTitle>

      <DialogContent dividers>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextFieldForm<DeviceFormData>
                name="type"
                control={control}
                label="Tipo de Dispositivo"
                fullWidth
                select
                required
              >
                <MenuItem value={TypeDevice.CRAWLING}>Rastreros</MenuItem>
                <MenuItem value={TypeDevice.FLYERS}>Voladores</MenuItem>
                <MenuItem value={TypeDevice.RODENTS}>Roedores</MenuItem>
              </TextFieldForm>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextFieldForm<DeviceFormData>
                name="stationNumber"
                control={control}
                label="Número de Estación"
                fullWidth
                type="number"
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextFieldForm<DeviceFormData>
                name="status"
                control={control}
                label="Estado"
                fullWidth
                select
                required
              >
                <MenuItem value={StatusDevice.ENABLED}>Activo</MenuItem>
                <MenuItem value={StatusDevice.DISABLED}>Inactivo</MenuItem>
                <MenuItem value={StatusDevice.MAINTENANCE}>En mantenimiento</MenuItem>
              </TextFieldForm>
            </Grid>
          </Grid>
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit(onSubmit)} variant="contained" color="primary">
          {isEditing ? "Actualizar" : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  )
} 