import { ProductAPI } from "../server/ProductApi.js";

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

export const eCommerceRootValue = {
  getProductById: async ({ id }: { id: string }): Promise<Product> => {
    const productAPI = new ProductAPI();
    return productAPI.getProductById(id);
  },
  getAllProducts: async (): Promise<Product[]> => {
    const productAPI = new ProductAPI();
    return productAPI.getAllProducts();
  },
  addProduct: async ({ input }: { input: ProductInput }): Promise<{ message: string }> => {
    const productAPI = new ProductAPI();
    const product = await productAPI.addProduct(input);
    return { message: `✅ Product '${input.name}' added with ID: ${product._id}` };
  },
};