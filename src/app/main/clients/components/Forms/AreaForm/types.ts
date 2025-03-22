import { Area } from "../../../types"

export interface AreaFormProps {
  open: boolean
  onClose: () => void
  onSave: (area: Area) => void
  area: Area | null
  isEditing: boolean
} 