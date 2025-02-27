import { RollupUserLogicWallet } from "../src/libs/Rollup";
import { init, rollupContract, validatorContract } from './common/init';


async function main() {
    const { wallet: l2Wallet } = init('L2');

    const rollup = new RollupUserLogicWallet(rollupContract, validatorContract, l2Wallet);

    const res = await rollup.returnOldDeposit(validatorContract);

    const receipt = await res.wait();
    
    console.log(receipt.transactionHash)
}

(async () => {
    await main();
    process.exit(0);
  })();
  