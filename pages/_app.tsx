import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import AOS from 'aos';
import Header from '../components/main/header/Header';
import Footer from '../components/main/footer/Footer';
import SignUpSection from '../components/reusable/sign-up-section/SignUpSection';
import { SignUpModalProvider } from '../components/hooks/useSignUpModal';
import SignUpModal from '../components/reusable/sign-up-modal/SignUpModal';
import Script from 'next/script';
import TagManager, { TagManagerArgs } from 'react-gtm-module';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import { ErrorBoundary, LEVEL_WARN, Provider } from '@rollbar/react';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const initializeAOS = () => {
    AOS.init({
      disable: 'mobile',
      once: true,
    });
  };

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ENV === 'production' || process.env.NEXT_PUBLIC_ENV === 'staging') {
      const GTM_ARGS: TagManagerArgs = {
        gtmId: process.env.NEXT_PUBLIC_GTM_ID || '',
      };

      TagManager.initialize(GTM_ARGS);
    }
  }, []);

  useEffect(() => {
    initializeAOS();

    router.events.on('routeChangeComplete', initializeAOS);

    return () => {
      router.events.off('routeChangeComplete', initializeAOS);
    };
  }, [router.events]);

  const rollbarConfig = {
    accessToken: process.env.NEXT_PUBLIC_ROLLBAR_ACCESS_TOKEN,
    environment: process.env.NEXT_PUBLIC_ENV,
    server: {
      root: process.env.NEXT_PUBLIC_FETCH_URL,
    },
  };

  const getAppComponents = () => {
    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <NextNProgress color="#25e85f" options={{ showSpinner: false }} />
        <ToastContainer />
        <SignUpModalProvider>
          <Header
            viewType={
              router.route.startsWith('/reviews') ||
              router.route.startsWith('/404') ||
              router.route.startsWith('/500')
                ? 'dark'
                : 'normal'
            }
          />
          <main>
            <Component {...pageProps} />
          </main>
          <SignUpSection />
          <SignUpModal />
          <Footer />
        </SignUpModalProvider>
      </>
    );
  };

  return (
    <>
      {process.env.NEXT_PUBLIC_ENV === 'production' ? (
        <>
          <Provider config={rollbarConfig}>
            <ErrorBoundary level={LEVEL_WARN}>
              {getAppComponents()}
              <Script src="https://plausible.io/js/plausible.js" data-domain="shake.io" />
            </ErrorBoundary>
          </Provider>
        </>
      ) : (
        <>{getAppComponents()}</>
      )}
    </>
  );
}

export default MyApp;
