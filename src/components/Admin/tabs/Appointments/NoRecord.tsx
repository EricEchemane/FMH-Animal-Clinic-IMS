import { Center, Stack, Title } from '@mantine/core';
import Image from 'next/image';
import React from 'react';

export default function NoRecord() {
	return (
		<>
			<Center mt={100}>
				<Stack align={'center'}>
					<Image
						src={'/assets/no-data.svg'}
						alt='No Data'
						width={150}
						height={150}
					/>
					<Title
						order={2}
						weight={'normal'}
						color='dimmed'
					>
						No record matched your search or filter
					</Title>
				</Stack>
			</Center>
		</>
	);
}
