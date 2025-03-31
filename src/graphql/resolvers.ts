import { ProductAPI } from '../server/ProductApi.js';

interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  stock: number;
}

interface ProductInput {
  name: string;
  description?: string;
  price: number;
  category: string;
  stock?: number;
}

const productAPI = new ProductAPI();

export const eCommerceRootValue = {
  getProductById: async ({ id }: { id: string }): Promise<Product> => {
    return productAPI.getProductById(id);
  },
  getAllProducts: async (): Promise<Product[]> => {
    return productAPI.getAllProducts();
  },
  addProduct: async ({ input }: { input: ProductInput }): Promise<{ message: string }> => {
    const product = await productAPI.addProduct(input);
    return { message: `✅ Product '${input.name}' added with ID: ${product._id}` };
  },
};