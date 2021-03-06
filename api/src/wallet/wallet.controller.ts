import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { WalletService } from "./wallet.service";

@Controller("wallet")
export class WalletController {
  constructor(private walletService: WalletService) {}
  @Get(":userId(\\d+)")
  getWallet(@Param("userId") userId: string) {
    return this.walletService.getOrCreateWallet(userId);
  }
  @Post(":userId(\\d+)/recharge")
  rechargeWallet(
    @Param("userId") userId: string,
    @Body("amount") amount: string
  ) {
    return this.walletService.recharge(userId, amount);
  }
}
