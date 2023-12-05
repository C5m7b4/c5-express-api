import { db } from "../utils/db.server";
import type { Price } from "../price/price.service";

export type Product = {
  id: number;
  upc: string;
  description: string;
  retailPrice: number;
  retailSplit: number;
  price?: Price;
};

export const listProducts = async (): Promise<Product[]> => {
  return db.product.findMany({
    select: {
      id: true,
      upc: true,
      description: true,
      retailPrice: true,
      retailSplit: true,
      // price: {
      //   select: {
      //     salePrice: true,
      //     saleSplit: true,
      //     saleStart: true,
      //     saleEnd: true,
      //     tprPrice: true,
      //     tprSplit: true,
      //     tprStart: true,
      //     tprEnd: true,
      //   },
      // },
    },
  });
};

export const getProduct = async (id: number): Promise<Product | null> => {
  return db.product.findUnique({
    where: {
      id,
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

export const createProduct = async (
  product: Omit<Product, "details">,
): Promise<Product> => {
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

export const updateProduct = async (
  product: Product,
  id: number,
): Promise<Product> => {
  const { upc, description, retailPrice, retailSplit } = product;
  return db.product.update({
    where: {
      id,
    },
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

export const deleteProduct = async (id: number): Promise<void> => {
  await db.product.delete({
    where: {
      id,
    },
  });
};
