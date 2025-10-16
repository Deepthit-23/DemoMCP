// connect.js

import { ethers } from "ethers";

// ⚠️ PASTE YOUR RPC URL FROM STEP 2 HERE
const RPC_URL = "https://polygon-amoy.g.alchemy.com/v2/py07Z_9dqNQMQlUyYRnMj";

// Create the provider object with the updated ethers v6 syntax
const provider = new ethers.JsonRpcProvider(RPC_URL);

console.log("Attempting to connect to the blockchain...");

// We export the 'provider' so we can use it in other files
export { provider };