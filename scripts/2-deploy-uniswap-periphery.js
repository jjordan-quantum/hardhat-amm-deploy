async function main() {

    // TODO - replace the address below with the address of the deployed UniswapV2Factory contract
    const factoryAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

    // deploy weth

    const WETH = await ethers.getContractFactory("WETH");
    const weth = await WETH.deploy();
    console.log("WETH deployed to:", weth.address);

    // deploy router

    const Router = await ethers.getContractFactory("UniswapV2Router02");
    const router = await Router.deploy(
        factoryAddress,
        weth.address
    );
    console.log("Router deployed to:", router.address);

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
