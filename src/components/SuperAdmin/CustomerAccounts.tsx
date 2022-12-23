import { Card, Table, Title } from '@mantine/core';
import React from 'react';
import { Account } from './index';

type Props = {
	accounts: Account[];
};

export default function CustomerAccounts({ accounts }: Props) {
	console.log({ accounts });

	return (
		<Card
			withBorder
			px='xl'
		>
			<Title
				order={2}
				color={'dimmed'}
				weight={'normal'}
			>
				Customer Accounts
			</Title>

			<Table mt={'lg'}>
				<thead>
					<tr>
						<th> Account Id </th>
						<th> Email </th>
						<th> Action </th>
					</tr>
				</thead>
				<tbody>
					{accounts.map((account) => (
						<tr key={account.id}>
							<td> {account.id} </td>
							<td> {account.email} </td>
							<td> Action </td>
						</tr>
					))}
				</tbody>
			</Table>
		</Card>
	);
}
