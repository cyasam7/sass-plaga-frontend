export interface Client {
  id: string
  name: string
  type: "business" | "individual"
  email: string
  phone: string
  address: string
  lastService?: string
  nextService?: string
  image?: string
  businessDetails?: {
    contactPerson: string
    position: string
    employeeCount: number
  }
}

export interface Branch {
  id: string
  clientId: string
  name: string
  address: string
  contactPerson: string
  contactPhone: string
  notes?: string
}

export interface ClientDetailProps {
  clientId: string
  onBack: () => void
} 