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
import { connectSolflare } from '@/utils/wallet-connection-utils';
import { PUMPFUN_URL, CA_TEXT } from "@/utils/pumpfun-config";
import { LINKS } from "@/utils/links-config";

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
  const [hasJoinedWhitelist, setHasJoinedWhitelist] = useState(false);

  // Detect wallet connection and trigger join
  React.useEffect(() => {
    if (connected && publicKey && modalOpen && !hasJoinedWhitelist && !isSubmitting) {
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

  // Detecta si el usuario está en el navegador de la DApp de Solflare
  const isSolflareDappBrowser = () => {
    const ua = (navigator.userAgent || '').toLowerCase();
    // Patrones comunes de navegadores in-app de Solflare
    return (
      ua.includes('solflare') ||
      ua.includes('solflarewallet') ||
      ua.includes('inapp') ||
      ua.includes('solflareapp') ||
      /solflare[\s\-]?browser/.test(ua)
    );
  };

  // Detecta si el usuario está en el navegador de la DApp de Phantom
  const isPhantomDappBrowser = () => {
    const ua = navigator.userAgent || '';
    return ua.toLowerCase().includes('phantom');
  };

  // Intenta abrir la app Solflare o redirige a la tienda si no está instalada
  const openSolflareAppOrStore = () => {
    const now = Date.now();
    window.location.href = 'solflare://open';
    setTimeout(() => {
      if (Date.now() - now < 2000) {
        if (/android/i.test(navigator.userAgent)) {
          window.location.href = 'https://play.google.com/store/apps/details?id=com.solflare.mobile';
        } else {
          window.location.href = 'https://apps.apple.com/app/solflare/id1580902717';
        }
      }
    }, 1500);
  };

  // Intenta abrir la app Phantom o redirige a la tienda si no está instalada
  const openPhantomAppOrStore = () => {
    const now = Date.now();
    window.location.href = 'phantom://open';
    setTimeout(() => {
      if (Date.now() - now < 2000) {
        if (/android/i.test(navigator.userAgent)) {
          window.location.href = 'https://play.google.com/store/apps/details?id=app.phantom';
        } else {
          window.location.href = 'https://apps.apple.com/app/phantom-solana-wallet/id1598432977';
        }
      }
    }, 1500);
  };

  // Utilidad para detectar proveedor Phantom
  const getPhantomProvider = () => {
    if (window.solana && window.solana.isPhantom) return window.solana;
    return null;
  };

  // Utilidad para detectar proveedor Solflare
  const getSolflareProvider = () => {
    if (window.solflare) return window.solflare;
    if (window.solana && window.solana.isSolflare) return window.solana;
    return null;
  };

  const handleJoinWhitelist = async () => {
    if (hasJoinedWhitelist) return;
    setHasJoinedWhitelist(true);
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
        body: JSON.stringify({ 
          wallet: publicKey.toBase58(),
          wallet_type: wallet?.adapter?.name === PhantomWalletName ? 'phantom' : 'solflare'
        }),
      });
      const result = await response.json();
      const isSuccess = result.success === true || (Array.isArray(result) && result[0]?.success === true);
      if (isSuccess) {
        toast({
          title: t('whitelist.successTitle', 'Success! 🎉'),
          description: t('whitelist.successDesc', 'You are now on the whitelist!'),
        });
        setModalOpen(false);
        window.location.href = 'https://app.fudfate.xyz/congrats';
      } else {
        toast({
          variant: "destructive",
          title: t('whitelist.errorTitle', 'Error'),
          description: t('whitelist.errorDesc', 'Failed to join whitelist. Please try again.'),
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
    // Si el usuario está en el navegador de la DApp de Solflare
    if (isSolflareDappBrowser()) {
      if (walletName !== SolflareWalletName) {
        toast({
          variant: "default",
          title: t('whitelist.warningPhantomInSolflareTitle', 'Advertencia'),
          description: t('whitelist.warningPhantomInSolflareDesc', 'Estás en la DApp de Solflare. Solo deberías conectar la wallet de Solflare para evitar errores.'),
        });
        return;
      }
      setIsSubmitting(true);
      try {
        const provider = getSolflareProvider();
        if (!provider) {
          toast({
            variant: "destructive",
            title: t('whitelist.solflareProviderNotFound', 'No se detecta el proveedor de Solflare.'),
            description: t('whitelist.solflareReload', 'Si has vuelto desde la app, recarga la página para intentar conectar.'),
          });
          setIsSubmitting(false);
          return;
        }
        const publicKey = await connectSolflare(t);
        await handleJoinWhitelistWithAddress(publicKey);
      } catch (error) {
        toast({
          variant: "destructive",
          title: t('whitelist.solflareConnectErrorTitle', 'Error al conectar Solflare'),
          description: error.message,
        });
      } finally {
        setIsSubmitting(false);
      }
      return;
    }
    // Si el usuario está en el navegador de la DApp de Phantom
    if (isPhantomDappBrowser()) {
      if (walletName !== PhantomWalletName) {
        toast({
          variant: "default",
          title: t('whitelist.warningSolflareInPhantomTitle', 'Warning'),
          description: t('whitelist.warningSolflareInPhantomDesc', 'You are in the Phantom DApp. You should only connect the Phantom wallet to avoid errors.'),
        });
        return;
      }
      setIsSubmitting(true);
      try {
        const provider = getPhantomProvider();
        if (!provider) {
          toast({
            variant: "destructive",
            title: t('whitelist.phantomProviderNotFound', 'No se detecta el proveedor de Phantom.'),
            description: t('whitelist.phantomReload', 'Si has vuelto desde la app, recarga la página para intentar conectar.'),
          });
          setIsSubmitting(false);
          return;
        }
        await provider.connect();
        if (!provider.publicKey) {
          toast({
            variant: "destructive",
            title: t('whitelist.phantomNoAddress', 'No se pudo obtener la dirección pública de Phantom.'),
          });
          setIsSubmitting(false);
          return;
        }
        await handleJoinWhitelistWithAddress(provider.publicKey.toString());
      } catch (error) {
        if (error && error.code === 4001) {
          toast({
            variant: "destructive",
            title: t('whitelist.phantomRejected', 'El usuario rechazó la conexión.'),
          });
        } else {
          toast({
            variant: "destructive",
            title: t('whitelist.phantomConnectErrorTitle', 'Error al conectar Phantom'),
            description: error.message,
          });
        }
      } finally {
        setIsSubmitting(false);
      }
      return;
    }
    // Si está en móvil y selecciona Phantom
    if (walletName === PhantomWalletName && isMobile()) {
      openPhantomAppOrStore();
      // Esperar a que el usuario vuelva y reintente
      return;
    }
    // Si está en móvil y selecciona Solflare
    if (walletName === SolflareWalletName && isMobile()) {
      openSolflareAppOrStore();
      // Esperar a que el usuario vuelva y reintente
      return;
    }
    // Desktop o navegador compatible (web normal)
    if (walletName === SolflareWalletName) {
      setIsSubmitting(true);
      try {
        const provider = getSolflareProvider();
        if (!provider) {
          toast({
            variant: "destructive",
            title: t('whitelist.solflareProviderNotFound', 'No se detecta el proveedor de Solflare.'),
            description: t('whitelist.solflareReload', 'Si has vuelto desde la app, recarga la página para intentar conectar.'),
          });
          setIsSubmitting(false);
          return;
        }
        const publicKey = await connectSolflare(t);
        await handleJoinWhitelistWithAddress(publicKey);
      } catch (error) {
        toast({
          variant: "destructive",
          title: t('whitelist.solflareConnectErrorTitle', 'Error al conectar Solflare'),
          description: error.message,
        });
      } finally {
        setIsSubmitting(false);
      }
      return;
    }
    if (walletName === PhantomWalletName) {
      setIsSubmitting(true);
      try {
        const provider = getPhantomProvider();
        if (!provider) {
          toast({
            variant: "destructive",
            title: t('whitelist.phantomProviderNotFound', 'No se detecta el proveedor de Phantom.'),
            description: t('whitelist.phantomReload', 'Si has vuelto desde la app, recarga la página para intentar conectar.'),
          });
          setIsSubmitting(false);
          return;
        }
        await provider.connect();
        if (!provider.publicKey) {
          toast({
            variant: "destructive",
            title: t('whitelist.phantomNoAddress', 'No se pudo obtener la dirección pública de Phantom.'),
          });
          setIsSubmitting(false);
          return;
        }
        await handleJoinWhitelistWithAddress(provider.publicKey.toString());
      } catch (error) {
        if (error && error.code === 4001) {
          toast({
            variant: "destructive",
            title: t('whitelist.phantomRejected', 'El usuario rechazó la conexión.'),
          });
        } else {
          toast({
            variant: "destructive",
            title: t('whitelist.phantomConnectErrorTitle', 'Error al conectar Phantom'),
            description: error.message,
          });
        }
      } finally {
        setIsSubmitting(false);
      }
      return;
    }
    // Fallback
    select(walletName);
    try {
      await connect();
    } catch {}
  };

  // Nuevo flujo para whitelist usando address manual (Solflare)
  const handleJoinWhitelistWithAddress = async (address: string) => {
    if (hasJoinedWhitelist) return;
    setHasJoinedWhitelist(true);
    setIsSubmitting(true);
    try {
      const response = await fetch('https://primary-production-fe05.up.railway.app/webhook/ae4eccb6-2001-44ad-b373-c9fe1ef3949e', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          wallet: address,
          wallet_type: wallet?.adapter?.name === PhantomWalletName ? 'phantom' : 'solflare'
        }),
      });
      const result = await response.json();
      const isSuccess = result.success === true || (Array.isArray(result) && result[0]?.success === true);
      if (isSuccess) {
        toast({
          title: t('whitelist.successTitle', '¡Éxito! 🎉'),
          description: t('whitelist.successDesc', '¡Ya estás en la whitelist!'),
        });
        setModalOpen(false);
        window.location.href = 'https://app.fudfate.xyz/congrats';
      } else {
        toast({
          variant: "destructive",
          title: t('whitelist.errorTitle', 'Error'),
          description: t('whitelist.errorDesc', 'No se pudo unir a la whitelist. Intenta de nuevo.'),
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: t('whitelist.errorTitle', 'Error'),
        description: t('whitelist.errorDesc', 'Algo salió mal. Intenta de nuevo.'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cuando se cierra el modal, resetea el estado para permitir un nuevo intento si es necesario
  useEffect(() => {
    if (!modalOpen) {
      setHasJoinedWhitelist(false);
    }
  }, [modalOpen]);

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-lg mx-auto">
      <button
        id="join-whitelist-btn"
        className="font-pixel text-base px-8 py-4 rounded-xl flex items-center justify-center gap-2 border-2 border-black shadow-lg bg-[#FFE066] text-black hover:bg-[#00FFFF] hover:text-black transition-all duration-200 vibrate-btn buy-now-main-btn"
        style={{ fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '2px', boxShadow: '0 0 24px 8px #ffef4c, 0 0 48px 16px #ff00cc80' }}
        onClick={() => window.open(LINKS.PUMPFUN, '_blank')}
        disabled={isSubmitting}
      >
        <span className="glitch">BUY NOW 🚀</span>
      </button>
      <style>{`
        .buy-now-main-btn {
          animation: buy-now-main-glow 1.2s infinite alternate, buy-now-main-vibrate 0.18s infinite linear;
          position: relative;
        }
        @keyframes buy-now-main-glow {
          0% { box-shadow: 0 0 24px 8px #ffef4c, 0 0 48px 16px #ff00cc80; background: #FFE066; }
          100% { box-shadow: 0 0 48px 16px #00fff0, 0 0 64px 24px #ff00cc; background: #FFEF4C; }
        }
        @keyframes buy-now-main-vibrate {
          0% { transform: translateY(0px); }
          20% { transform: translateY(-2px); }
          40% { transform: translateY(2px); }
          60% { transform: translateY(-2px); }
          80% { transform: translateY(2px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
      <span className="block text-xs text-gray-400 font-pixel text-center mt-1">CA: {CA_TEXT}</span>
    </div>
  );
};

export default WhitelistForm;
