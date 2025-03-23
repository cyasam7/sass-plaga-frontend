import { z } from 'zod';

export const formSchema = z.object({
  id: z.string().optional(),
  clientId: z.string(),
  branchId: z.string(),
  name: z.string().min(2, {
    message: 'El nombre debe tener al menos 2 caracteres'
  }),
  description: z.string().min(2, {
    message: 'La descripción debe tener al menos 2 caracteres'
  })
});

export type FormAreaType = z.infer<typeof formSchema>;

export interface AreaFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (area: FormAreaType) => void;
  area?: FormAreaType;
  isEditing?: boolean;
  clientId: string;
  branchId: string;
}
