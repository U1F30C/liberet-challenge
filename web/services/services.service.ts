import { Service } from "../models/service";
import { httpClient } from "./http";
import { identityService } from "./identity-service";

export class ServicesService {
  getAllServices() {
    return httpClient
      .get<Service[]>("services")
      .then((response) => response.data);
  }

  async useService(serviceId: string) {
    const userId = await identityService.getCurrentUserId();
    return httpClient
      .post(`services/${serviceId}/consume/${userId}`)
      .then((response) => response.data);
  }

  async startService(serviceId: string) {
    const userId = await identityService.getCurrentUserId();
    return httpClient
      .post(`services/${serviceId}/start/${userId}`)
      .then((response) => response.data);
  }

  async stopService(serviceId: string) {
    const userId = await identityService.getCurrentUserId();
    return httpClient
      .post(`services/${serviceId}/stop/${userId}`)
      .then((response) => response.data);
  }
}

export const servicesService = new ServicesService();
