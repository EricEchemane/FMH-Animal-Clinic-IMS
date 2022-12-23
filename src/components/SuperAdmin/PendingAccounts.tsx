import {
	Button,
	Card,
	Menu,
	Table,
	Title,
	Text,
	ActionIcon,
} from '@mantine/core';
import {
	IconSettings,
	IconMessageCircle,
	IconPhoto,
	IconSearch,
	IconArrowsLeftRight,
	IconTrash,
	IconDots,
} from '@tabler/icons';
import React from 'react';
import { Account } from './index';

type Props = {
	accounts: Account[];
};

export default function PendingAccounts({ accounts }: Props) {
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
										<Menu.Item icon={<IconSettings size={14} />}>
											Settings
										</Menu.Item>
										<Menu.Item icon={<IconMessageCircle size={14} />}>
											Messages
										</Menu.Item>
										<Menu.Item icon={<IconPhoto size={14} />}>
											Gallery
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
