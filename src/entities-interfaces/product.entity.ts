export interface Product {
	id: string;
	name: string;
	description: string;
	unit_price: number;
	stock: number;
	image_url: string;
	archived: boolean;
}