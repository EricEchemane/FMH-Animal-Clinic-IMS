/* eslint-disable @next/next/no-img-element */
import {
	Modal,
	Group,
	Stack,
	Text,
	Title,
	Divider,
	ActionIcon,
	Tooltip,
} from '@mantine/core';
import { IconPencil } from '@tabler/icons';
import { useState } from 'react';
import { Product } from '~/entities-interfaces/product.entity';

type Props = {
	opened: boolean;
	product: Product | undefined;
	onClose: () => void;
};

export default function ViewProductModal({ opened, onClose, product }: Props) {
	if (product === undefined) return <></>;
	return (
		<>
			<Modal
				opened={opened}
				title={'Product Details'}
				onClose={onClose}
				radius={'xl'}
			>
				<Stack>
					<img
						style={{ width: '100%', borderRadius: '1rem' }}
						src={product.image_url}
						alt={product.name}
					/>
					<Group
						position='apart'
						align={'center'}
					>
						<Title
							order={2}
							weight={'normal'}
						>
							{product.name}
						</Title>
						<Tooltip
							label='Edit product details'
							withArrow
							arrowSize={10}
						>
							<ActionIcon
								variant='subtle'
								size={'lg'}
							>
								<IconPencil size={25} />
							</ActionIcon>
						</Tooltip>
					</Group>
					<Text> {product.description} </Text>

					<Divider />

					<Group position='apart'>
						<Text weight={'bold'}>Price (Php)</Text>
						<Text weight={'bold'}>{product.unit_price}</Text>
					</Group>
					<Group position='apart'>
						<Text weight={'bold'}>Stocks Left</Text>
						<Text weight={'bold'}>{product.stock}</Text>
					</Group>

					<Text
						align='center'
						color={'dimmed'}
					>
						ID: {product.id}
					</Text>
				</Stack>
			</Modal>
		</>
	);
}
