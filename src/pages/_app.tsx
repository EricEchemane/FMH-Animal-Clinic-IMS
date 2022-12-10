import '../../styles/global.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from "next-auth/react";
import { MantineProvider } from '@mantine/core';

interface AppPropsWithSession extends AppProps {
  pageProps: { session: any; };
}

function MyApp({ Component, pageProps }: AppPropsWithSession) {

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'light',
      }}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </MantineProvider>
  );
}

export default MyApp;
