async function main() {

    // TODO - UPDATE THESE WITH DEPLOYED ADDRESSES
    //==================================================================================================================

    const routerAddress = "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853";
    const usdcAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    const usdtAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";

    //==================================================================================================================

    // CONSTANTS

    const abiDecoder = require('abi-decoder');
    const txUtils = require('./tx-utils');
    const account = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
    const USDC_AMOUNT = "1000000000";   // $1,000 of USDC
    const SAFE_DEADLINE = 2639698709;
    const SWAP_PATH = [ usdcAddress, usdtAddress ]

    // CONTRACT FACTORIES

    const Router = await ethers.getContractFactory("UniswapV2Router02");
    const ERC20 = await ethers.getContractFactory("ERC20");
    const Pair = await ethers.getContractFactory("UniswapV2Pair");
    const Factory = await ethers.getContractFactory("UniswapV2Factory");
    const WETH = await ethers.getContractFactory("WETH");

    // ADD ABIS TO ABI DECODER

    abiDecoder.addABI(JSON.parse(Router.interface.format(ethers.utils.FormatTypes.json)));
    abiDecoder.addABI(JSON.parse(ERC20.interface.format(ethers.utils.FormatTypes.json)));
    abiDecoder.addABI(JSON.parse(Pair.interface.format(ethers.utils.FormatTypes.json)));
    abiDecoder.addABI(JSON.parse(Factory.interface.format(ethers.utils.FormatTypes.json)));
    abiDecoder.addABI(JSON.parse(WETH.interface.format(ethers.utils.FormatTypes.json)));

    // get deployed router contract instance

    const router = await Router.attach(
        routerAddress // The deployed contract address
    );

    // create deployed token contract instance

    const usdc = await ERC20.attach(
        usdcAddress // The deployed contract address
    );

    // approval transaction

    const usdcApprovalTx = await usdc.approve(
        routerAddress,
        USDC_AMOUNT
    );
    const usdcApprovalReceipt = await usdcApprovalTx.wait();
    console.log("\nUSDC Approval Transaction Receipt\n")
    txUtils.printReceipt(usdcApprovalReceipt, abiDecoder);

    // swap transaction

    const swapTx = await router.swapExactTokensForTokens(
        USDC_AMOUNT,
        0,
        SWAP_PATH,
        account,
        SAFE_DEADLINE,
    );
    const swapTxReceipt = await swapTx.wait();
    console.log("\nRouter swapExactETHForTokens Transaction Receipt\n")
    txUtils.printReceipt(swapTxReceipt, abiDecoder);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
