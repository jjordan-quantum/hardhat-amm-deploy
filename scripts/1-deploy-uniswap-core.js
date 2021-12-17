async function main() {

    // TODO - replace this if deploying from an account other than the standard hardhat signor
    const account = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

    // deploy factory

    const Factory = await ethers.getContractFactory("UniswapV2Factory");
    const factory = await Factory.deploy(account);
    console.log("Factory deployed to:", factory.address);

    // deploy tokens

    const USDC = await ethers.getContractFactory("ERC20");
    const usdc = await USDC.deploy(
        "US Dollar Coin",
        "USDC",
        6,
        '1000000000000000000000000'
    );
    console.log("USDC deployed to:", usdc.address);

    const WBTC = await ethers.getContractFactory("ERC20");
    const wbtc = await WBTC.deploy(
        "Wrapped Bitcoin",
        "WBTC",
        18,
        '1000000000000000000000000'
    );
    console.log("WBTC deployed to:", wbtc.address);

    const USDT = await ethers.getContractFactory("ERC20");
    const usdt = await USDT.deploy(
        "Tether USD",
        "USDT",
        18,
        '1000000000000000000000000'
    );
    console.log("USDT deployed to:", usdt.address);

    const DAI = await ethers.getContractFactory("ERC20");
    const dai = await DAI.deploy(
        "DAI Stablecoin",
        "DAI",
        18,
        '1000000000000000000000000'
    );
    console.log("DAI deployed to:", dai.address);

    const tx = await factory.createPair(usdc.address, usdt.address);
    const receipt = await tx.wait();

    const util = require("util");
    console.log(util.inspect(receipt, false, null, true));

    const pairCodeHash = await factory.pairCodeHash();
    console.log("Pair Code Hash: " + pairCodeHash);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
