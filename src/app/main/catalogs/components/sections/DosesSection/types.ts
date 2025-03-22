export interface Dose {
  amount: string
  unit: string
}

export interface DosesSectionProps {
  doses: Dose[]
  onAddDose: (dose: Dose) => void
  onEditDose: (index: number, dose: Dose) => void
  onDeleteDose: (index: number) => void
} 