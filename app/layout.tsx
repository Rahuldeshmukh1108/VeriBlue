import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { BlockchainProvider } from "@/components/providers/blockchain-provider"
import { TransactionToast } from "@/components/blockchain/transaction-toast"
import { TransactionMonitor } from "@/components/blockchain/transaction-monitor"

export const metadata: Metadata = {
  title: "VeriBlue - Transparent Carbon Credit Marketplace",
  description:
    "Connect developers, verifiers, and buyers in a transparent ecosystem for verified carbon credits with real-time impact tracking.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <BlockchainProvider>
          <Suspense fallback={null}>
            {children}
            <Toaster />
            <TransactionToast />
            <TransactionMonitor />
          </Suspense>
        </BlockchainProvider>
        <Analytics />
      </body>
    </html>
  )
}
