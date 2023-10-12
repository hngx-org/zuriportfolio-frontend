import { useContext } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import { manropeB, manropeEB, manropeL, ppB, ppEB, ppReg } from '../config/font';
import { MainLayoutContextProvider } from '../context/LayoutContext';
import '../styles/globals.css';
import '../styles/nprogress.css';
// import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import nProgress from 'nprogress';
import { Router } from 'next/router';
<<<<<<< HEAD
import { CartProvider } from '@modules/shop/component/CartContext';
=======
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider } from '../context/AuthContext';
// import { ToastContainer } from 'react-toastify';
const queryClient = new QueryClient();
import { CreatingAssessmentProvider } from '../context/assessment/CreatingAssessmentContext';
>>>>>>> a2e138010e81b3575672ee9e4facaba7306d5e62

// nprogress loader
Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

export default function App({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any;

  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-ppReg: ${ppReg.style.fontFamily};
            --font-ppB: ${ppB.style.fontFamily};
            --font-ppEB: ${ppEB.style.fontFamily};
            --font-manropeL: ${manropeL.style.fontFamily};
            --font-manropeB: ${manropeB.style.fontFamily};
            --font-manropeEB: ${manropeEB.style.fontFamily};
          }
        `}
      </style>
<<<<<<< HEAD
      <CartProvider>
        <ErrorBoundary>
          <MainLayoutContextProvider>
            <AnyComponent {...pageProps} />
          </MainLayoutContextProvider>
        </ErrorBoundary>
      </CartProvider>
=======
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <MainLayoutContextProvider>
              <CreatingAssessmentProvider>
                <AnyComponent {...pageProps} />
              </CreatingAssessmentProvider>
            </MainLayoutContextProvider>
            {/* <ToastContainer /> */}
          </AuthContextProvider>
        </QueryClientProvider>
      </ErrorBoundary>
>>>>>>> a2e138010e81b3575672ee9e4facaba7306d5e62
    </>
  );
}
