import {
	Button,
	Card,
	Menu,
	Table,
	Title,
	ActionIcon,
	Group,
	TextInput,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconDots, IconSearch, IconUserCheck } from '@tabler/icons';
import React, { useEffect, useState } from 'react';
import { UserRole } from '~/providers/customer-provider/types';
import Http from '~/utils/http-adapter';
import { Account } from './index';

type Props = {
	accounts: Account[];
	onPromoteToStaff: (accountId: string) => void;
};

export default function PendingAccounts({
	accounts: _accounts,
	onPromoteToStaff,
}: Props) {
	const [accounts, setAccounts] = useState<Account[]>([]);
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
	const promoteToVet = (accountId: string) => {
		const confirmed = confirm(
			'Are you sure you want to promote this account to veterinarian?'
		);
		if (!confirmed) return;

		Http.patch(
			`/user/${accountId}`,
			{ role: UserRole.veterinarian },
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
						title: 'Account promoted',
						message: 'Account has been promoted to veterinarian',
						color: 'green',
					});
				},
			}
		);
	};

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
					Pending Accounts
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
							<td>
								<Menu
									shadow='md'
									width={250}
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
											Promote as staff
										</Menu.Item>
										<Menu.Item
											onClick={() => promoteToVet(account.id)}
											icon={<IconUserCheck size={14} />}
										>
											Promote as Veterinarian
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
