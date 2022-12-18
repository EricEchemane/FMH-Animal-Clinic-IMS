/* eslint-disable @next/next/no-img-element */
import {
	ActionIcon,
	Button,
	FileButton,
	Group,
	NumberInput,
	SimpleGrid,
	Stack,
	Textarea,
	TextInput,
	Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconUpload } from '@tabler/icons';
import React, { FormEvent, useRef, useState } from 'react';
import { Product } from '~/entities-interfaces/product.entity';
import { useUserAdmin } from '~/providers/user-admin-prodiver';

export default function AddProduct() {
	const { admin, dispatch } = useUserAdmin();
	const [isLoading, setIsLoading] = useState(false);
	const resetRef = useRef<() => void>(null);

	const productForm = useForm({
		initialValues: {
			description: '',
			image_url: '',
			name: '',
			stock: 0,
			unit_price: 0,
		} as Product,
		validate: {
			stock: (value) => {
				if (value <= 0) return 'Stock must be greater than 0';
			},
			unit_price: (value) => {
				if (value <= 0) return 'Price must be greater than 0';
			},
			image_url(value) {
				if (value.trim() === '') return 'Image is required';
			},
		},
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

	function handleSave(e: FormEvent) {
		e.preventDefault();
		productForm.validate();
		if (!admin?.access_token) return;
	}

	return (
		<Stack>
			<Title
				order={2}
				weight={'normal'}
			>
				Add Product
			</Title>
			<form onSubmit={handleSave}>
				<SimpleGrid
					cols={2}
					spacing='xl'
				>
					<Stack spacing={'xl'}>
						<TextInput
							required
							label='Product Name'
							name='Product Name'
							size='md'
							{...productForm.getInputProps('name')}
							error={productForm.errors.name}
						/>

						<Textarea
							required
							minRows={4}
							label='Product Description'
							name='Product Description'
							size='md'
							{...productForm.getInputProps('description')}
							error={productForm.errors.description}
						/>

						<Group
							grow
							align={'flex-start'}
						>
							<NumberInput
								required
								size='md'
								label='Price/Unit (₱)'
								precision={2}
								step={0.1}
								{...productForm.getInputProps('unit_price')}
								error={productForm.errors.unit_price}
							/>
							<NumberInput
								required
								size='md'
								label='Stock'
								{...productForm.getInputProps('stock')}
								error={productForm.errors.stock}
							/>
						</Group>

						<Group>
							<Button
								variant='filled'
								size='md'
								disabled={!productForm.isDirty()}
								loading={isLoading}
								type='submit'
							>
								Add and Save
							</Button>
							<Button
								variant='outline'
								size='md'
								disabled={isLoading || !productForm.isDirty()}
								onClick={() => {
									productForm.reset();
									resetRef.current?.();
								}}
							>
								Reset
							</Button>
						</Group>
					</Stack>
					<div>
						<Title
							mb={'xs'}
							order={4}
							weight={'normal'}
							color={productForm.errors.image_url ? 'red' : 'dark'}
						>
							{productForm.errors.image_url
								? 'Image is required'
								: 'Product Image'}
						</Title>
						<div
							style={{
								position: 'relative',
								width: '500px',
								minHeight: !productForm.values.image_url ? '300px' : 'auto',
								backgroundImage: 'url(/assets/product-image-placeholder.png)',
								borderRadius: '1rem',
								overflow: 'hidden',
								backgroundSize: 'cover',
							}}
						>
							<img
								style={{
									objectFit: 'cover',
									width: '100%',
								}}
								src={productForm.values.image_url}
								alt={''}
							/>
							<FileButton
								resetRef={resetRef}
								name='image_url'
								onChange={handleImageChange}
								accept='image/png,image/jpeg'
							>
								{(props) => (
									<Button
										color={productForm.errors.image_url ? 'red' : 'violet'}
										variant={'filled'}
										size={'md'}
										radius={'xl'}
										{...props}
										style={{
											position: 'absolute',
											top: '50%',
											left: '50%',
											translate: '-50%',
										}}
										leftIcon={<IconUpload />}
									>
										Upload Image
									</Button>
								)}
							</FileButton>
						</div>
					</div>
				</SimpleGrid>
			</form>
		</Stack>
	);
}
