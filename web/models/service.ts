export enum ServiceType {
  Immediate = "Immediate",
  Enableable = "Enableable",
}

export interface Service {
  id: string;
  name: string;
  cost: string;
  serviceType: ServiceType;
}
