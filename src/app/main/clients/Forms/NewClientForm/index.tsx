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
import PhoneInputForm from "app/shared-components/Form/PhoneInputForm/PhoneInputForm"
import TextFieldForm from "app/shared-components/Form/TextFieldForm/TextFieldForm"

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
    formState: { errors, isSubmitting },
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

              <TextFieldForm
                control={control}
                name="type"
                label="Tipo de cliente"
                fullWidth
                size="small"
                disabled={isSubmitting}
                select
              >
                <MenuItem value="individual">Persona</MenuItem>
                <MenuItem value="business">Empresa</MenuItem>
              </TextFieldForm>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextFieldForm
                control={control}
                name="name"
                label={clientType === "business" ? "Nombre de la empresa" : "Nombre completo"}
                fullWidth
                size="small"
                disabled={isSubmitting}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextFieldForm
                control={control}
                name="email"
                label={"Correo electrónico"}
                fullWidth
                size="small"
                disabled={isSubmitting}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <PhoneInputForm
                name="phone"
                size='small'
                control={control}
                label="Teléfono"
                fullWidth
                disabled={isSubmitting}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextFieldForm
                control={control}
                name="address"
                label={"Dirección"}
                fullWidth
                size="small"
                disabled={isSubmitting}
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
                  <TextFieldForm
                    control={control}
                    name="contactPerson"
                    label={"Persona de contacto"}
                    fullWidth
                    size="small"
                    disabled={isSubmitting}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextFieldForm
                    control={control}
                    name="position"
                    label={"Cargo"}
                    fullWidth
                    size="small"
                    disabled={isSubmitting}
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