import {
	Card,
	SimpleGrid,
	Stack,
	Title,
	Text,
	Group,
	Button,
} from '@mantine/core';
import { IconStar } from '@tabler/icons';
import React from 'react';
import { Feedback } from '~/entities-interfaces/feedback.entity';

type Props = {
	feedbacks: Feedback[];
};

export default function ForReviews(props: Props) {
	return (
		<Stack>
			<Title
				weight={'normal'}
				order={2}
			>
				To Review
			</Title>

			<SimpleGrid
				cols={3}
				spacing={'xl'}
				pr={'xl'}
			>
				{props.feedbacks.map((feedback) => (
					<Card
						key={feedback.id}
						shadow='md'
						withBorder
						radius={'lg'}
						p={'xl'}
					>
						<Stack
							sx={{ height: '100%' }}
							spacing={'lg'}
						>
							<div>
								<Title
									color={'dimmed'}
									order={4}
								>
									{feedback.user.name}
								</Title>
								<Text color={'dimmed'}>{feedback.user.email}</Text>
							</div>
							<Text size={'lg'}>{feedback.message}</Text>
							<Group
								mt='auto'
								position='apart'
								align={'center'}
							>
								<Group
									align={'center'}
									spacing={2}
								>
									<IconStar />
									{feedback.rating}
								</Group>
								<Button
									radius={'xl'}
									variant='light'
								>
									Publish
								</Button>
							</Group>
						</Stack>
					</Card>
				))}
			</SimpleGrid>
		</Stack>
	);
}
