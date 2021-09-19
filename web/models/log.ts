export interface Log {
  service: any;
  userId: string;
  serviceId: string;
  operation: "Consume" | "Start" | "Stop";
  cost: string;
}
