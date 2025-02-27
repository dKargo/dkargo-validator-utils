import { RollupCore__factory } from '@arbitrum/sdk/dist/lib/abi/factories/RollupCore__factory';
import { RollupCore as IRollupCore } from '@arbitrum/sdk/dist/lib/abi/RollupCore';
import { RollupAdminLogic__factory } from '@arbitrum/sdk/dist/lib/abi/factories/RollupAdminLogic__factory';
import { RollupAdminLogic as IRollupAdminLogic } from '@arbitrum/sdk/dist/lib/abi/RollupAdminLogic';
import { RollupUserLogic__factory } from '@arbitrum/sdk/dist/lib/abi/factories/RollupUserLogic__factory';
import { RollupUserLogic as IRollupUserLogic } from '@arbitrum/sdk/dist/lib/abi/RollupUserLogic';

import { SignerOrProvider } from '@arbitrum/sdk/dist/lib/dataEntities/signerOrProvider';
import { BigNumber, Overrides } from 'ethers';
import { ValidatorWallet } from './ValidatorWallet';

class RollupCore {
  protected RollupCore: IRollupCore;

  constructor(address: string, provider: SignerOrProvider) {
    this.RollupCore = RollupCore__factory.connect(address, provider)
  }

  async getSequencerInboxAddress() {
    return await this.RollupCore.sequencerInbox();
  }

  async baseStake() {
    return await this.RollupCore.baseStake();
  }

  async wasmModuleRoot() {
    return await this.RollupCore.wasmModuleRoot();
  }

  async confirmPeriodBlocks() {
    return await this.RollupCore.confirmPeriodBlocks();
  }

  async extraChallengeTimeBlocks() {
    return await this.RollupCore.extraChallengeTimeBlocks();
  }

  async loserStakeEscrow() {
    return await this.RollupCore.loserStakeEscrow();
  }

  async minimumAssertionPeriod() {
    return await this.RollupCore.minimumAssertionPeriod();
  }

  async stakeToken() {
    return await this.RollupCore.stakeToken();
  }

  async isValidator(_validator: string) {
    return await this.RollupCore.isValidator(_validator);
  }

  async validatorWhitelistDisabled() {
    return await this.RollupCore.validatorWhitelistDisabled();
  }
}

export class RollupUserLogic extends RollupCore {
  protected RollupUserLogic: IRollupUserLogic;

  constructor(address: string, provider: SignerOrProvider) {
    super(address, provider);
    this.RollupUserLogic = RollupUserLogic__factory.connect(address, provider);
  }

  async owner() {
    return await this.RollupUserLogic.owner();
  }

  async currentRequiredStake() {
      return await this.RollupUserLogic.currentRequiredStake();
  }
  
  async requireUnresolvedExists() {
    return await this.RollupUserLogic.requireUnresolvedExists();
}

  async withdrawStakerFunds() {
    return await this.RollupUserLogic.withdrawStakerFunds();
  }
}

export class RollupUserLogicWallet extends RollupUserLogic {
  private ValidatorWallet: ValidatorWallet;

  constructor(RollupUserLogic: string, wallet: string, provider: SignerOrProvider) {
    super(RollupUserLogic, provider);
    this.ValidatorWallet = new ValidatorWallet(wallet, provider);
  }

  async #_executeTransaction(target: string, calldata: string, amount: string) {
    return await this.ValidatorWallet.executeTransaction(target, calldata, amount);
  }

  async returnOldDeposit(stakerAddress: string, overrides?: Overrides) {
    const calldata = this.RollupUserLogic.interface.encodeFunctionData('returnOldDeposit', [stakerAddress]);
    return await this.#_executeTransaction(this.RollupUserLogic.address, calldata, '0');
  }

  async withdrawStakerFunds(overrides?: Overrides) {
    const calldata = this.RollupUserLogic.interface.encodeFunctionData('withdrawStakerFunds');
    return await this.#_executeTransaction(this.RollupUserLogic.address, calldata, '0');
  }
}
