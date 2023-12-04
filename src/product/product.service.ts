import { db } from '../utils/db.server';

export type Product = {
  id: number;
  upc: string;
  description: string;
  retailPrice: number;
  retailSplit: number;
};

export const listProducts = async (): Promise<Product[]> => {
  return db.product.findMany({
    select: {
      id: true,
      upc: true,
      description: true,
      retailPrice: true,
      retailSplit: true,
    },
  });
};

export const createProduct = async (product: Product): Promise<Product> => {
  const { upc, description, retailPrice, retailSplit } = product;

  return db.product.create({
    data: {
      upc,
      description,
      retailPrice,
      retailSplit,
    },
    select: {
      id: true,
      upc: true,
      description: true,
      retailPrice: true,
      retailSplit: true,
    },
  });
};
