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
						<th> Email </th>
						<th> Action </th>
					</tr>
				</thead>
				<tbody>
					{accounts.map((account) => (
						<tr key={account.id}>
							<td> {account.id} </td>
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
										<Menu.Label>Application</Menu.Label>
										<Menu.Item icon={<IconSettings size={14} />}>
											Settings
										</Menu.Item>
										<Menu.Item icon={<IconMessageCircle size={14} />}>
											Messages
										</Menu.Item>
										<Menu.Item icon={<IconPhoto size={14} />}>
											Gallery
										</Menu.Item>
										<Menu.Item
											icon={<IconSearch size={14} />}
											rightSection={
												<Text
													size='xs'
													color='dimmed'
												>
													⌘K
												</Text>
											}
										>
											Search
										</Menu.Item>

										<Menu.Divider />

										<Menu.Label>Danger zone</Menu.Label>
										<Menu.Item icon={<IconArrowsLeftRight size={14} />}>
											Transfer my data
										</Menu.Item>
										<Menu.Item
											color='red'
											icon={<IconTrash size={14} />}
										>
											Delete my account
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
