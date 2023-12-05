/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - id
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the category
 *         description:
 *           type: string
 *           description: category description
 *       example:
 *         id: 1
 *         description: mexican
 */

/**
 * @swagger
 * paths:
 *  /api/categories/{id}:
 *    get:
 *      summary: get category by id
 *      tags:
 *        - Category
 *    delete:
 *      summary: delete a category
 *      tags:
 *        - Category
 *    put:
 *      summary: update a category
 *      tags:
 *        - Category
 *  /api/categories:
 *    get:
 *      summary: get category listing
 *      tags:
 *       - Category
 *    post:
 *      summary: create a new category
 *      tags:
 *        - Category
 */

import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";

import * as CategoryService from "./category.service";

export const categoryRouter = express.Router();

/**
 * @openapi
 * /api/categories:
 *  get:
 *    tag:
 *    - categories
 *    description: list all categories
 *    responses:
 *        200:
 *          description: you should see a list of categories
 *        500:
 *          description: something went wrong
 */
categoryRouter.get("/", async (req: Request, resp: Response) => {
  try {
    const categories = await CategoryService.getCategories();
    return resp.status(200).json(categories);
  } catch (error) {
    return resp.status(500).json((error as Error).message);
  }
});

/**
 * @openapi
 * /api/categories/{id}:
 *  get:
 *    tag:
 *    - categories
 *    description: get a single category by its id
 *    parameters:
 *    - name: id
 *      in: path
 *      description: the id of the category you want
 *      required: true
 *    responses:
 *        200:
 *          description: you should see a list of categories
 *        404:
 *          description: your category was not found
 *        500:
 *          description: could not find your book or unknown message
 */
categoryRouter.get("/:id", async (req: Request, resp: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const category = await CategoryService.getCategoryById(id);
    if (!category) {
      return resp.status(404).json("your category was not found");
    }
    return resp.status(200).json(category);
  } catch (error) {
    return resp.status(500).json((error as Error).message);
  }
});

/**
 * @openapi
 * /api/categories:
 *  post:
 *    tag:
 *    - categories
 *    description: Create a new category
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: number
 *              description:
 *                type: string
 *            required:
 *              - id
 *              - description
 *    responses:
 *        200:
 *          description: you should see the details of the categories you just created
 *        400:
 *          description: errors in your validation, missing form fields
 *        500:
 *          description: something went wrong
 */
categoryRouter.post(
  "/",
  body("id").isInt(),
  body("description").isString(),
  async (req: Request, resp: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ error: errors.array() });
    }
    try {
      const category = req.body;
      const newCategory = await CategoryService.createCategory(category);
      return resp.status(200).json(newCategory);
    } catch (error) {
      return resp.status(500).json((error as Error).message);
    }
  },
);

/**
 * @openapi
 * /api/categories/{id}:
 *  put:
 *    tag:
 *    - categories
 *    description: update a category by its id
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id of the category to update
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: number
 *              description:
 *                type: string
 *            required:
 *              - id
 *              - description
 *    responses:
 *        200:
 *          description: you should see the updated category
 *        400:
 *          description: error validating fields
 *        500:
 *          description: could not find your categoru or unknown message
 */
categoryRouter.put(
  "/:id",
  body("id").isInt(),
  body("description").isString(),
  async (req: Request, resp: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const category = req.body;
    try {
      const newCategory = await CategoryService.updateCategory(category, id);
      return resp.status(200).json(newCategory);
    } catch (error) {
      return resp.status(500).json((error as Error).message);
    }
  },
);

/**
 * @openapi
 * /api/categories/{id}:
 *  delete:
 *    tag:
 *    - categories
 *    description: delete a category by its id
 *    parameters:
 *    - name: id
 *      in: path
 *      description: the id of the category you want to delete
 *      required: true
 *    responses:
 *        200:
 *          description: your category was deleted
 *        500:
 *          description: could not find your category or unknown message
 */
categoryRouter.delete("/:id", async (req: Request, resp: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    await CategoryService.deleteCategory(id);
    return resp.status(200).json("your category was deleted");
  } catch (error) {
    return resp.status(500).json((error as Error).message);
  }
});
