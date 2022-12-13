import '../../styles/global.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { MantineProvider } from '@mantine/core';
import { CustomerContextProvider } from '~/providers/customer-provider';

interface AppPropsWithSession extends AppProps {
	pageProps: { session: any };
}

function MyApp({ Component, pageProps }: AppPropsWithSession) {
	return (
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{
				colorScheme: 'light',
				primaryColor: 'violet',
			}}
		>
			<SessionProvider session={pageProps.session}>
				<CustomerContextProvider>
					<Component {...pageProps} />
				</CustomerContextProvider>
			</SessionProvider>
		</MantineProvider>
	);
}

export default MyApp;
