export type ClientType = 'business' | 'individual';

export interface BusinessDetails {
  contactPerson: string;
  position: string;
  employeeCount: number;
}

export interface Client {
  id: string;
  name: string;
  type: ClientType;
  email: string;
  phone: string;
  address: string;
  lastService?: string;
  nextService?: string;
  image?: string;
  businessDetails?: BusinessDetails;
}

export interface ClientListProps {
  onViewDetails: (clientId: string) => void;
} 