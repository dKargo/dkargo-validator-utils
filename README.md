# Validator Utils

### Environment Configuration
To execute these functionalities, you need to add the following information to the .env file.
ROLLUP_CONTRACT and WALLET_CREATOR are system contract addresses deployed on L2.
If you do not have a VALIDATOR_WALLET, follow the procedure below to create one and add it to the environment file.
```text
#chain info
L2_URL=

#contract info
VALIDATOR_WALLET=
ROLLUP_CONTRACT=
WALLET_CREATOR= 

#user info
SIGNER_PK_KEY=
```
> [주의사항] If a single SIGNER_PK_KEY holds multiple VALIDATOR_WALLETs, you cannot run the node using that key.

### Creating a Wallet Contract
If you do not have a wallet, execute the following script to create one:
```ts
npm run createWallet
```
When executed, the following output will be displayed:
```ts
> nw-validator-utils@1.0.0 createWallet
> ts-node ./scripts/createWallet.ts

0x53dc203b7adb6893827fdc56d05887f111ad2b11153935b7067808a3f0812a4d
wallet address: 0x60a8a67ad1f2475f85504a3991f2fc88b65a5563
```
Add the generated wallet address to the VALIDATOR_WALLET field in the environment file.

### Unstake ETH
This function allows you to withdraw the staked ETH used while operating the validator node.
To perform this action, the node must be stopped until the staked RBlock is confirmed.
```ts
npm run unstake
```
When executed, the following output will be displayed:
```text
> nw-validator-utils@1.0.0 unstake
> ts-node ./scripts/unstake.ts

0x244ea328ba40491c067d30a33ed443325f96f0e4cbeae16e4b820cf412e4db2c
```

### Claim ETH
This function allows you to withdraw the unstaked ETH from the rollup contract.
The process involves sequentially withdrawing funds from the rollup contract to the validator wallet, and then to the EOA.
```ts
npm run claim
```
When executed, the following output will be displayed:
```text
> nw-validator-utils@1.0.0 claim
> ts-node ./scripts/claim.ts

0xa5bf937ef29a1740cac97e66e26a1077518c2ef07a973bb5f6ed1389cba2896b
0x15acc16432e9d433121827e650115f237eee296489fe8f3a7e2e6a1a007f0e22
```