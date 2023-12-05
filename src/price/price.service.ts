import { db } from "../utils/db.server";

export type Price = {
  id: number;
  salePrice: number;
  saleSplit: number;
  saleStart: Date;
  saleEnd: Date;
  tprPrice: number;
  tprSplit: number;
  tprStart: Date;
  tprEnd: Date;
  productId: number;
};

export const listDetails = async (): Promise<Price[]> => {
  return db.price.findMany({
    select: {
      id: true,
      salePrice: true,
      saleSplit: true,
      saleStart: true,
      saleEnd: true,
      tprPrice: true,
      tprSplit: true,
      tprStart: true,
      tprEnd: true,
      productId: true,
    },
  });
};

export const getProductDetail = async (id: number): Promise<Price | null> => {
  return db.price.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      salePrice: true,
      saleSplit: true,
      saleStart: true,
      saleEnd: true,
      tprPrice: true,
      tprSplit: true,
      tprStart: true,
      tprEnd: true,
      productId: true,
    },
  });
};

export const createDetails = async (details: Price): Promise<Price> => {
  const {
    salePrice,
    saleSplit,
    saleStart,
    saleEnd,
    tprPrice,
    tprSplit,
    tprStart,
    tprEnd,
    productId,
  } = details;
  return db.price.create({
    data: {
      salePrice,
      saleSplit,
      saleStart,
      saleEnd,
      tprPrice,
      tprSplit,
      tprStart,
      tprEnd,
      productId,
    },
    select: {
      id: true,
      salePrice: true,
      saleSplit: true,
      saleStart: true,
      saleEnd: true,
      tprPrice: true,
      tprSplit: true,
      tprStart: true,
      tprEnd: true,
      productId: true,
    },
  });
};

export const updateProductDetail = async (
  detail: Price,
  id: number,
): Promise<Price> => {
  const {
    salePrice,
    saleSplit,
    saleStart,
    saleEnd,
    tprPrice,
    tprSplit,
    tprStart,
    tprEnd,
    productId,
  } = detail;
  return db.price.update({
    where: {
      id,
    },
    data: {
      salePrice,
      saleSplit,
      saleStart,
      saleEnd,
      tprPrice,
      tprSplit,
      tprStart,
      tprEnd,
      productId,
    },
    select: {
      id: true,
      salePrice: true,
      saleSplit: true,
      saleStart: true,
      saleEnd: true,
      tprPrice: true,
      tprSplit: true,
      tprStart: true,
      tprEnd: true,
      productId: true,
    },
  });
};

export const deleteProductDetail = async (id: number): Promise<void> => {
  await db.price.delete({
    where: {
      id,
    },
  });
};
