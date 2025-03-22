import { Branch } from "../components/Forms/BranchForm/types"

export interface BranchDetailProps {
  branchId: string
  onBack: () => void
  branches: Branch[]
} 