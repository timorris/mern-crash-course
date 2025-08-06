import { create } from 'zustand';
//import { devtools, persist } from 'zustand/middleware';

interface Product {
  _id?: string; // Optional for new products not yet saved
  name: string;
  price: number;
  image: string;
}

interface ProductResponse {
  success: boolean;
  message: string;
}

interface ProductState {
  products: Product[];
  //addProduct: (product: Product) => void;
  //removeProduct: (id: string) => void;
  //updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
  createProduct: (product: Product) => Promise<ProductResponse>; // Optional for creating a product
  setProducts: (products: Product[]) => void; // Optional for setting initial products
  fetchProducts: () => Promise<Product[]>; // Optional for fetching products from an API
  deleteProduct: (id: string) => Promise<ProductResponse>; // Optional for deleting a product
  updateProduct: (id: string, updatedProduct: Product) => Promise<ProductResponse>; // Required for updating a product
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
			const response: ProductResponse = {
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
			const success: ProductResponse = {
				success: data.success,
				message: data.message,
			};

			return success;
		}
		const failure: ProductResponse = {
			success: false,
			message: data.message || 'Failed to create product.',
		};

		return failure;
  },
  fetchProducts: async () => {
	const res = await fetch('http://localhost:5000/api/products');
	const data = await res.json();
	if (res.ok) {
	  set({ products: data.data });
	  return data.data;
	} else {
	  console.error('Failed to fetch products:', data.message);
	  return [];
	}
  },
  deleteProduct: async (id) => {
	if (!id) {
		return {
			success: false,
			message: 'Product ID is required.',
		};
	}
	const res = await fetch(`http://localhost:5000/api/products/${id}`, {
	  method: 'DELETE',
	});
	const data = await res.json();
	if (res.ok) {
	  set((state) => ({
		products: state.products.filter((product) => product._id !== id),
	  }));
		const success: ProductResponse = {
			success: data.success,
			message: data.message,
		};
		return success;
	}
	const failure: ProductResponse = {
		success: false,
		message: data.message || 'Failed to delete product.',
	};

	return failure;
},
	updateProduct: async (id, updatedProduct) => {
	if (!id || !updatedProduct) {
		return {
			success: false,
			message: 'Product ID and updated product data are required.',
		};
	}
	const res = await fetch(`http://localhost:5000/api/products/${id}`, {
	  method: 'PUT',
	  headers: {
		'Content-Type': 'application/json',
	  },
	  body: JSON.stringify(updatedProduct),
	});
	const data = await res.json();
	if (res.ok) {
	  set((state) => ({
		products: state.products.map((product) => product._id === id ? data.data : product),
	  /*
		products: state.products.map((product) => ({
		  ...product,
		  ...(product._id === id ? { ...product, ...updatedProduct } : {}),
		})),
	  */
	  }));
	  const success: ProductResponse = {
		success: data.success,
		message: data.message,
	  };
	  return success;
    }
	const failure: ProductResponse = {
		success: false,
		message: data.message || 'Failed to update product.',
	};
	return failure;
}

}));