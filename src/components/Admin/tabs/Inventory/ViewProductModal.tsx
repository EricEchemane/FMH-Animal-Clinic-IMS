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
import { Product } from '~/entities-interfaces/product.entity';

type Props = {
	opened: boolean;
	product: Product;
	onClose: () => void;
	onEditClicked: () => void;
};

export default function ViewProductModal({
	opened,
	onClose,
	product,
	onEditClicked,
}: Props) {
	return (
		<>
			<Modal
				opened={opened}
				title={'Product Details'}
				onClose={onClose}
				radius={'xl'}
				closeOnEscape
				padding={'xl'}
			>
				<Stack>
					<div
						style={{
							position: 'relative',
							minHeight: '250px',
							borderRadius: '1rem',
							backgroundImage: 'url(/assets/product-image-placeholder.png)',
							overflow: 'hidden',
						}}
					>
						<img
							style={{ objectFit: 'cover', width: '100%' }}
							src={product.image_url}
							alt={product.name}
						/>
					</div>
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
								onClick={onEditClicked}
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
