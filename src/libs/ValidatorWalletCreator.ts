import { ValidatorWalletCreator__factory } from '@arbitrum/sdk/dist/lib/abi/factories/ValidatorWalletCreator__factory';
import { ValidatorWalletCreator as IValidatorWalletCreator } from '@arbitrum/sdk/dist/lib/abi/ValidatorWalletCreator';
import { SignerOrProvider } from '@arbitrum/sdk/dist/lib/dataEntities/signerOrProvider';
import { BigNumber, ethers, Overrides } from 'ethers';

export class ValidatorWalletCreator {
    protected ValidatorWalletCreator: IValidatorWalletCreator;
  
    constructor(address: string, provider: SignerOrProvider) {
      this.ValidatorWalletCreator = ValidatorWalletCreator__factory.connect(address, provider);
    }
    
    async createWallet() {
        return await this.ValidatorWalletCreator.createWallet([]);
    }
}
  