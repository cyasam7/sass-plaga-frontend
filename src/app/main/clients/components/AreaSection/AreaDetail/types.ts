export interface Area {
  id: string
  branchId: string
  name: string
  description?: string
  riskLevel: "high" | "medium" | "low"
  lastInspection?: string
  nextInspection?: string
}

export interface Device {
  id: string
  areaId: string
  type: "trap" | "bait" | "monitor" | "other"
  code: string
  location: string
  installDate: string
  lastCheck?: string
  nextCheck?: string
  status: "active" | "inactive" | "maintenance"
  notes?: string
}

export interface AreaDetailProps {
  areaId: string
  onBack: () => void
  areas: Area[]
  branchName: string
} 