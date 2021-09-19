import { Controller, Get, Param } from "@nestjs/common";
import { WalletService } from "./wallet.service";

@Controller("wallet")
export class WalletController {
  constructor(private walletService: WalletService) {}
  @Get(":userId(\\d+)")
  getWallet(@Param("userId") userId: string) {
    return this.walletService.getOrCreateWallet(userId);
  }
}
