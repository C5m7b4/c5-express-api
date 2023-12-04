import { db } from '../utils/db.server';
import { Product } from '../product/product.service';

export type ProductDetails = {
  id: number;
  salePrice: number;
  saleSplit: number;
  saleStart: Date;
  saleEnd: Date;
  tprPrice: number;
  tprSplit: number;
  tprStart: Date;
  tprEnd: Date;
};

export const createDetails = async (
  details: ProductDetails
): Promise<ProductDetails> => {
  const {
    salePrice,
    saleSplit,
    saleStart,
    saleEnd,
    tprPrice,
    tprSplit,
    tprStart,
    tprEnd,
  } = details;
  return db.productDetails.create({
    data: {
      salePrice,
      saleSplit,
      saleStart,
      saleEnd,
      tprPrice,
      tprSplit,
      tprStart,
      tprEnd,
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
      // product: {
      //   select: {
      //     upc: true,
      //     description: true,
      //     retailPrice: true,
      //     retailSplit: true,
      //   },
      // },
    },
  });
};
