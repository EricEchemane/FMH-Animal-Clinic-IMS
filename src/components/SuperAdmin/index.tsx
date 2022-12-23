import { Button, Card, Group, Stack, Title } from '@mantine/core';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Http from '~/utils/http-adapter';
import { User } from '../../entities-interfaces/user.entity';
import CustomerAccounts from './CustomerAccounts';
import PendingAccounts from './PendingAccounts';
import StaffAccounts from './StaffAccounts';

export type Account = User;
type tabs = 'Pending' | 'Customers' | 'Staff';

export default function SuperAdmin() {
	const [tab, setTab] = useState<tabs>('Pending');
	const [accounts, setAccounts] = useState<Account[]>([]);

	const pendingAccounts = accounts.filter(
		(account) => account.role === 'pending'
	);
	const customerAccounts = accounts.filter(
		(account) => account.role === 'customer'
	);
	const staffAccounts = accounts.filter((account) => account.role === 'staff');

	useEffect(() => {
		Http.get('/user', {
			onSuccess: (data) => {
				setAccounts(data);
			},
		});
	}, []);

	return (
		<>
			<Head>
				<title> Super Admin - FMH Clinic </title>
			</Head>

			<Stack p='lg'>
				<Card
					withBorder
					shadow='md'
					px='xl'
				>
					<Group
						position='apart'
						align={'center'}
					>
						<Title order={2}>Accounts</Title>
						<Group>
							<Button
								variant={tab === 'Pending' ? 'filled' : 'light'}
								radius='xl'
								onClick={() => setTab('Pending')}
							>
								Pending
							</Button>
							<Button
								variant={tab === 'Customers' ? 'filled' : 'light'}
								radius='xl'
								onClick={() => setTab('Customers')}
							>
								Customers
							</Button>
							<Button
								variant={tab === 'Staff' ? 'filled' : 'light'}
								radius='xl'
								onClick={() => setTab('Staff')}
							>
								Staff
							</Button>
						</Group>
					</Group>
				</Card>

				{tab === 'Pending' && <PendingAccounts accounts={pendingAccounts} />}
				{tab === 'Staff' && <StaffAccounts accounts={staffAccounts} />}
				{tab === 'Customers' && (
					<CustomerAccounts accounts={customerAccounts} />
				)}
			</Stack>
		</>
	);
}
