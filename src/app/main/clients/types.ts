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
}

export type ClientType = "business" | "individual"

export interface BusinessDetails {
  contactPerson: string
  position: string
}

export interface Client {
  id: string
  name: string
  type: ClientType
  email?: string
  phone: string
  address: string
  businessDetails?: BusinessDetails
}

export interface Device {
  id: string;
  type: string;
  code: string;
  areaId: string;
  status: string;
  installDate: string;
  notes?: string;
}
