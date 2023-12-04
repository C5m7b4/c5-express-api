/**
 * @swagger
 * components:
 *   schemas:
 *     ProductDetails:
 *       type: object
 *       required:
 *         - productId
 *         - salePrice
 *         - saleSplit
 *         - saleStart
 *         - saleEnd
 *         - tprPrice
 *         - tprSplit
 *         - tprStart
 *         - tprEnd
 *       properties:
 *         productId:
 *           type: string
 *           description: The auto-generated id of the product details
 *         salePrice:
 *           type: string
 *           description: sale price of item
 *         saleSplit:
 *           type: string
 *           description: split price of the sale
 *         saleStart:
 *           type: string
 *           description: start date of the sale
 *         saleEnd:
 *           type: string
 *           descripton: End date of the sale
 *         tprPrice:
 *           type: string
 *         tprSplit:
 *           type: string
 *         tprStart:
 *           type: string
 *         tprEnd:
 *           type: string
 *       example:
 *         productId: 1
 *         salePrice: 2.39
 *         saleSplit: 1
 *         saleStart: 2/23/2023
 *         saleEnd: 2/25/2023
 *         tprPrice: 1.99
 *         tprSplit: 1
 *         tprStart: 1/19/2023
 *         tprEnd: 1/25/2023
 */

/**
 * @swagger
 * paths:
 *  /api/productdetails:
 *    post:
 *      summary: create details for a product
 *      tags:
 *        - ProductDetails
 */

import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import * as ProductDetailsService from './productDetails.service';

export const productDetailsRouter = express.Router();

/**
 * @openapi
 * /api/productdetails:
 *  post:
 *    tag:
 *    - productdetails
 *    description: Create details for a product
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              productId:
 *                type: number
 *              salePrice:
 *                type: number
 *              saleSplit:
 *                type: number
 *              saleStart:
 *                type: string
 *              saleEnd:
 *                type: string
 *              tprPrice:
 *                type: number
 *              tprSplit:
 *                type: number
 *              tprStart:
 *                type: string
 *              tprEnd:
 *                type: string
 *            required:
 *              - productId
 *              - salePrice
 *              - saleSplit
 *              - saleStart
 *              - saleEnd
 *              - tprPrice
 *              - tprSplit
 *              - tprStart
 *              - tprEnd
 *    responses:
 *        200:
 *          description: you should see the details of the product you just created
 *        400:
 *          description: errors in your validation, missing form fields
 *        500:
 *          description: something went wrong
 */
productDetailsRouter.post(
  '/',
  body('salePrice').isFloat(),
  body('saleSplit').isInt(),
  body('saleStart').isDate(),
  body('saleEnd').isDate(),
  body('tprPrice').isFloat(),
  body('tprSplit').isInt(),
  body('tprStart').isDate(),
  body('tprEnd').isDate(),
  body('productId').isInt(),
  async (req: Request, resp: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }
    try {
      const details = req.body();
      const newDetails = await ProductDetailsService.createDetails(details);
      return resp.status(200).json(newDetails);
    } catch (error: any) {
      return resp.status(500).json(error.message);
    }
  }
);
