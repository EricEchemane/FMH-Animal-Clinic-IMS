import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useUserAdmin } from '~/providers/user-admin-prodiver';
import css from './style.module.css';
import {
	Avatar,
	Button,
	Card,
	Group,
	Stack,
	Title,
	Text,
	ActionIcon,
	Menu,
	useMantineColorScheme,
} from '@mantine/core';
import { Tabs } from './types';
import {
	IconBuildingWarehouse,
	IconCalendarEvent,
	IconDotsVertical,
	IconMoon,
	IconPaw,
	IconSun,
	IconTrash,
	IconUserExclamation,
	IconUserOff,
} from '@tabler/icons';
import { useSession } from 'next-auth/react';
import Appointments from './tabs/Appointments';
import Feedbacks from './tabs/Feedbacks';
import Inventory from './tabs/Inventory';
import Services from './tabs/Services';

export default function Admin(props: any) {
	const { toggleColorScheme, colorScheme } = useMantineColorScheme();
	const dark = colorScheme === 'dark';

	const { admin, dispatch } = useUserAdmin();
	const { data: session } = useSession({ required: true });

	const [currentTab, setCurrentTab] = useState<Tabs>('appointments');

	useEffect(() => {
		toggleColorScheme(props.user.prefer_color_scheme as any);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const togglePreferColorScheme = () => {
		const confirm = window.confirm(
			'You need to sign-in again to apply the changes. Do you want to continue?'
		);
		if (!confirm) return;
		toggleColorScheme('light');
		dispatch({
			action: 'set-prefer-color-scheme',
			payload: {
				theme: dark ? 'light' : 'dark',
				id: props.user.sub,
			},
		});
	};

	return (
		<>
			<Head>
				<title> Admin - FMH Animal Clinic</title>
			</Head>

			<div className={css.root}>
				<aside>
					<Card
						shadow={'xl'}
						sx={{ height: '100%' }}
						radius='lg'
					>
						<div>
							<Title
								order={2}
								color={'dimmed'}
							>
								{props.user.role}
							</Title>
							<Title
								color={'violet'}
								order={6}
							>
								FMH Animal Clinic
							</Title>
						</div>

						<Stack
							mt={50}
							justify={'space-between'}
							sx={{ height: '85%' }}
						>
							<Stack>
								{props.user.role === 'veterinarian' ||
									(props.user.role === 'staff' && (
										<Button
											size='md'
											className={css.navButton}
											leftIcon={<IconCalendarEvent />}
											variant={
												currentTab === 'appointments' ? 'light' : 'subtle'
											}
											onClick={() => setCurrentTab('appointments')}
										>
											Appointments
										</Button>
									))}
								{props.user.role === 'staff' && (
									<Button
										size='md'
										className={css.navButton}
										leftIcon={<IconBuildingWarehouse />}
										variant={currentTab === 'inventory' ? 'light' : 'subtle'}
										onClick={() => setCurrentTab('inventory')}
									>
										Inventory
									</Button>
								)}
								{props.user.role === 'staff' && (
									<Button
										size='md'
										className={css.navButton}
										leftIcon={<IconUserExclamation />}
										variant={currentTab === 'feedbacks' ? 'light' : 'subtle'}
										onClick={() => setCurrentTab('feedbacks')}
									>
										Feedbacks
									</Button>
								)}
								{props.user.role === 'veterinarian' && (
									<Button
										size='md'
										className={css.navButton}
										leftIcon={<IconPaw />}
										variant={currentTab === 'services' ? 'light' : 'subtle'}
										onClick={() => setCurrentTab('services')}
									>
										Services
									</Button>
								)}
							</Stack>

							<Group position='apart'>
								<Group>
									<Avatar
										src={session?.user?.image || ''}
										alt={admin?.name}
										radius={'xl'}
									/>
									<div>
										<Title
											color={'dimmed'}
											order={5}
										>
											{session?.user?.name}
										</Title>
										<Text size={'sm'}> {admin?.email} </Text>
									</div>
								</Group>
								<Menu
									shadow='md'
									width={200}
								>
									<Menu.Target>
										<ActionIcon variant='subtle'>
											<IconDotsVertical size={20} />
										</ActionIcon>
									</Menu.Target>

									<Menu.Dropdown>
										<Menu.Label>Settings</Menu.Label>
										<Menu.Item
											onClick={() => {
												dispatch({ action: 'sign-out', payload: null });
												toggleColorScheme('light');
											}}
											icon={<IconUserOff size={14} />}
										>
											Sign Out
										</Menu.Item>
										<Menu.Item
											onClick={togglePreferColorScheme}
											icon={
												dark ? <IconSun size={14} /> : <IconMoon size={14} />
											}
										>
											{dark ? 'Light Mode' : 'Dark Mode'}
										</Menu.Item>

										<Menu.Divider />

										<Menu.Label>Danger zone</Menu.Label>
										<Menu.Item
											disabled
											color='red'
											icon={<IconTrash size={14} />}
										>
											Delete my account
										</Menu.Item>
									</Menu.Dropdown>
								</Menu>
							</Group>
						</Stack>
					</Card>
				</aside>

				<main>
					<section hidden={currentTab !== 'appointments'}>
						<Appointments />
					</section>
					<section hidden={currentTab !== 'inventory'}>
						<Inventory />
					</section>
					<section hidden={currentTab !== 'feedbacks'}>
						<Feedbacks />
					</section>
					<section hidden={currentTab !== 'services'}>
						<Services />
					</section>
				</main>
			</div>
		</>
	);
}
