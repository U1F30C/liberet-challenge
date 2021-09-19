import { Log } from "../models/log";
import { Service } from "../models/service";
import { httpClient } from "./http";
import { identityService } from "./identity-service";

export class LogsService {
  async getAllLogs() {
    const userId = await identityService.getCurrentUserId();
    return httpClient
      .get<Log[]>(`logs/${userId}`)
      .then((response) => response.data);
  }
}

export const logsService = new LogsService();
