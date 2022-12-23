import {
	Button,
	Card,
	Menu,
	Table,
	Title,
	Text,
	ActionIcon,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconDots, IconUserCheck } from '@tabler/icons';
import React, { useState } from 'react';
import { UserRole } from '~/providers/customer-provider/types';
import Http from '~/utils/http-adapter';
import { Account } from './index';

type Props = {
	accounts: Account[];
	onPromoteToStaff: (accountId: string) => void;
};

export default function PendingAccounts({ accounts, onPromoteToStaff }: Props) {
	const promoteToStaff = (accountId: string) => {
		const confirmed = confirm(
			'Are you sure you want to promote this account to staff?'
		);
		if (!confirmed) return;
		Http.patch(
			`/user/${accountId}`,
			{ role: UserRole.staff },
			{
				onFail: (message) => {
					showNotification({
						title: 'Failed to promote account',
						message,
						color: 'red',
					});
				},
				onSuccess: () => {
					onPromoteToStaff(accountId);
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
				Pending Accounts
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
											onClick={() => promoteToStaff(account.id)}
											icon={<IconUserCheck size={14} />}
										>
											Promote to staff
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
