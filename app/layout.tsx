// app/layout.tsx

import { Suspense } from "react"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { TransactionToast } from "@/components/blockchain/transaction-toast"
import { TransactionMonitor } from "@/components/blockchain/transaction-monitor"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/react"

import ClientOnly from "@/components/ClientOnly"
import { BlockchainProvider } from "@/components/providers/blockchain-provider"

export const metadata: Metadata = {
  title: "Carbon Fiesta - Transparent Carbon Credit Marketplace",
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
        <ClientOnly>
          <BlockchainProvider>
            <Suspense fallback={null}>
              {children}
              <Toaster />
              <TransactionToast />
              <TransactionMonitor />
            </Suspense>
          </BlockchainProvider>
        </ClientOnly>
        <Analytics />
      </body>
    </html>
  )
}