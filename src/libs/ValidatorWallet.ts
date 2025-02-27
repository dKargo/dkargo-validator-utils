import { ValidatorWallet__factory } from '@arbitrum/sdk/dist/lib/abi/factories/ValidatorWallet__factory';
import { ValidatorWallet as IValidatorWallet } from '@arbitrum/sdk/dist/lib/abi/ValidatorWallet';

import { SignerOrProvider } from '@arbitrum/sdk/dist/lib/dataEntities/signerOrProvider';
import { BigNumber, ethers, Overrides } from 'ethers';

export class ValidatorWallet {
    protected ValidatorWallet: IValidatorWallet;
  
    constructor(address: string, provider: SignerOrProvider) {
      this.ValidatorWallet = ValidatorWallet__factory.connect(address, provider);
    }
  
    async owner() {
        return await this.ValidatorWallet.owner();
    }

    async executeTransaction(target: string, calldata: string, amount: string) {
        return await this.ValidatorWallet.executeTransaction(calldata, target, amount) as ethers.providers.TransactionResponse;
    }
    
    async withdrawEth(amount:BigNumber, destination:string) {
        return await this.ValidatorWallet.withdrawEth(amount, destination);
    }
}
  