import { Center, Stack, Title } from '@mantine/core';
import Image from 'next/image';
import React from 'react';

export default function NoPending() {
	return (
		<>
			<Center mt={100}>
				<Stack align={'center'}>
					<Image
						src={'/assets/no-data.svg'}
						alt='No Data'
						width={200}
						height={200}
					/>
					<Title
						weight={'normal'}
						color='dimmed'
					>
						No Pending Appointments
					</Title>
				</Stack>
			</Center>
		</>
	);
}
