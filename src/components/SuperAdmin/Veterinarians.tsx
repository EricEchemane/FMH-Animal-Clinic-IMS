import {
	ActionIcon,
	Card,
	Group,
	Menu,
	Table,
	TextInput,
	Title,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconDots, IconSearch, IconUserX } from '@tabler/icons';
import React, { useEffect } from 'react';
import { UserRole } from '~/providers/customer-provider/types';
import Http from '~/utils/http-adapter';
import { Account } from './index';

type Props = {
	accounts: Account[];
	onDemoteToStaff: (accountId: string) => void;
};

export default function VeterinariansAccounts({
	accounts: _accounts,
	onDemoteToStaff,
}: Props) {
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

	const demoteStaff = (accountId: string) => {
		const confirmed = confirm('Are you sure you want to demote this account?');
		if (!confirmed) return;
		onDemoteToStaff(accountId);
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
					showNotification({
						title: 'Account demoted',
						message: 'Account has been demoted',
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
			<Group
				position='apart'
				align={'center'}
			>
				<Title
					order={2}
					color={'dimmed'}
					weight={'normal'}
				>
					Veterinarians
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
											onClick={() => demoteStaff(account.id)}
											icon={<IconUserX size={14} />}
										>
											Demote staff
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
