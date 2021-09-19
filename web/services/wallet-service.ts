import { Wallet } from "../models/wallet";
import { httpClient } from "./http";
import { identityService } from "./identity-service";

export class WalletService {
  async getWallet() {
    const userId = await identityService.getCurrentUserId();
    return httpClient
      .get<Wallet>(`wallet/${userId}`)
      .then((response) => response.data);
  }

  async getCredits() {
    return this.getWallet().then((response) => response.credits);
  }

  async rechargeCredits() {
    const userId = await identityService.getCurrentUserId();
    return httpClient
      .post<Wallet>(`wallet/${userId}/recharge`)
      .then((response) => response.data);
  }
}

export const walletService = new WalletService();
