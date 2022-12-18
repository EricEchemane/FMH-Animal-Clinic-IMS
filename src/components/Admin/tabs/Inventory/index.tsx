import {
	Button,
	Group,
	Stack,
	Table,
	Title,
	ActionIcon,
	Menu,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import {
	IconArchive,
	IconDots,
	IconListDetails,
	IconPencil,
	IconPlus,
	IconTrash,
} from '@tabler/icons';
import React, { useEffect, useState } from 'react';
import { Product } from '~/entities-interfaces/product.entity';
import { useUserAdmin } from '~/providers/user-admin-prodiver';
import Http from '~/utils/http-adapter';
import { InventoryTabs } from '../../types';
import AddProduct from './AddProduct';
import EditProductModal from './EditProductModal';
import ViewProductModal from './ViewProductModal';

export default function Inventory() {
	const { admin, dispatch } = useUserAdmin();
	const [currentTab, setCurrentTab] = useState<InventoryTabs>('all');
	const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
	const [isInEditProductMode, setIsInEditProductMode] = useState(false);

	const products = (admin?.products || []).filter((p) => p.archived === false);
	const archivedProducts = (admin?.products || []).filter(
		(p) => p.archived === true
	);

	useEffect(() => {
		if (!admin?.access_token) return;
		Http.get('/product', {
			accessToken: admin.access_token,
			onSuccess: (data) => dispatch({ action: 'set-products', payload: data }),
			onFail: (message) => showNotification({ message, color: 'red' }),
		});
	}, [admin?.access_token, dispatch]);

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
						padding: '1rem',
					}}
					position='apart'
				>
					<Title order={2}> Inventory </Title>
					<Group
						spacing={'xl'}
						align='center'
					>
						<Button
							radius={'xl'}
							variant={currentTab === 'all' ? 'filled' : 'outline'}
							onClick={() => setCurrentTab('all')}
						>
							All Products
						</Button>
						<Button
							radius={'xl'}
							variant={currentTab === 'archive' ? 'filled' : 'outline'}
							onClick={() => setCurrentTab('archive')}
						>
							Archive
						</Button>
						<Button
							radius={'xl'}
							variant={currentTab === 'add' ? 'filled' : 'light'}
							onClick={() => setCurrentTab('add')}
							rightIcon={<IconPlus />}
						>
							Add Product
						</Button>
					</Group>
				</Group>

				<section
					style={{ paddingRight: '2rem' }}
					hidden={currentTab !== 'all'}
				>
					<Title
						weight={'normal'}
						order={2}
						mb={'xl'}
					>
						All Products
					</Title>

					<Table
						striped
						verticalSpacing='xl'
						fontSize='md'
					>
						<thead>
							<tr>
								<th>Product Name</th>
								<th>Description</th>
								<th>Stock</th>
								<th>Price/Unit</th>
								<th>Menu</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr key={product.id}>
									<td>{product.name}</td>
									<td>{product.description}</td>
									<td>{product.stock}</td>
									<td>{product.unit_price}</td>
									<td>
										<Menu
											shadow='md'
											width={200}
											position='left-start'
										>
											<Menu.Target>
												<ActionIcon>
													<IconDots size={30} />
												</ActionIcon>
											</Menu.Target>

											<Menu.Dropdown>
												<Menu.Label>{product.name}</Menu.Label>
												<Menu.Item
													onClick={() => setSelectedProduct(product)}
													icon={<IconListDetails size={14} />}
												>
													View Details
												</Menu.Item>
												<Menu.Item
													onClick={() => {
														setSelectedProduct(product);
														setIsInEditProductMode(true);
													}}
													icon={<IconPencil size={14} />}
												>
													Edit
												</Menu.Item>

												<Menu.Divider />

												<Menu.Label>Danger zone</Menu.Label>
												<Menu.Item
													onClick={() => {
														dispatch({
															action: 'archive-product',
															payload: product.id,
														});
													}}
													icon={<IconArchive size={14} />}
												>
													Archived
												</Menu.Item>
												<Menu.Item
													disabled
													color='red'
													icon={<IconTrash size={14} />}
												>
													Delete permanently
												</Menu.Item>
											</Menu.Dropdown>
										</Menu>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</section>

				<section
					style={{ paddingRight: '2rem' }}
					hidden={currentTab !== 'archive'}
				>
					<Title
						weight={'normal'}
						order={2}
						mb={'xl'}
					>
						Arhived Products
					</Title>

					<Table
						striped
						verticalSpacing='xl'
						fontSize='md'
					>
						<thead>
							<tr>
								<th>Product Name</th>
								<th>Description</th>
								<th>Stock</th>
								<th>Price/Unit</th>
								<th>Menu</th>
							</tr>
						</thead>
						<tbody>
							{archivedProducts.map((product) => (
								<tr key={product.id}>
									<td>{product.name}</td>
									<td>{product.description}</td>
									<td>{product.stock}</td>
									<td>{product.unit_price}</td>
									<td>
										<Menu
											shadow='md'
											width={200}
											position='left-start'
										>
											<Menu.Target>
												<ActionIcon>
													<IconDots size={30} />
												</ActionIcon>
											</Menu.Target>

											<Menu.Dropdown>
												<Menu.Label>{product.name}</Menu.Label>
												<Menu.Item
													onClick={() => setSelectedProduct(product)}
													icon={<IconListDetails size={14} />}
												>
													View Details
												</Menu.Item>
												<Menu.Item
													onClick={() => {
														setSelectedProduct(product);
														setIsInEditProductMode(true);
													}}
													icon={<IconPencil size={14} />}
												>
													Edit
												</Menu.Item>

												<Menu.Divider />

												<Menu.Label>Danger zone</Menu.Label>
												<Menu.Item
													onClick={() => {
														dispatch({
															action: 'unarchive-product',
															payload: product.id,
														});
													}}
													icon={<IconArchive size={14} />}
												>
													Remove from archive
												</Menu.Item>
												<Menu.Item
													disabled
													color='red'
													icon={<IconTrash size={14} />}
												>
													Delete permanently
												</Menu.Item>
											</Menu.Dropdown>
										</Menu>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</section>

				<section hidden={currentTab !== 'add'}>
					<AddProduct />
				</section>
			</Stack>

			{selectedProduct && !isInEditProductMode && (
				<ViewProductModal
					onEditClicked={() => setIsInEditProductMode(true)}
					product={selectedProduct}
					opened={selectedProduct !== undefined && !isInEditProductMode}
					onClose={() => setSelectedProduct(undefined)}
				/>
			)}
			{selectedProduct && isInEditProductMode && (
				<EditProductModal
					product={selectedProduct}
					opened={selectedProduct !== undefined && isInEditProductMode}
					onClose={() => {
						setSelectedProduct(undefined);
						setIsInEditProductMode(false);
					}}
				/>
			)}
		</>
	);
}
