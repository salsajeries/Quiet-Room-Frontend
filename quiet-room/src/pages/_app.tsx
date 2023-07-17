import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import LiveBackground from '@/components/LiveBackground';
import { AnimatePresence } from 'framer-motion';
import zIndex from '@mui/material/styles/zIndex';
import { Container } from '@mui/material';

if(typeof document !== 'undefined') {
  // you are safe to use the "document" object here
  document.body.style.backgroundColor = "#E0DDDD";
}

export default function App({ Component, pageProps }: AppProps) {
  return(
    <>
    <AnimatePresence
      mode="wait"
      initial={false}
      onExitComplete={() => window.scrollTo(0, 0)}>
      <LiveBackground></LiveBackground>
      <Component {...pageProps} />
    </AnimatePresence>
    </>
  );
}