import { getDefaultConfig } from "@rainbow-me/rainbowkit"
import { mainnet, polygon, arbitrum, base, sepolia } from "wagmi/chains"

// Mock contract addresses - replace with real deployed contracts
export const CONTRACTS = {
  CARBON_CREDITS: "0x1234567890123456789012345678901234567890",
  VERIFIER_REGISTRY: "0x2345678901234567890123456789012345678901",
  MARKETPLACE: "0x3456789012345678901234567890123456789012",
  GOVERNANCE: "0x4567890123456789012345678901234567890123",
} as const

export const config = getDefaultConfig({
  appName: "VeriBlue",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo-project-id",
  chains: [mainnet, polygon, arbitrum, base, sepolia],
  ssr: true,
})

// Mock ABI for carbon credits contract
export const CARBON_CREDITS_ABI = [
  {
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "projectId", type: "string" },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "lease",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "amount", type: "uint256" }],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const

// Mock ABI for verifier registry
export const VERIFIER_REGISTRY_ABI = [
  {
    inputs: [{ name: "verifier", type: "address" }],
    name: "addVerifier",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "projectId", type: "string" },
      { name: "approved", type: "bool" },
    ],
    name: "verifyProject",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "verifier", type: "address" }],
    name: "isVerifier",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
] as const
