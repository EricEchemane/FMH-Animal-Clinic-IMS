import { Stack, Title } from '@mantine/core';
import React from 'react';
import { Feedback } from '~/entities-interfaces/feedback.entity';

type Props = {
	feedbacks: Feedback[];
};

export default function AllFeedbacks(props: Props) {
	return (
		<Stack>
			<Title
				weight={'normal'}
				order={2}
			>
				All Feedbacks
			</Title>
		</Stack>
	);
}
