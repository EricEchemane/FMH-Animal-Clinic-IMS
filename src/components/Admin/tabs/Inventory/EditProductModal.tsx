/* eslint-disable @next/next/no-img-element */
import {
	ActionIcon,
	Button,
	FileButton,
	Modal,
	Stack,
	Textarea,
	TextInput,
	Tooltip,
	Text,
	SimpleGrid,
	Group,
	NumberInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconUpload } from '@tabler/icons';
import { useState } from 'react';
import { Product } from '~/entities-interfaces/product.entity';
import { useUserAdmin } from '~/providers/user-admin-prodiver';
import Http from '~/utils/http-adapter';

type Props = {
	opened: boolean;
	product: Product;
	onClose: () => void;
};

export default function EditProductModal({ onClose, opened, product }: Props) {
	const { admin, dispatch } = useUserAdmin();
	const [isLoading, setIsLoading] = useState(false);

	const productForm = useForm({
		initialValues: product,
	});

	const handleImageChange = (file: File | null) => {
		//create a base64 image
		if (file) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => {
				const base64 = reader.result;
				if (base64) {
					//set the image
					productForm.setFieldValue('image_url', base64.toString());
				}
			};
		}
	};

	function handleSave() {
		Http.patch('/product/' + product.id, productForm.values, {
			onFail: (message) => showNotification({ message, color: 'red' }),
			onSuccess: (data) => {
				showNotification({ message: 'Changes saved!', color: 'green' });
				onClose();
				dispatch({
					action: 'set-product-image-url',
					payload: data,
				});
			},
			loadingToggler: setIsLoading,
		});
	}

	return (
		<Modal
			radius={'xl'}
			closeOnEscape
			opened={opened}
			onClose={onClose}
			title={
				<Text
					mt={'sm'}
					align='center'
					color={'dimmed'}
				>
					Edit Product - {product.id}
				</Text>
			}
			closeOnClickOutside={false}
			size='1000px'
			padding={'xl'}
		>
			<SimpleGrid
				cols={2}
				spacing='xl'
			>
				<Stack spacing={'xl'}>
					<TextInput
						label='Product Name'
						name='Product Name'
						size='md'
						{...productForm.getInputProps('name')}
					/>

					<Textarea
						minRows={4}
						label='Product Description'
						name='Product Description'
						size='md'
						{...productForm.getInputProps('description')}
					/>

					<Group grow>
						<NumberInput
							size='md'
							label='Price/Unit (₱)'
							precision={2}
							min={-1}
							step={0.05}
							{...productForm.getInputProps('unit_price')}
						/>
						<NumberInput
							size='md'
							label='Stock'
							min={0}
							{...productForm.getInputProps('stock')}
						/>
					</Group>

					<Group>
						<Button
							onClick={handleSave}
							variant='filled'
							disabled={!productForm.isDirty()}
							loading={isLoading}
						>
							Save
						</Button>
					</Group>
				</Stack>
				<div>
					<div
						style={{
							position: 'relative',
							minHeight: '250px',
							backgroundImage: 'url(/assets/product-image-placeholder.png)',
							borderRadius: '1.5rem',
							overflow: 'hidden',
						}}
					>
						<img
							style={{
								objectFit: 'cover',
								width: '100%',
							}}
							src={productForm.values.image_url}
							alt={product.name}
						/>
						<FileButton
							onChange={handleImageChange}
							accept='image/png,image/jpeg'
						>
							{(props) => (
								<Tooltip
									label='Upload new image'
									arrowSize={10}
									withArrow
								>
									<ActionIcon
										color={'violet'}
										variant={'filled'}
										size={'xl'}
										radius={'xl'}
										{...props}
										style={{
											position: 'absolute',
											bottom: '1rem',
											right: '1rem',
										}}
									>
										<IconUpload />
									</ActionIcon>
								</Tooltip>
							)}
						</FileButton>
					</div>
				</div>
			</SimpleGrid>
		</Modal>
	);
}
