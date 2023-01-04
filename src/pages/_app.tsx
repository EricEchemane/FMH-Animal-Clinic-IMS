import '../../styles/global.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import {
	MantineProvider,
	ColorSchemeProvider,
	ColorScheme,
} from '@mantine/core';
import { CustomerContextProvider } from '~/providers/customer-provider';
import { NotificationsProvider } from '@mantine/notifications';
import { UserAdminContextProvider } from '~/providers/user-admin-prodiver';
import { useState } from 'react';

interface AppPropsWithSession extends AppProps {
	pageProps: { session: any };
}

function MyApp({ Component, pageProps }: AppPropsWithSession) {
	const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
	return (
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{
				colorScheme,
				primaryColor: 'violet',
			}}
		>
			<ColorSchemeProvider
				colorScheme={colorScheme}
				toggleColorScheme={toggleColorScheme}
			>
				<NotificationsProvider position='bottom-left'>
					<SessionProvider session={pageProps.session}>
						<UserAdminContextProvider>
							<CustomerContextProvider>
								<Component {...pageProps} />
							</CustomerContextProvider>
						</UserAdminContextProvider>
					</SessionProvider>
				</NotificationsProvider>
			</ColorSchemeProvider>
		</MantineProvider>
	);
}

export default MyApp;
