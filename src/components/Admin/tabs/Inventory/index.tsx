import { Button, Group, Stack, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconPlus } from '@tabler/icons';
import React, { useEffect, useState } from 'react';
import { useUserAdmin } from '~/providers/user-admin-prodiver';
import Http from '~/utils/http-adapter';
import { InventoryTabs } from '../../types';

export default function Inventory() {
	const { admin, dispatch } = useUserAdmin();
	const [currentTab, setCurrentTab] = useState<InventoryTabs>('all');

	useEffect(() => {
		if (!admin?.access_token) return;
		Http.get('/product', {
			accessToken: admin.access_token,
			onSuccess: (data) => dispatch({ action: 'set-products', payload: data }),
			onFail: (message) => showNotification({ message, color: 'red' }),
		});
	}, [admin?.access_token, dispatch]);

	return (
		<>
			<Stack
				style={{
					height: '100%',
					overflowY: 'auto',
				}}
			>
				<Group
					style={{
						position: 'sticky',
						top: 0,
						zIndex: 2,
						backdropFilter: 'blur(3rem)',
						padding: '1rem',
						marginBottom: '2rem',
					}}
					position='apart'
				>
					<Title order={2}> Inventory </Title>
					<Group
						spacing={'xl'}
						align='center'
					>
						<Button
							radius={'xl'}
							variant={currentTab === 'all' ? 'filled' : 'outline'}
							onClick={() => setCurrentTab('all')}
						>
							All Products
						</Button>
						<Button
							radius={'xl'}
							variant={currentTab === 'archive' ? 'filled' : 'outline'}
							onClick={() => setCurrentTab('archive')}
						>
							Archive
						</Button>
						<Button
							radius={'xl'}
							variant={currentTab === 'add' ? 'filled' : 'light'}
							onClick={() => setCurrentTab('add')}
							rightIcon={<IconPlus />}
						>
							Add Product
						</Button>
					</Group>
				</Group>

				<section hidden={currentTab !== 'all'}>All</section>
				<section hidden={currentTab !== 'archive'}>Archive</section>
				<section hidden={currentTab !== 'add'}>Add</section>
			</Stack>
		</>
	);
}
