# Hardhat AMM Deploy

This project allows easy deployment of UniswapV2 contracts to any network.

Clone the repo and follow these easy steps to deploy an interactive instance of the Uniswap router in the local hardhat network.

Step 1 - Install dependencies
```
npm install
```

Step 2 - In a separate terminal session, start the hardhat local test network.
```
npx hardhat node
```

Alternatively - you can fork an existing network, given an archive HTTPS endpoint for JSON-RPC:
```
npx hardhat node --fork https://your_archive_node_endpoint
```

Note: Before running any deployment scripts, look at the 'TODO' items in each script and replace the values as required

Step 3 - Deploy core:
```
 npx hardhat run --network localhost scripts/1-deploy-uniswap-core.js
```

Step 4 - Update pair init code hash in contracts/uniswap-periphery/libraries/UniswapV2Library.sol.  The hash will be printed in the last line of output to the terminal from the previous step.  Copy this hash (omitting the '0x' prefix) and replace the hash on line 25 in UniswapV2Library.sol.

Step 5 - Update the factoryAddress variable in scripts/2-deploy-uniswap-periphery.js to the deployed address from Step 3.

Step 6 - Deploy periphery:
```
 npx hardhat run --network localhost scripts/2-deploy-uniswap-periphery.js
```

That's it! A clone of UniswapV2 has been deployed.  Note the deployed router address, and you can now use the swap / add / remove write functions.

To test the deployment you can run the following 2 scripts:
Note: You must update the router and token addresses in the scripts with those from the deployment steps.

```
 npx hardhat run --network localhost scripts/3-try-add-liquidity.js
 npx hardhat run --network localhost scripts/4-try-swap.js
```


