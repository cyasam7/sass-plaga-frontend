export interface Branch {
  id: string;
  clientId: string;
  name: string;
  address: string;
  contactPerson: string;
  contactPhone: string;
  contactEmail?: string;
  schedule?: string;
  description?: string;
  area?: number;
  notes?: string;
}

export interface Area {
  id: string;
  branchId: string;
  clientId: string;
  name: string;
  description?: string;
}

export type ClientType = 'business' | 'individual';

export interface BusinessDetails {
  contactPerson: string;
  position: string;
}

export interface Client {
  id: string;
  name: string;
  type: ClientType;
  email?: string;
  phone: string;
  address: string;
  businessDetails?: BusinessDetails;
}

export interface Device {
  id: string;
  type: string;
  code: string;
  areaId: string;
  clientId: string;
  branchId: string;
  status: string;
  installDate: string;
  notes?: string;
}
