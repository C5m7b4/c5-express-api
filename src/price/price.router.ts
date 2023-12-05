/**
 * @swagger
 * components:
 *   schemas:
 *     Price:
 *       type: object
 *       required:
 *         - salePrice
 *         - saleSplit
 *         - saleStart
 *         - saleEnd
 *         - tprPrice
 *         - tprSplit
 *         - tprStart
 *         - tprEnd
 *       properties:
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
 *  /api/price/{id}:
 *    get:
 *      summary: get price by id
 *      tags:
 *        - Price
 *    delete:
 *      summary: delete a price
 *      tags:
 *        - Price
 *    put:
 *      summary: update a price
 *      tags:
 *        - Price
 *  /api/price:
 *    get:
 *      summary: get price listing
 *      tags:
 *       - Price
 *    post:
 *      summary: create a new price
 *      tags:
 *        - Price
 */

import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Error } from "../types";

import * as PriceService from "./price.service";

export const priceRouter = express.Router();

/**
 * @openapi
 * /api/price:
 *  get:
 *    tag:
 *    - price
 *    description: list all prices
 *    responses:
 *        200:
 *          description: you should see a list of prices
 *        500:
 *          description: something went wrong
 */
priceRouter.get("/", async (req: Request, resp: Response) => {
  try {
    const details = await PriceService.listDetails();
    return resp.status(200).json(details);
  } catch (error) {
    return resp.status(500).json((error as Error).message);
  }
});

/**
 * @openapi
 * /api/price/{id}:
 *  get:
 *    tag:
 *    - prices
 *    description: get a single price by its id
 *    parameters:
 *    - name: id
 *      in: path
 *      description: the id of the price you want
 *      required: true
 *    responses:
 *        200:
 *          description: you should see a list of prices
 *        404:
 *          description: your price was not found
 *        500:
 *          description: could not find your book or unknown message
 */
priceRouter.get("/:id", async (req: Request, resp: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const detail = await PriceService.getProductDetail(id);
    return resp.status(200).json(detail);
  } catch (error) {
    return resp.status(500).json((error as Error).message);
  }
});

/**
 * @openapi
 * /api/price:
 *  post:
 *    tag:
 *    - price
 *    description: Create price details for a product
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
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
priceRouter.post(
  "/",
  body("salePrice").isFloat(),
  body("saleSplit").isInt(),
  body("saleStart").isString(),
  body("saleEnd").isString(),
  body("tprPrice").isFloat(),
  body("tprSplit").isInt(),
  body("tprStart").isString(),
  body("tprEnd").isString(),
  async (req: Request, resp: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }
    try {
      const details = req.body;
      const newDetails = await PriceService.createDetails(details);
      return resp.status(200).json(newDetails);
    } catch (error) {
      return resp.status(500).json((error as Error).message);
    }
  },
);

/**
 * @openapi
 * /api/price/{id}:
 *  put:
 *    tag:
 *    - price
 *    description: update a price by its id
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id of the price to update
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              salePrice:
 *                type: number
 *              saleSplit:
 *                type: number
 *              saleStart:
 *                type: number
 *              saleEnd:
 *                type: number
 *            required:
 *              - salePrice
 *              - saleSplit
 *              - saleStart
 *              - saleEnd
 *    responses:
 *        200:
 *          description: you should see the updated category
 *        400:
 *          description: error validating fields
 *        500:
 *          description: could not find your categoru or unknown message
 */
priceRouter.put(
  "/:id",
  body("salePrice").isFloat(),
  body("saleSplit").isInt(),
  body("saleStart").isDate().toDate(),
  body("saleEnd").isDate().toDate(),
  body("tprPrice").isFloat(),
  body("tprSplit").isInt(),
  body("tprStart").isDate().toDate(),
  body("tprEnd").isDate().toDate(),
  async (req: Request, resp: Response) => {
    const detail = req.body;
    const id: number = parseInt(req.params.id, 10);

    try {
      const newDetails = await PriceService.updateProductDetail(detail, id);
      return resp.status(200).json(newDetails);
    } catch (error) {
      return resp.status(500).json((error as Error).message);
    }
  },
);

/**
 * @openapi
 * /api/price/{id}:
 *  delete:
 *    tag:
 *    - products
 *    description: delete a products  details by its id
 *    parameters:
 *    - name: id
 *      in: path
 *      description: the id of the product details you want to delete
 *      required: true
 *    responses:
 *        200:
 *          description: your product was deleted
 *        500:
 *          description: could not find your product or unknown message
 */
priceRouter.delete("/:id", async (req: Request, resp: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    await PriceService.deleteProductDetail(id);
    return resp.status(200).json("your details have been deleted");
  } catch (error) {
    return resp.status(500).json((error as Error).message);
  }
});
