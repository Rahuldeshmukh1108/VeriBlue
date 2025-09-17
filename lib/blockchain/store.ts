import { create } from "zustand"
import { persist } from "zustand/middleware"

interface BlockchainState {
  // Wallet state
  isConnected: boolean
  address: string | null
  balance: string
  chainId: number | null

  // Transaction state
  pendingTransactions: string[]
  completedTransactions: string[]

  // Carbon credits state
  carbonBalance: string
  ownedProjects: string[]
  leasedCredits: Array<{
    projectId: string
    amount: string
    leaseDate: string
    expiryDate: string
  }>

  // Actions
  setWalletState: (state: Partial<Pick<BlockchainState, "isConnected" | "address" | "balance" | "chainId">>) => void
  addPendingTransaction: (txHash: string) => void
  completePendingTransaction: (txHash: string) => void
  setCarbonBalance: (balance: string) => void
  addOwnedProject: (projectId: string) => void
  addLeasedCredit: (credit: BlockchainState["leasedCredits"][0]) => void
  reset: () => void
}

const initialState = {
  isConnected: false,
  address: null,
  balance: "0",
  chainId: null,
  pendingTransactions: [],
  completedTransactions: [],
  carbonBalance: "0",
  ownedProjects: [],
  leasedCredits: [],
}

export const useBlockchainStore = create<BlockchainState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setWalletState: (newState) => set((state) => ({ ...state, ...newState })),

      addPendingTransaction: (txHash) =>
        set((state) => ({
          pendingTransactions: [...state.pendingTransactions, txHash],
        })),

      completePendingTransaction: (txHash) =>
        set((state) => ({
          pendingTransactions: state.pendingTransactions.filter((tx) => tx !== txHash),
          completedTransactions: [...state.completedTransactions, txHash],
        })),

      setCarbonBalance: (balance) => set({ carbonBalance: balance }),

      addOwnedProject: (projectId) =>
        set((state) => ({
          ownedProjects: [...state.ownedProjects, projectId],
        })),

      addLeasedCredit: (credit) =>
        set((state) => ({
          leasedCredits: [...state.leasedCredits, credit],
        })),

      reset: () => set(initialState),
    }),
    {
      name: "carbon-fiesta-blockchain",
      partialize: (state) => ({
        carbonBalance: state.carbonBalance,
        ownedProjects: state.ownedProjects,
        leasedCredits: state.leasedCredits,
        completedTransactions: state.completedTransactions,
      }),
    },
  ),
)
