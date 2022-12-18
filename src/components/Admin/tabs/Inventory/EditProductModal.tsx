import { Modal } from '@mantine/core';
import React, { useState } from 'react';
import { Product } from '~/entities-interfaces/product.entity';

type Props = {
	opened: boolean;
	product: Product;
	onClose: () => void;
};

export default function EditProductModal({
	onClose,
	opened,
	product: p,
}: Props) {
	const [product, setProduct] = useState<Product>(p);

	return (
		<Modal
			radius={'xl'}
			closeOnEscape
			opened={opened}
			onClose={onClose}
			title={'Edit Product'}
			closeOnClickOutside={false}
		>
			Hello
		</Modal>
	);
}
