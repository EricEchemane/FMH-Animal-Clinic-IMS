import {
	Card,
	Group,
	Stack,
	Title,
	Text,
	Divider,
	ActionIcon,
	Menu,
} from '@mantine/core';
import { Badge } from '@mantine/core';
import {
	IconArchive,
	IconCheck,
	IconDots,
	IconFolderOff,
	IconTrash,
} from '@tabler/icons';
import React from 'react';
import { Schedule } from '~/entities-interfaces/schedule.entity';
import NoPending from './NoPending';

type Props = {
	pending: Schedule[];
};

export default function PendingAppointments({ pending }: Props) {
	if (pending.length === 0) return <NoPending />;
	return (
		<Stack
			pr={'xl'}
			spacing={30}
		>
			<Title
				order={2}
				color='dimmed'
				weight={'normal'}
			>
				Pending Appointments
			</Title>

			<div
				style={{
					display: 'grid',
					gridTemplateColumns: '1fr 1fr',
					gap: '2rem',
				}}
			>
				{pending.map((sched) => (
					<Card
						shadow='sm'
						p={'xl'}
						radius='lg'
						withBorder
						key={sched.id}
						style={{ overflow: 'visible' }}
					>
						<Stack spacing={1}>
							<Group
								position='apart'
								align='flex-start'
							>
								<Group align={'flex-start'}>
									<Badge
										variant='filled'
										size='lg'
										color={getServiceBadgeColor(sched.service)}
									>
										{sched.service}
									</Badge>
									<Text mb='md'>{new Date(sched.date).toDateString()}</Text>
								</Group>
								<Menu
									shadow='md'
									width={200}
									position='bottom-end'
								>
									<Menu.Target>
										<ActionIcon>
											<IconDots size={30} />
										</ActionIcon>
									</Menu.Target>

									<Menu.Dropdown>
										<Menu.Label>Schedule</Menu.Label>
										<Menu.Item icon={<IconCheck size={14} />}>
											Mark as done
										</Menu.Item>
										<Menu.Item icon={<IconFolderOff size={14} />}>
											Mark as cancelled
										</Menu.Item>

										<Menu.Divider />

										<Menu.Label>Danger zone</Menu.Label>
										<Menu.Item icon={<IconArchive size={14} />}>
											Archive
										</Menu.Item>
										<Menu.Item
											color='red'
											icon={<IconTrash size={14} />}
										>
											Delete permanently
										</Menu.Item>
									</Menu.Dropdown>
								</Menu>
							</Group>
							<Title order={2}> {sched.name} </Title>
							<Text color={'dimmed'}> {sched.email} </Text>

							<Divider my={'md'} />

							<Text>
								<strong>Pet Name:</strong> {sched.pet_name}
							</Text>
							<Text>
								<strong>Concern:</strong> {sched.concern}
							</Text>
						</Stack>
					</Card>
				))}
			</div>
		</Stack>
	);
}

function getServiceBadgeColor(service: string) {
	switch (service) {
		case 'grooming':
			return 'yellow';
		case 'vet_consultation':
			return 'green';
		default:
			return 'blue';
	}
}
