import { createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import { withPaymentInterceptor, decodeXPaymentResponse } from "x402-axios";
import axios from "axios";
import { config } from "dotenv";
config();

const baseURL = "http://localhost:3000";
const endpointPath = "/quote";

// Create a wallet client (using your private key)
// Go there to get USDC: https://faucet.circle.com
// Go there to get ETH: https://www.alchemy.com/faucets/base-sepolia
if (!process.env.PRIVATE_KEY) {
  throw new Error("PRIVATE_KEY is not set");
}
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);

console.log("Calling", baseURL + endpointPath, "with account", account.address);

const api = withPaymentInterceptor(
  axios.create({
    baseURL, // e.g. https://api.example.com
  }),
  account
);

api
  .get(endpointPath) // e.g. /paid-endpoint
  .then((response) => {
    console.log(response.data);

    const paymentResponse = decodeXPaymentResponse(
      response.headers["x-payment-response"]
    );
    console.log(paymentResponse);
  })
  .catch((error) => {
    console.error(error.response?.data?.error);
  });
