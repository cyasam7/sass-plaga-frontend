export interface Branch {
  id: string
  clientId: string
  name: string
  address: string
  contactPerson: string
  contactPhone: string
  notes?: string
}

export interface BranchFormProps {
  open: boolean
  onClose: () => void
  onSave: (branch: Branch) => void
  branch: Branch | null
  isEditing: boolean
} 