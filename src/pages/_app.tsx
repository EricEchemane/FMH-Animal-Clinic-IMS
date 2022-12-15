import '../../styles/global.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { MantineProvider } from '@mantine/core';
import { CustomerContextProvider } from '~/providers/customer-provider';
import { NotificationsProvider } from '@mantine/notifications';
import { UserAdminContextProvider } from '~/providers/user-admin-prodiver';

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
			<NotificationsProvider>
				<SessionProvider session={pageProps.session}>
					<UserAdminContextProvider>
						<CustomerContextProvider>
							<Component {...pageProps} />
						</CustomerContextProvider>
					</UserAdminContextProvider>
				</SessionProvider>
			</NotificationsProvider>
		</MantineProvider>
	);
}

export default MyApp;
