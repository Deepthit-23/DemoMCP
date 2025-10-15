// main.js

import { ethers } from "ethers";
import { provider } from "./connect.js";

// 1. Corrected Azuro Contract Address (all lowercase)
const sportsRegistryAddress = "0x56327a5a1656950298b6811a1a32345097457a7e";
const sportsRegistryAbi = [
  // The function to get all registered sport IDs
  "function getSportIds() external view returns (uint40[])"
];

async function startApp() {
  try {
    const blockNumber = await provider.getBlockNumber();
    console.log("✅ Connection successful! Current block number:", blockNumber);

    // 2. Create an instance of the SportsRegistry contract
    const sportsContract = new ethers.Contract(
      sportsRegistryAddress,
      sportsRegistryAbi,
      provider
    );
    console.log("🚀 Successfully connected to Azuro SportsRegistry contract!");

    // 3. Call the getSportIds() function on the new contract
    console.log("Calling getSportIds() function...");
    const sportIds = await sportsContract.getSportIds();

    const formattedSportIds = sportIds.map(id => id.toString());

    console.log("🏅 Success! Available Sport IDs:", formattedSportIds);

  } catch (error) {
    console.error("❌ An error occurred:", error);
  }
}

startApp();