// Utilidad para conectar con Solflare (extensión o in-app)
export async function connectSolflare(t) {
  // Detectar el proveedor de Solflare
  const solflareProvider = window.solflare || (window.solana && window.solana.isSolflare ? window.solana : null);

  if (!solflareProvider) {
    throw new Error(t('whitelist.solflareProviderNotFound', 'No se detecta el proveedor de Solflare. Instala la extensión o usa la app.'));
  }

  try {
    // Solicitar conexión
    const resp = await solflareProvider.connect();
    const publicKey = resp?.publicKey || solflareProvider.publicKey;
    if (!publicKey) {
      throw new Error(t('whitelist.solflareNoAddress', 'No se pudo obtener la dirección pública de Solflare.'));
    }
    return publicKey.toString();
  } catch (error) {
    if (error && error.code === 4001) {
      throw new Error(t('whitelist.solflareRejected', 'El usuario rechazó la conexión.'));
    }
    throw new Error(error?.message || t('whitelist.solflareUnknownError', 'Error desconocido al conectar Solflare.'));
  }
}

// Declaraciones para evitar errores de linter con window.solflare y window.solana
declare global {
  interface Window {
    solflare?: any;
    solana?: any;
  }
} 