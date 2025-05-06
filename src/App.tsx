import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';
import { clusterApiUrl } from '@solana/web3.js';

// Import pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CookiesPolicy from "./pages/CookiesPolicy";

// Import components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";

// Import i18n
import "./i18n";

const queryClient = new QueryClient();

const endpoint = clusterApiUrl('mainnet-beta');
const wallets = [
  new PhantomWalletAdapter(),
  new SolflareWalletAdapter(),
];

// Move useEffect inside the functional component
const App = () => {
  // Set the title inside the component
  useEffect(() => {
    document.title = "Fudfate";
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <BrowserRouter>
              <TooltipProvider>
                <div className="flex flex-col min-h-screen bg-white">
                  <Navbar />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/cookies" element={<CookiesPolicy />} />
                      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                  <CookieConsent />
                </div>
                <Toaster />
                <Sonner />
              </TooltipProvider>
            </BrowserRouter>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </QueryClientProvider>
  );
};

export default App;
