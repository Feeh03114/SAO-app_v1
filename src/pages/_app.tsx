import { SideBar } from '@/components/SideBar/SideBar';
import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('./sw.js')
        .then(function (registration) {
          console.log('Service worker  registrado com sucesso:');
        })
        .catch(function (error) {
          console.log('Falha ao Registrar o Service Worker:', error);
        });
    }
  }, []);
  return (
    <SessionProvider session={pageProps.session}>
      <SideBar title="Sistema de Acompanhamento Odontológico">
        <Component {...pageProps} />
      </SideBar>
    </SessionProvider>
  )
}
