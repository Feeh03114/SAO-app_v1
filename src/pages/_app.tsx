import { SideBar } from '@/components/SideBar/SideBar';
import '@/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

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
    <>
      <ToastContainer />
      <SessionProvider session={pageProps.session}>
        <SideBar title="SAO - Sistema de Agendamento Odontológico">
          <Component {...pageProps} />
        </SideBar>
      </SessionProvider>
    </>
    
  )
}
