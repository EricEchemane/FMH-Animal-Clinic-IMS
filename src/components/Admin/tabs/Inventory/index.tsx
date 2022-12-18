import {
	Button,
	Group,
	Stack,
	Table,
	Title,
	ActionIcon,
	Menu,
	TextInput,
	Select,
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
import { setPriority } from 'os';
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
	const [stockFilter, setStockFilter] = useState('');
	const [priceFilter, setPriceFilter] = useState('');
	const [searchQuery, setSearchQuery] = useState('');

	const [products, setproducts] = useState(
		(admin?.products || []).filter((p) => p.archived === false)
	);
	const [archivedProducts, setArchivedProducts] = useState(
		(admin?.products || []).filter((p) => p.archived === true)
	);

	useEffect(() => {
		if (!admin?.access_token) return;
		Http.get('/product', {
			accessToken: admin.access_token,
			onSuccess: (data) => {
				dispatch({ action: 'set-products', payload: data });
				setproducts(data.filter((p: Product) => p.archived === false));
			},
			onFail: (message) => showNotification({ message, color: 'red' }),
		});
	}, [admin?.access_token, dispatch]);

	const searchListener = (e: React.ChangeEvent<HTMLInputElement>) => {
		// search product base on name and description and sort them base on match
		setSearchQuery(e.target.value);
		const search = e.target.value.toLowerCase();
		const filteredProducts = admin?.products
			.filter((p) => {
				const name = p.name.toLowerCase();
				const description = p.description.toLowerCase();
				return name.includes(search) || description.includes(search);
			})
			.sort((a, b) => {
				const nameA = a.name.toLowerCase();
				const nameB = b.name.toLowerCase();
				const descriptionA = a.description.toLowerCase();
				const descriptionB = b.description.toLowerCase();
				if (nameA.includes(search)) return -1;
				if (nameB.includes(search)) return 1;
				if (descriptionA.includes(search)) return -1;
				if (descriptionB.includes(search)) return 1;
				return 0;
			});
		setproducts(filteredProducts);
		setArchivedProducts(filteredProducts.filter((p) => p.archived === true));
	};

	const sortByPriceByOrder = (order: string) => {
		setPriceFilter(order);
		const sortedProducts = [...products].sort((a, b) => {
			if (order === 'asc') return a.unit_price - b.unit_price;
			if (order === 'desc') return b.unit_price - a.unit_price;
			return 0;
		});
		setproducts(sortedProducts);
	};

	const sortByStockByOrder = (order: string) => {
		setStockFilter(order);
		const sortedProducts = [...products].sort((a, b) => {
			if (order === 'asc') return a.stock - b.stock;
			if (order === 'desc') return b.stock - a.stock;
			return 0;
		});
		setproducts(sortedProducts);
	};

	const resetFilters = () => {
		setproducts((admin?.products || []).filter((p) => p.archived === false));
		setStockFilter('');
		setPriceFilter('');
		setSearchQuery('');
	};

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

				{currentTab !== 'add' && (
					<Group
						mb={'lg'}
						align={'flex-end'}
					>
						<TextInput
							variant='filled'
							label='Search product'
							placeholder='start typing'
							onChange={searchListener}
							value={searchQuery}
							style={{ width: '300px' }}
						/>
						<Select
							onChange={sortByPriceByOrder}
							variant='filled'
							label='Filter by Price'
							placeholder='Select order'
							value={priceFilter}
							data={[
								{ value: 'asc', label: 'Min - Max' },
								{ value: 'desc', label: 'Max - Min' },
							]}
						/>
						<Select
							onChange={sortByStockByOrder}
							variant='filled'
							label='Filter by Stock'
							placeholder='Select order'
							value={stockFilter}
							data={[
								{ value: 'asc', label: 'Min - Max' },
								{ value: 'desc', label: 'Max - Min' },
							]}
						/>
						<Button
							onClick={resetFilters}
							compact
							variant='outline'
							radius={'xl'}
						>
							Reset filters
						</Button>
					</Group>
				)}

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
					<AddProduct onClose={() => setCurrentTab('all')} />
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
