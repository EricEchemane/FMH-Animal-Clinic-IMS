import React, { useEffect, useState } from 'react';
import { FeedbackTabs } from '../../types';
import { Feedback } from '~/entities-interfaces/feedback.entity';
import Http from '~/utils/http-adapter';
import { useUserAdmin } from '~/providers/user-admin-prodiver';
import { Stack, Group, Title, Text } from '@mantine/core';
import css from './style.module.css';
import ForReviews from './ForReviews';
import PublishedFeedbacks from './PublishedFeedbacks';
import AllFeedbacks from './AllFeedbacks';

export default function Feedbacks() {
	const { admin, dispatch } = useUserAdmin();
	const [currentTab, setCurrentTab] = useState<FeedbackTabs>('To Review');
	const [feedbacks, setFeedbacks] = useState<Feedback[]>(
		admin?.feedbacks || []
	);

	const _feedbacks = admin?.feedbacks || [];
	const forReviews = _feedbacks.filter(
		(feedback) => feedback.is_published === false
	);
	const published = _feedbacks.filter(
		(feedback) => feedback.is_published === true
	);

	const averateRating =
		_feedbacks.reduce((total, currentValue) => total + currentValue.rating, 0) /
		_feedbacks.length;

	useEffect(() => {
		Http.get('/feedback', {
			onSuccess: (data) => {
				dispatch({ action: 'set-feedbacks', payload: data });
			},
			onFail: console.log,
		});
	}, [dispatch]);

	return (
		<>
			<Stack
				style={{
					height: '100%',
					overflowY: 'auto',
				}}
			>
				<Group
					style={{
						position: 'sticky',
						top: 0,
						zIndex: 2,
						backdropFilter: 'blur(3rem)',
						padding: '0 1rem',
						marginBottom: '2rem',
					}}
					position='apart'
				>
					<Title order={2}> Feedbacks </Title>

					<Group spacing={30}>
						<button
							className={css.feedbackStatus}
							tabIndex={1}
							data-active={currentTab === 'To Review'}
							onClick={() => setCurrentTab('To Review')}
						>
							<Title color='orange'>{forReviews.length}</Title>
							<Text>To Review</Text>
						</button>
						<button
							className={css.feedbackStatus}
							tabIndex={1}
							data-active={currentTab === 'Published'}
							onClick={() => setCurrentTab('Published')}
						>
							<Title color='green'>{published.length}</Title>
							<Text>Published</Text>
						</button>
						<button
							className={css.feedbackStatus}
							tabIndex={1}
							data-active={currentTab === 'All'}
							onClick={() => setCurrentTab('All')}
						>
							<Title color='violet'>{(admin?.feedbacks || []).length}</Title>
							<Text>All</Text>
						</button>
					</Group>
				</Group>

				{currentTab === 'To Review' && <ForReviews feedbacks={forReviews} />}

				{currentTab === 'Published' && (
					<PublishedFeedbacks feedbacks={forReviews} />
				)}

				{currentTab === 'All' && <AllFeedbacks feedbacks={forReviews} />}
			</Stack>
		</>
	);
}
