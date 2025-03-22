export interface Branch {
  id: string
  clientId: string
  name: string
  address: string
  contactPerson: string
  contactPhone: string
  notes?: string
}

export interface Area {
  id: string
  branchId: string
  name: string
  description?: string
  riskLevel: "high" | "medium" | "low"
  lastInspection?: string
  nextInspection?: string
}

export interface BranchDetailProps {
  branchId: string
  onBack: () => void
  branches: Branch[]
} 