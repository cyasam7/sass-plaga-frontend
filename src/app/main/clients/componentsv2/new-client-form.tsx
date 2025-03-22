"use client"
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
import { z } from "zod"

// Modificar el esquema para aceptar strings de fecha
const formSchema = z.object({
  type: z.enum(["business", "individual"], {
    required_error: "Seleccione el tipo de cliente",
  }),
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres",
  }),
  email: z.string().email({
    message: "Ingrese un correo electrónico válido",
  }),
  phone: z.string().min(8, {
    message: "Ingrese un número de teléfono válido",
  }),
  address: z.string().min(5, {
    message: "Ingrese una dirección válida",
  }),
  lastService: z.string().optional(),
  nextService: z.string().optional(),
  // Campos específicos para empresas
  contactPerson: z.string().optional(),
  position: z.string().optional(),
  employeeCount: z.string().optional(),
  notes: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface NewClientFormProps {
  open: boolean
  onClose: () => void
  onSubmit?: (data: FormValues) => void
}

export function NewClientForm({ open, onClose, onSubmit }: NewClientFormProps) {
  // Inicializar el formulario con valores predeterminados
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "individual",
      name: "",
      email: "",
      phone: "",
      address: "",
      lastService: "",
      nextService: "",
      notes: "",
    },
  })

  const clientType = watch("type")

  // Función para manejar el envío del formulario
  function onFormSubmit(data: FormValues) {
    console.log("Datos del formulario:", data)
    if (onSubmit) {
      onSubmit(data)
    }
    reset()
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md" scroll="paper">
      <DialogTitle>
        <Typography variant="h6">Agregar nuevo cliente</Typography>
        <Typography variant="body2" color="text.secondary">
          Complete los campos para registrar un nuevo cliente en el sistema.
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

                <Grid item xs={12} md={6}>
                  <Controller
                    name="employeeCount"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Número de empleados"
                        type="number"
                        fullWidth
                        error={!!errors.employeeCount}
                        helperText={errors.employeeCount?.message}
                      />
                    )}
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <Divider>
                <Typography variant="body2" color="text.secondary">
                  Información de servicio
                </Typography>
              </Divider>
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="lastService"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Último servicio"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.lastService}
                    helperText={errors.lastService?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Controller
                name="nextService"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Próximo servicio"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.nextService}
                    helperText={errors.nextService?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Notas adicionales"
                    fullWidth
                    multiline
                    rows={4}
                    error={!!errors.notes}
                    helperText={errors.notes?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Cancelar
        </Button>
        <Button type="submit" form="new-client-form" variant="contained">
          Guardar cliente
        </Button>
      </DialogActions>
    </Dialog>
  )
}

