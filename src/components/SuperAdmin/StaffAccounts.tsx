import { ActionIcon, Card, Menu, Table, Title } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconDots, IconUserX } from '@tabler/icons';
import React from 'react';
import { UserRole } from '~/providers/customer-provider/types';
import Http from '~/utils/http-adapter';
import { Account } from './index';

type Props = {
	accounts: Account[];
	onDemoteToStaff: (accountId: string) => void;
};

export default function StaffAccounts({ accounts, onDemoteToStaff }: Props) {
	const demoteToStaff = (accountId: string) => {
		const confirmed = confirm(
			'Are you sure you want to demote this account to staff?'
		);
		if (!confirmed) return;
		Http.patch(
			`/user/${accountId}`,
			{ role: UserRole.pending },
			{
				onFail: (message) => {
					showNotification({
						title: 'Failed to promote account',
						message,
						color: 'red',
					});
				},
				onSuccess: () => {
					onDemoteToStaff(accountId);
					showNotification({
						title: 'Account promoted to staff',
						message: 'Account has been promoted to staff',
						color: 'green',
					});
				},
			}
		);
	};

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
				Staff Accounts
			</Title>

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
							<td>
								<Menu
									shadow='md'
									width={200}
								>
									<Menu.Target>
										<ActionIcon
											color='violet'
											size='lg'
										>
											<IconDots size={26} />
										</ActionIcon>
									</Menu.Target>

									<Menu.Dropdown>
										<Menu.Label>Actions</Menu.Label>
										<Menu.Item
											onClick={() => demoteToStaff(account.id)}
											icon={<IconUserX size={14} />}
										>
											Demote to staff
										</Menu.Item>
									</Menu.Dropdown>
								</Menu>
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</Card>
	);
}
