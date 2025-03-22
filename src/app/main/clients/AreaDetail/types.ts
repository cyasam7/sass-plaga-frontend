import { Area } from "../types"

export interface AreaDetailProps {
  areaId: string
  onBack: () => void
  areas: Area[]
  branchName: string
} 