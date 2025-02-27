import dotenv from 'dotenv';
dotenv.config();

import { Wallet, ethers } from 'ethers';

export const rollupContract = process.env.ROLLUP_CONTRACT ? process.env.ROLLUP_CONTRACT : '';
export const validatorContract = process.env.VALIDATOR_WALLET  ? process.env.VALIDATOR_WALLET : '';
export const walletCreator = process.env.WALLET_CREATOR  ? process.env.WALLET_CREATOR : '';

export type IChainName = 'L2';
export const init = (chain: IChainName) => {
  const providers = {
    L2: new ethers.providers.JsonRpcProvider(process.env.L2_URL),
  };

  const wallet = process.env.SIGNER_PK_KEY ? new Wallet(process.env.SIGNER_PK_KEY) : Wallet.createRandom();
  const wallets = {
    L2: wallet.connect(providers['L2']),
  };

  return {
    provider: providers[chain],
    wallet: wallets[chain],
  };
};
