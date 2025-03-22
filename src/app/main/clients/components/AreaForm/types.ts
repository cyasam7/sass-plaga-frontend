export type RiskLevel = "high" | "medium" | "low"

export interface Area {
  id: string
  branchId: string
  name: string
  description?: string
  riskLevel: RiskLevel
  lastInspection?: string
  nextInspection?: string
}

export interface AreaFormProps {
  open: boolean
  onClose: () => void
  onSave: (area: Area) => void
  area: Area | null
  isEditing: boolean
} 