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

export type ClientType = "business" | "individual"

export interface BusinessDetails {
  contactPerson: string
  position: string
  employeeCount: number
}

export interface Client {
  id: string
  name: string
  type: ClientType
  email: string
  phone: string
  address: string
  image?: string
  lastService: string
  nextService: string
  businessDetails?: BusinessDetails
}


