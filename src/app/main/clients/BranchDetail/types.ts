import { Branch } from "../types"

export interface BranchDetailProps {
  branchId: string
  onBack: () => void
  branches: Branch[]
} 