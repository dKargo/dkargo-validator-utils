import { ValidatorWalletCreator } from "../src/index";
import { init, walletCreator } from './common/init';


async function main() {
    const { wallet: l2Wallet } = init('L2');

    const walletcreator = new ValidatorWalletCreator(walletCreator, l2Wallet);
    
    const res = await walletcreator.createWallet();

    const receipt = await res.wait();
    
    console.log(receipt.transactionHash);

    const address = "0x" + receipt.logs[7].topics[1].slice(26, 66)
    console.log(`wallet address: ${address}\n`);
}

(async () => {
    await main();
    process.exit(0);
  })();
  