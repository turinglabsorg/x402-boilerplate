import express, { Express, Request, Response, NextFunction } from "express";
import { paymentMiddleware, Network } from "x402-express";
import cors from "cors";
import helmet from "helmet";
import { config } from "dotenv";
import { bigLebowskiQuotes } from "./quotes/biglebowski.js";

// Load environment variables
config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  paymentMiddleware(
    "0xe6c30ad5aee7ad22e9f39d51d67667587cdd05a1", // your receiving wallet address
    {
      // Route configurations for protected endpoints
      "GET /quote": {
        // USDC amount in dollars
        price: "$0.001",
        network: "base-sepolia",
      },
    },
    {
      url: "https://x402.org/facilitator", // Facilitator URL for Base Sepolia testnet.
    }
  )
);

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to x402 Boilerplate 🤌" });
});

app.get("/quote", (req: Request, res: Response) => {
  const randomQuote =
    bigLebowskiQuotes[Math.floor(Math.random() * bigLebowskiQuotes.length)];
  res.json({
    quote: randomQuote.text,
    speaker: randomQuote.speaker,
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start server
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
