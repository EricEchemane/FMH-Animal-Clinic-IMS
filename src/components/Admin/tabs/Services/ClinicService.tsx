import { Card, Group, Stack, Title, Text, ActionIcon } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons';
import { ClinicService } from '~/entities-interfaces/service.entity';
import { useUserAdmin } from '~/providers/user-admin-prodiver';

type Props = {
	service: ClinicService;
	onEdit: () => void;
};

export default function ClinicServiceComponent({ service, onEdit }: Props) {
	const { dispatch } = useUserAdmin();
	const remove = () => {
		const confirmed = confirm(
			'Are you sure you want to delete this service? This is irreversible.'
		);
		if (!confirmed) return;
		dispatch({ action: 'remove-service', payload: service.id });
	};
	return (
		<Card
			radius={'lg'}
			p='xl'
			key={service.id}
			withBorder
			shadow={'md'}
		>
			<Stack sx={{ height: '100%' }}>
				<Title order={2}> {service.name} </Title>
				<Text> {service.description} </Text>

				<Group
					mt='auto'
					position='right'
				>
					<ActionIcon
						variant='light'
						color={'violet'}
						radius={'xl'}
						size={'lg'}
						onClick={onEdit}
					>
						<IconEdit size={18} />
					</ActionIcon>
					<ActionIcon
						variant='light'
						color={'red'}
						radius={'xl'}
						size={'lg'}
						onClick={remove}
					>
						<IconTrash size={18} />
					</ActionIcon>
				</Group>
			</Stack>
		</Card>
	);
}
