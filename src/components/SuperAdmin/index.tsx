import { Button, Card, Group, Stack, Title } from '@mantine/core';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { UserRole } from '~/providers/customer-provider/types';
import { useUserAdmin } from '~/providers/user-admin-prodiver';
import Http from '~/utils/http-adapter';
import { User } from '../../entities-interfaces/user.entity';
import CustomerAccounts from './CustomerAccounts';
import PendingAccounts from './PendingAccounts';
import StaffAccounts from './StaffAccounts';
import VeterinariansAccounts from './Veterinarians';

export type Account = User;
type tabs = 'Pending' | 'Customers' | 'Staff' | 'Veterinarians';

export default function SuperAdmin() {
	const { dispatch } = useUserAdmin();
	const [tab, setTab] = useState<tabs>('Pending');
	const [accounts, setAccounts] = useState<Account[]>([]);

	const pendingAccounts = accounts.filter(
		(account) => account.role === 'pending'
	);
	const customerAccounts = accounts.filter(
		(account) => account.role === 'customer'
	);
	const staffAccounts = accounts.filter((account) => account.role === 'staff');

	const vetAccounts = accounts.filter(
		(account) => account.role === 'veterinarian'
	);

	const handlePromoteToStaff = (accountId: string) => {
		const newAccounts = accounts.map((account) => {
			if (account.id === accountId) {
				account.role = UserRole.staff;
			}
			return account;
		});
		setAccounts(newAccounts);
	};

	const handlePromoteToVet = (accountId: string) => {
		const newAccounts = accounts.map((account) => {
			if (account.id === accountId) {
				account.role = UserRole.veterinarian;
			}
			return account;
		});
		setAccounts(newAccounts);
	};

	const signout = () => {
		dispatch({ action: 'sign-out', payload: null });
	};

	const handleDemoteToStaff = (accountId: string) => {
		const newAccounts = accounts.map((account) => {
			if (account.id === accountId) {
				account.role = UserRole.pending;
			}
			return account;
		});
		setAccounts(newAccounts);
	};

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
							<Button
								variant={tab === 'Veterinarians' ? 'filled' : 'light'}
								radius='xl'
								onClick={() => setTab('Veterinarians')}
							>
								Veterinarians
							</Button>
							<Button
								variant='outline'
								radius='xl'
								onClick={signout}
							>
								Sign out
							</Button>
						</Group>
					</Group>
				</Card>

				{tab === 'Pending' && (
					<PendingAccounts
						onPromoteToVet={handlePromoteToVet}
						onPromoteToStaff={handlePromoteToStaff}
						accounts={pendingAccounts}
					/>
				)}
				{tab === 'Staff' && (
					<StaffAccounts
						onDemoteToStaff={handleDemoteToStaff}
						accounts={staffAccounts}
					/>
				)}
				{tab === 'Customers' && (
					<CustomerAccounts accounts={customerAccounts} />
				)}
				{tab === 'Veterinarians' && (
					<VeterinariansAccounts
						accounts={vetAccounts}
						onDemoteToStaff={handleDemoteToStaff}
					/>
				)}
			</Stack>
		</>
	);
}
