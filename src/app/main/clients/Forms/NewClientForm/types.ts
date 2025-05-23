import { z } from "zod"

export const formSchema = z.object({
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
  // Campos específicos para empresas
  contactPerson: z.string().optional(),
  position: z.string().optional(),
})

export type FormClientValues = z.infer<typeof formSchema>

export interface NewClientFormProps {
  open: boolean
  onClose: () => void
  onSubmit?: (data: FormClientValues) => void
  defaultValues?: Partial<FormClientValues>
} 