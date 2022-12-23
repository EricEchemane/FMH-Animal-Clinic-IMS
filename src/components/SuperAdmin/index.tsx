import { Button, Card, Group, Stack, Title } from '@mantine/core';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Http from '~/utils/http-adapter';
import { User as Account } from '../../entities-interfaces/user.entity';

type tabs = 'Pending' | 'Customers' | 'Staff';

export default function SuperAdmin() {
	const [tab, setTab] = useState<tabs>('Pending');
	const [accounts, setAccounts] = useState<Account[]>([]);

	useEffect(() => {
		Http.get('/user', {
			onSuccess: (data) => {
				setAccounts(data);
				console.log(data);
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

				<Card
					withBorder
					px='xl'
				>
					<Title
						order={2}
						color={'dimmed'}
					>
						{tab}
					</Title>
				</Card>
			</Stack>
		</>
	);
}
