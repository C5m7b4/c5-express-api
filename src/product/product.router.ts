/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - id
 *         - upc
 *         - description
 *         - retailPrice
 *         - retailSplit
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         upc:
 *           type: string
 *           description: product id
 *         retailPrice:
 *           type: string
 *           description: price of the item
 *         retailSplit:
 *           type: string
 *           description: split price for item
 *       example:
 *         id: d5fE_asz
 *         upc: 0000000000001
 *         description: Tasty Treats
 *         retailPrice: 2.39
 *         retailsplit: 1
 */

/**
 * @swagger
 * paths:
 *  /api/products/{id}:
 *    get:
 *      summary: get product by id
 *      tags:
 *        - Products
 *    delete:
 *      summary: delete a product
 *      tags:
 *        - Products
 *    put:
 *      summary: update a product
 *      tags:
 *        - Products
 *  /api/products:
 *    get:
 *      summary: get product listing
 *      tags:
 *       - Products
 *    post:
 *      summary: create a new product
 *      tags:
 *        - Products
 */

import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import * as ProductService from './product.service';

export const productRouter = express.Router();

/**
 * @openapi
 * /api/products:
 *  get:
 *    tag:
 *    - products
 *    description: list all products
 *    responses:
 *        200:
 *          description: you should see a list of products
 *        500:
 *          description: something went wrong
 */
productRouter.get('/', async (req: Request, resp: Response) => {
  try {
    const products = await ProductService.listProducts();
    return resp.status(200).json(products);
  } catch (error: any) {
    return resp.status(500).json(error.message);
  }
});

/**
 * @openapi
 * /api/products/{id}:
 *  get:
 *    tag:
 *    - products
 *    description: get a single product by its id
 *    parameters:
 *    - name: id
 *      in: path
 *      description: the id of the product you want
 *      required: true
 *    responses:
 *        200:
 *          description: you should see a list of books
 *        404:
 *          description: your product was not found
 *        500:
 *          description: could not find your book or unknown message
 */
productRouter.get('/:id', async (req: Request, resp: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const product = await ProductService.getProduct(id);
    if (product) {
      return resp.status(200).json(product);
    } else {
      return resp.status(404).json('your product was not found');
    }
  } catch (error: any) {
    return resp.status(500).json(error.message);
  }
});

/**
 * @openapi
 * /api/products:
 *  post:
 *    tag:
 *    - products
 *    description: Create a new product
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              upc:
 *                type: string
 *              description:
 *                type: string
 *              retailPrice:
 *                type: number
 *              retailSplit:
 *                type: number
 *            required:
 *              - upc
 *              - description
 *              - retailPrice
 *              - retailSplit
 *    responses:
 *        200:
 *          description: you should see the details of the product you just created
 *        400:
 *          description: errors in your validation, missing form fields
 *        500:
 *          description: something went wrong
 */
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

/**
 * @openapi
 * /api/products/{id}:
 *  put:
 *    tag:
 *    - products
 *    description: update a product by its id
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id of the product to update
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              upc:
 *                type: string
 *              description:
 *                type: string
 *              retailPrice:
 *                type: number
 *              retailSplit:
 *                type: number
 *            required:
 *              - upc
 *              - description
 *              - retailPrice
 *              - retailSplit
 *    responses:
 *        200:
 *          description: you should see the updated product
 *        400:
 *          description: error validating fields
 *        500:
 *          description: could not find your product or unknown message
 */
productRouter.put(
  '/:id',
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
      const id: number = parseInt(req.params.id, 10);
      const updatedProduct = await ProductService.updateProduct(product, id);
      return resp.status(200).json(updatedProduct);
    } catch (error: any) {
      return resp.status(500).json(error.message);
    }
  }
);

/**
 * @openapi
 * /api/products/{id}:
 *  delete:
 *    tag:
 *    - products
 *    description: delete a product by its id
 *    parameters:
 *    - name: id
 *      in: path
 *      description: the id of the product you want to delete
 *      required: true
 *    responses:
 *        200:
 *          description: your product was deleted
 *        500:
 *          description: could not find your product or unknown message
 */
productRouter.delete('/:id', async (req: Request, resp: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await ProductService.deleteProduct(id);
    return resp.status(200).json(`Your product id ${id} was deleted`);
  } catch (error: any) {
    return resp.status(500).json(error.message);
  }
});
