import { Card, Group, Table, TextInput, Title } from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import React, { useEffect } from 'react';
import { Account } from './index';

type Props = {
	accounts: Account[];
};

export default function CustomerAccounts({ accounts: _accounts }: Props) {
	const [accounts, setAccounts] = React.useState<Account[]>([]);

	useEffect(() => {
		setAccounts(_accounts);
	}, [_accounts]);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const filteredAccounts = _accounts
			.filter(
				(account) =>
					account.name.toLowerCase().startsWith(value.toLowerCase()) ||
					account.email.toLowerCase().startsWith(value.toLowerCase())
			)
			.sort((a, b) => {
				if (a.name.toLowerCase().startsWith(value.toLowerCase())) return -1;
				if (b.name.toLowerCase().startsWith(value.toLowerCase())) return 1;
				return 0;
			});
		setAccounts(filteredAccounts);
	};

	return (
		<Card
			withBorder
			px='xl'
		>
			<Group
				position='apart'
				align={'center'}
			>
				<Title
					order={2}
					color={'dimmed'}
					weight={'normal'}
				>
					Customer Accounts
				</Title>

				<TextInput
					variant='filled'
					name='Search'
					placeholder='Search'
					onChange={handleSearch}
					icon={<IconSearch size={26} />}
				/>
			</Group>

			<Table mt={'lg'}>
				<thead>
					<tr>
						<th> Account Id </th>
						<th> Name </th>
						<th> Email </th>
						<th> Action </th>
					</tr>
				</thead>
				<tbody>
					{accounts.map((account) => (
						<tr key={account.id}>
							<td> {account.id} </td>
							<td> {account.name} </td>
							<td> {account.email} </td>
							<td> Action </td>
						</tr>
					))}
				</tbody>
			</Table>
		</Card>
	);
}
