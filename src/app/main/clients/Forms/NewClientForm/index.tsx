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
  Typography,
  Divider,
  FormHelperText,
} from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormClientValues, NewClientFormProps, formSchema } from "./types"
import { useEffect } from "react"

const resetValues: FormClientValues = {
  type: "individual",
  name: "",
  email: "",
  phone: "",
  address: "",
  contactPerson: "",
  position: "",
}


export function NewClientForm({ open, onClose, onSubmit, defaultValues }: NewClientFormProps) {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormClientValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || resetValues,
  })

  useEffect(() => {
    if (open) {
      reset(defaultValues || resetValues)
    }
  }, [defaultValues, open, reset])

  const clientType = watch("type")

  function onFormSubmit(data: FormClientValues) {
    if (onSubmit) {
      onSubmit(data)
    }
    reset(resetValues)
  }

  const handleClose = () => {
    reset(resetValues)
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md" scroll="paper">
      <DialogTitle>
        <Typography variant="h6">{defaultValues ? "Editar cliente" : "Agregar nuevo cliente"}</Typography>
        <Typography variant="body2" color="text.secondary">
          {defaultValues
            ? "Modifique los campos para actualizar la información del cliente."
            : "Complete los campos para registrar un nuevo cliente en el sistema."
          }
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <form id="new-client-form" onSubmit={handleSubmit(onFormSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.type}>
                    <InputLabel>Tipo de cliente</InputLabel>
                    <Select {...field} label="Tipo de cliente">
                      <MenuItem value="individual">Persona</MenuItem>
                      <MenuItem value="business">Empresa</MenuItem>
                    </Select>
                    {errors.type && <FormHelperText>{errors.type.message}</FormHelperText>}
                  </FormControl>
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label={clientType === "business" ? "Nombre de la empresa" : "Nombre completo"}
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Correo electrónico"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Teléfono"
                    fullWidth
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Dirección"
                    fullWidth
                    error={!!errors.address}
                    helperText={errors.address?.message}
                  />
                )}
              />
            </Grid>

            {clientType === "business" && (
              <>
                <Grid item xs={12}>
                  <Divider>
                    <Typography variant="body2" color="text.secondary">
                      Información empresarial
                    </Typography>
                  </Divider>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name="contactPerson"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Persona de contacto"
                        fullWidth
                        error={!!errors.contactPerson}
                        helperText={errors.contactPerson?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Controller
                    name="position"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Cargo"
                        fullWidth
                        error={!!errors.position}
                        helperText={errors.position?.message}
                      />
                    )}
                  />
                </Grid>
              </>
            )}
          </Grid>
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button
          type="submit"
          form="new-client-form"
          variant="contained"
          color="primary"
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  )
} 