import Head from 'next/head';
import React, { useState } from 'react';
import useAdminSignin from '~/hooks/useAdminSignin';
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
} from '@mantine/core';
import { Tabs } from './types';
import {
	IconBuildingWarehouse,
	IconCalendarEvent,
	IconChevronRight,
	IconHome,
	IconPaw,
	IconTrash,
	IconUserExclamation,
	IconUserOff,
	IconUsers,
} from '@tabler/icons';
import { signOut, useSession } from 'next-auth/react';

export default function Admin() {
	const { admin, dispatch } = useUserAdmin();
	const { data: session } = useSession({ required: true });
	useAdminSignin();

	const [currentTab, setCurrentTab] = useState<Tabs>('home');

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
								color='violet'
							>
								Admin
							</Title>
							<Title
								color={'dimmed'}
								order={5}
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
								<Button
									className={css.navButton}
									leftIcon={<IconHome />}
									variant={currentTab === 'home' ? 'light' : 'subtle'}
									onClick={() => setCurrentTab('home')}
								>
									Home
								</Button>
								<Button
									className={css.navButton}
									leftIcon={<IconCalendarEvent />}
									variant={currentTab === 'appointments' ? 'light' : 'subtle'}
									onClick={() => setCurrentTab('appointments')}
								>
									Appointments
								</Button>
								<Button
									className={css.navButton}
									leftIcon={<IconBuildingWarehouse />}
									variant={currentTab === 'inventory' ? 'light' : 'subtle'}
									onClick={() => setCurrentTab('inventory')}
								>
									Inventory
								</Button>
								<Button
									className={css.navButton}
									leftIcon={<IconUserExclamation />}
									variant={currentTab === 'feedbacks' ? 'light' : 'subtle'}
									onClick={() => setCurrentTab('feedbacks')}
								>
									Feedbacks
								</Button>
								<Button
									className={css.navButton}
									leftIcon={<IconPaw />}
									variant={currentTab === 'services' ? 'light' : 'subtle'}
									onClick={() => setCurrentTab('services')}
								>
									Services
								</Button>
								<Button
									className={css.navButton}
									leftIcon={<IconUsers />}
									variant={currentTab === 'accounts' ? 'light' : 'subtle'}
									onClick={() => setCurrentTab('accounts')}
								>
									User Accounts
								</Button>
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
											<IconChevronRight size={20} />
										</ActionIcon>
									</Menu.Target>

									<Menu.Dropdown>
										<Menu.Label>My Account</Menu.Label>
										<Menu.Item
											onClick={() => signOut()}
											icon={<IconUserOff size={14} />}
										>
											Sign Out
										</Menu.Item>

										<Menu.Divider />

										<Menu.Label>Danger zone</Menu.Label>
										<Menu.Item
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
				<main> main </main>
			</div>
		</>
	);
}
