import { Connection, clusterApiUrl } from "@solana/web3.js";
export const commitmentLevel = "processed";
export const endpoint =
  process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL || clusterApiUrl("devnet");
export const connections = new Connection(endpoint, commitmentLevel);
