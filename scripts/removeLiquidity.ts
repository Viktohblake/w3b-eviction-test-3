import { ethers } from "hardhat";
const helpers = require("@nomicfoundation/hardhat-network-helpers");

const main = async () => {
    const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

    const UNIRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

    const USDCHolder = "0xf584f8728b874a6a5c7a8d4d387c9aae9172d621";
    await helpers.impersonateAccount(USDCHolder);
    const impersonatedSigner = await ethers.getSigner(USDCHolder);

    const liquidityAmount = ethers.parseUnits("1000", 18); // Adjust to the amount of liquidity tokens you want to remove

    const USDC = await ethers.getContractAt("IERC20", USDCAddress, impersonatedSigner);
    const DAI = await ethers.getContractAt("IERC20", DAIAddress);

    const ROUTER = await ethers.getContractAt("IUniswap", UNIRouter, impersonatedSigner);

    const deadline = Math.floor(Date.now() / 1000) + (60 * 10);

    await ROUTER.removeLiquidity(
        USDCAddress,
        DAIAddress,
        liquidityAmount,
        0,
        0,
        impersonatedSigner.address,
        deadline
    );

    const usdcBalAfterRemoveLiquidity = await USDC.balanceOf(impersonatedSigner.address);
    const daiBalAfterRemoveLiquidity = await DAI.balanceOf(impersonatedSigner.address);

    console.log("USDC balance after removing liquidity:", ethers.formatUnits(usdcBalAfterRemoveLiquidity, 6));
    console.log("DAI balance after removing liquidity:", ethers.formatUnits(daiBalAfterRemoveLiquidity, 18));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
