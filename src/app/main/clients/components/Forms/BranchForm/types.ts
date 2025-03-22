import { Branch } from "../../../types"


export interface BranchFormProps {
  open: boolean
  onClose: () => void
  onSave: (branch: Branch) => void
  branch: Branch | null
  isEditing: boolean
} 