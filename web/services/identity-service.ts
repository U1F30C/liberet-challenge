import { User } from "../models/user";

export class IdentityService {
  async getCurrentUserId() {
    return this.getCurrentUser().then((user) => user.id);
  }
  async getCurrentUser(): Promise<Partial<User>> {
    return { id: 1 };
  }
}

export const identityService = new IdentityService();
