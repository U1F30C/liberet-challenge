import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ModelCtor } from "sequelize-typescript";
import { Wallet } from "./wallet.model";

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet)
    private walletModel: ModelCtor<Wallet>
  ) {}

  async getOrCreateWallet(userId: string) {
    let wallet = await this.walletModel.findOne({ where: { userId } });
    if (!wallet) {
      wallet = await this.walletModel.create({ userId, credits: "0" });
    }
    return wallet;
  }

  async recharge(userId: string, amount: string) {
    if (parseFloat(amount) < 0) {
      throw new BadRequestException("CannotRechargeNegativeNumbers");
    }
    const wallet = await this.getOrCreateWallet(userId);
    return wallet.increment({ credits: amount });
  }

  async decrease(userId: string, amount: string) {
    // if (parseFloat(amount) < 0) {
    //   throw new BadRequestException("CannotDecreaseByNegativeNumbers");
    // }
    const wallet = await this.getOrCreateWallet(userId);
    if (parseFloat(wallet.credits) >= parseFloat(amount))
      return wallet.decrement({ credits: amount });
  }
}
