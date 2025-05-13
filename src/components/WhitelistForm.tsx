import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletName } from '@solana/wallet-adapter-phantom';
import { SolflareWalletName } from '@solana/wallet-adapter-solflare';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import type { WalletName } from '@solana/wallet-adapter-base';
import { useTranslation } from 'react-i18next';

interface WhitelistFormData {
  wallet: string;
}

interface WhitelistFormProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

const WhitelistForm = ({ modalOpen, setModalOpen }: WhitelistFormProps) => {
  const { publicKey, connected, select, wallets, connect, wallet } = useWallet();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  // Detect wallet connection and trigger join
  React.useEffect(() => {
    if (connected && publicKey && modalOpen) {
      handleJoinWhitelist();
    }
    // eslint-disable-next-line
  }, [connected, publicKey]);

  useEffect(() => {
    const handleScroll = () => {
      const arrow = document.querySelector('.scroll-hide-arrow');
      if (arrow) {
        if (window.scrollY > 20) {
          arrow.classList.add('hide-on-scroll');
        } else {
          arrow.classList.remove('hide-on-scroll');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const btn = document.getElementById('join-whitelist-btn');
    if (!btn) return;
    let timeout;
    const vibrate = () => {
      btn.classList.add('vibrating');
      setTimeout(() => {
        btn.classList.remove('vibrating');
        timeout = setTimeout(vibrate, 3000);
      }, 300);
    };
    timeout = setTimeout(vibrate, 3000);
    return () => clearTimeout(timeout);
  }, []);

  const isMobile = () => {
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
    return /android|iphone|ipad|ipod|opera mini|iemobile|wpdesktop|solflare|phantom|metamask|trust/i.test(ua);
  };

  const handleJoinWhitelist = async () => {
    setIsSubmitting(true);
    try {
      // Si es Phantom, intenta firmar un mensaje antes de enviar el webhook
      if (
        wallet?.adapter?.name === PhantomWalletName &&
        'signMessage' in wallet.adapter &&
        typeof wallet.adapter.signMessage === 'function'
      ) {
        try {
          const message = new TextEncoder().encode('Sign to join Fudfate whitelist');
          await (wallet.adapter as any).signMessage(message);
        } catch (err) {
          toast({
            variant: "destructive",
            title: "Signature required",
            description: "You must unlock and sign to join the whitelist.",
          });
          setIsSubmitting(false);
          return;
        }
      }
      const response = await fetch('https://primary-production-fe05.up.railway.app/webhook/ae4eccb6-2001-44ad-b373-c9fe1ef3949e', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ wallet: publicKey.toBase58() }),
      });
      const result = await response.json();
      const isSuccess = result.success === true || (Array.isArray(result) && result[0]?.success === true);
      if (isSuccess) {
        toast({
          title: "Success! 🎉",
          description: "You're now on the whitelist!",
        });
        setModalOpen(false);
        window.location.href = 'https://app.fudfate.xyz/congrats';
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to join whitelist. Please try again.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConnect = async (walletName: WalletName) => {
    if (walletName === PhantomWalletName && isMobile()) {
      toast({
        variant: "destructive",
        title: "Phantom",
        description: "Only available on desktop browser",
      });
      return;
    }
    if (walletName === SolflareWalletName && isMobile()) {
      window.location.href = "solflare://open";
      return;
    }
    select(walletName);
    try {
      await connect();
    } catch {}
  };

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-lg mx-auto">
      <button
        id="join-whitelist-btn"
        className="font-pixel text-base px-6 py-3 rounded-md flex items-center justify-center gap-2 border-2 border-black shadow-md bg-[#FFE066] text-black hover:bg-[#00FFFF] hover:text-black transition-all duration-200 vibrate-btn"
        onClick={() => setModalOpen(true)}
        disabled={isSubmitting}
      >
        <span role="img" aria-label="rocket">🚀</span>
        <span className="glitch">Join Whitelist</span>
      </button>
      <span className="block text-xs text-gray-400 font-pixel text-center mt-1">CA: coming soon</span>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-8 shadow-lg flex flex-col items-center gap-6 w-[90vw] max-w-md">
          <h2 className="font-pixel text-2xl mb-2 text-center">{t('connectWalletToJoin')}</h2>
          <span className="block text-xs text-gray-500 mb-2 font-pixel text-center">Connect your wallet to join the whitelist</span>
          <button
            className="w-full flex items-center justify-center gap-2 rounded-md py-3 px-6 font-pixel text-lg transition-colors border-2 border-black"
            style={{ backgroundColor: '#A69AE9', color: 'white' }}
            onClick={() => handleConnect(PhantomWalletName)}
            disabled={isSubmitting}
          >
            <img src="/img/images/Phantom-Icon_App_128x128.png" alt="Phantom" className="w-6 h-6" style={{ boxShadow: 'none' }} />
            Connect Phantom
          </button>
          <span className="block text-xs text-gray-500 font-pixel text-center mb-2 italic">
            {t('whitelist.phantomMobile')}
          </span>
          <button
            className="w-full flex items-center justify-center gap-2 rounded-md py-3 px-6 font-pixel text-lg transition-colors border-2 border-black"
            style={{ backgroundColor: '#FFEF4C', color: 'black' }}
            onClick={() => handleConnect(SolflareWalletName)}
            disabled={isSubmitting}
          >
            <img src="/img/images/Solflare_id5j73wBTF_0.png" alt="Solflare" className="w-6 h-6" style={{ boxShadow: 'none' }} />
            Connect Solflare
          </button>
          <span className="block text-xs text-gray-500 font-pixel text-center mb-2 italic">
            {t('whitelist.solflareMobile')}
          </span>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WhitelistForm;
