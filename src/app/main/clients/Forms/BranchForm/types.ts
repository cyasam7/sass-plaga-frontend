import { Branch } from "../../types"
import { z } from "zod"

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres",
  }),
  address: z.string().min(5, {
    message: "La dirección debe tener al menos 5 caracteres",
  }),
  contactPerson: z.string().min(2, {
    message: "La persona de contacto debe tener al menos 2 caracteres",
  }),
  contactPhone: z.string().min(8, {
    message: "El teléfono debe tener al menos 8 caracteres",
  }),
  notes: z.string().optional(),
})

export type FormBranchValues = z.infer<typeof formSchema>

export interface BranchFormProps {
  open: boolean
  onClose: () => void
  onSave: (branch: Branch) => void
  branch: Branch | null
  isEditing: boolean
} 