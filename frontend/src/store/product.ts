import { create } from 'zustand';
//import { devtools, persist } from 'zustand/middleware';

interface Product {
  name: string;
  price: number;
  image: string;
}

interface CreateProductResponse {
  success: boolean;
  message: string;
}

interface ProductState {
  products: Product[];
  //addProduct: (product: Product) => void;
  //removeProduct: (id: string) => void;
  //updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
  createProduct: (product: Product) => Promise<CreateProductResponse>; // Optional for creating a product
  setProducts: (products: Product[]) => void; // Optional for setting initial products
}

export const useProductStore = create<ProductState>()(
  (set) => ({
	products: [],
	/*
	addProduct: (product) => set((state) => ({
	  products: [...state.products, product],
	})),
	removeProduct: (id) => set((state) => ({
	  products: state.products.filter((product) => product.id !== id),
	})),
	updateProduct: (id, updatedProduct) => set((state) => ({
	  products: state.products.map((product) => ({
		...product,
		...(product.id === id ? updatedProduct : {}),
	  })),
	})),
	*/
	setProducts: (products) => set({ products }), // Optional method to set products
	createProduct: async (product) =>  {
		if (!product.name || !product.price || !product.image) {
			const response: CreateProductResponse = {
				success: false,
				message: 'All fields are required.',
			}
			return response;
		}
		const newProduct: Product = {
		  name: product.name,
		  price: product.price,
		  image: product.image,
		};

		const res = await fetch('http://localhost:5000/api/products', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newProduct),
		})
		const data = await res.json();
		if (res.ok) {
			set((state) => ({
		  		products: [...state.products, data.data],
			}));
			console.log('Product added:', newProduct);
			const success: CreateProductResponse = {
				success: true,
				message: 'Product created successfully.',
			};

			return success;
		}
		const failure: CreateProductResponse = {
			success: false,
			message: data.message || 'Failed to create product.',
		};

		return failure;
  }
}))