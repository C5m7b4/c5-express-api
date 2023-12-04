import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import * as ProductService from './product.service';

export const productRouter = express.Router();

productRouter.get('/', async (req: Request, resp: Response) => {
  try {
    const products = await ProductService.listProducts();
    return resp.status(200).json(products);
  } catch (error: any) {
    return resp.status(500).json(error.message);
  }
});

productRouter.post(
  '/',
  body('upc').isString(),
  body('description').isString(),
  body('retailPrice').isFloat(),
  body('retailSplit').isInt(),
  async (req: Request, resp: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }

    try {
      const product = req.body;
      const newProduct = await ProductService.createProduct(product);
      return resp.status(200).json(newProduct);
    } catch (error: any) {
      return resp.status(500).json(error.message);
    }
  }
);
