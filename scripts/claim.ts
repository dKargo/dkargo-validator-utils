import { RollupUserLogicWallet, ValidatorWallet } from "../src/index";
import { init, rollupContract, validatorContract } from './common/init';


async function main() {
    const { provider:l2Provider, wallet: l2Wallet } = init('L2');

    const rollup = new RollupUserLogicWallet(rollupContract, validatorContract, l2Wallet);
    const res = await rollup.withdrawStakerFunds();

    const withdrawReceipt = await res.wait();
    
    console.log(withdrawReceipt.transactionHash)

    const walletContract = new ValidatorWallet(validatorContract, l2Wallet);
    const balance = await l2Provider.getBalance(validatorContract)
    const withdrawReq = await walletContract.withdrawEth(
        balance, l2Wallet.address
    );
    
    const ethReceipt = await withdrawReq.wait();
    
    console.log(ethReceipt.transactionHash)
}

(async () => {
    await main();
    process.exit(0);
})();
  