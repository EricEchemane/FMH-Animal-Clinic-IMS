import { Card, Group, Stack, Title, Text, ActionIcon } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons';
import React, { useState } from 'react';
import { ClinicService } from '~/entities-interfaces/service.entity';

type Props = {
	service: ClinicService;
};

export default function ClinicServiceComponent({ service }: Props) {
	const [isInEditMode, setIsInEditMode] = useState(false);

	return (
		<Card
			radius={'lg'}
			p='xl'
			key={service.id}
			withBorder
			shadow={'md'}
		>
			<Stack sx={{ height: '100%' }}>
				<Title> {service.name} </Title>
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
					>
						<IconEdit size={18} />
					</ActionIcon>
					<ActionIcon
						variant='light'
						color={'red'}
						radius={'xl'}
						size={'lg'}
					>
						<IconTrash size={18} />
					</ActionIcon>
				</Group>
			</Stack>
		</Card>
	);
}
