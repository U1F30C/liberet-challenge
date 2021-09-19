export enum ServiceType {
  Immediate = "Immediate",
  Enableable = "Enableable",
}

export interface Service {
  activeServices: { userId: string; serviceId: string }[];
  id: string;
  name: string;
  cost: string;
  serviceType: ServiceType;
}
