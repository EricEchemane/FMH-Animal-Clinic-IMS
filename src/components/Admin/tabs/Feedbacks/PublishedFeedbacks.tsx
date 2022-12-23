import { Stack, Title } from '@mantine/core';
import React from 'react';
import { Feedback } from '~/entities-interfaces/feedback.entity';

type Props = {
	feedbacks: Feedback[];
};

export default function PublishedFeedbacks(props: Props) {
	return (
		<Stack>
			<Title
				weight={'normal'}
				order={2}
			>
				Published Feedbacks
			</Title>
		</Stack>
	);
}
