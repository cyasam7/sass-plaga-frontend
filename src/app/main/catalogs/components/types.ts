export interface IServiceType {
  id: string;
  name: string;
  description: string;
}

export interface IPestType {
  id: string;
  name: string;
  description: string;
}

export interface IProduct {
  id: string;
  name: string;
  chemicalName?: string;
  description: string;
  availableDoses?: Array<{
    amount: string;
    unit: string;
  }>;
}

export interface IApplicationType {
  id: string;
  name: string;
  description: string;
}
