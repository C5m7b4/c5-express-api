/**
 * @swagger
 * components:
 *   schemas:
 *     Link:
 *       type: object
 *       required:
 *         - id
 *         - productId
 *         - categoryId
 *         - departmentId
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the department
 *         productId:
 *           type: number
 *         categoryId:
 *            type: number
 *         departmentId:
 *            type: number
 *       example:
 *         id: 1
 *         productId: 1
 *         categoryId: 2
 *         departmentId: 3
 */

/**
 * @swagger
 * paths:
 *  /api/links/{id}:
 *    get:
 *      summary: get link by id
 *      tags:
 *        - Link
 *    delete:
 *      summary: delete a link
 *      tags:
 *        - Link
 *    put:
 *      summary: update a link
 *      tags:
 *        - Link
 *  /api/links:
 *    get:
 *      summary: get link listing
 *      tags:
 *       - Link
 *    post:
 *      summary: create a new link
 *      tags:
 *        - Link
 */

import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { Error } from "../types";

import * as LinkService from "./link.service";

export const linkRouter = express.Router();

/**
 * @openapi
 * /api/links:
 *  get:
 *    tag:
 *    - links
 *    description: list all links
 *    responses:
 *        200:
 *          description: you should see a list of products
 *        500:
 *          description: something went wrong
 */
linkRouter.get("/", async (req: Request, resp: Response) => {
  try {
    const links = await LinkService.getLinks();
    return resp.status(200).json(links);
  } catch (error) {
    return resp.status(500).json((error as Error).message);
  }
});

/**
 * @openapi
 * /api/links/{id}:
 *  get:
 *    tag:
 *    - links
 *    description: get a single link by its id
 *    parameters:
 *    - name: id
 *      in: path
 *      description: the id of the link you want
 *      required: true
 *    responses:
 *        200:
 *          description: you should see a list of links
 *        404:
 *          description: your link was not found
 *        500:
 *          description: could not find your link or unknown message
 */
linkRouter.get("/:id", async (req: Request, resp: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const link = await LinkService.getLinkById(id);
    if (!link) {
      return resp.status(404).json("could not find our link");
    }
    return resp.status(200).json(link);
  } catch (error) {
    return resp.status(500).json((error as Error).message);
  }
});

/**
 * @openapi
 * /api/links:
 *  post:
 *    tag:
 *    - links
 *    description: Create a new link
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              productId:
 *                type: number
 *              categoryId:
 *                type:  number
 *              departmentId:
 *                type: number
 *            required:
 *              - productId
 *              - categoryId
 *              - departmentId
 *    responses:
 *        200:
 *          description: you should see the details of the department you just created
 *        400:
 *          description: errors in your validation, missing form fields
 *        500:
 *          description: something went wrong
 */
linkRouter.post(
  "/",
  body("categoryId").isInt(),
  body("departmentId").isInt(),
  body("productId").isInt(),
  async (req: Request, resp: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }
    try {
      const post = req.body;
      const newPost = await LinkService.createLink(post);
      return resp.status(200).json(newPost);
    } catch (error) {
      return resp.status(500).json((error as Error).message);
    }
  },
);

/**
 * @openapi
 * /api/links/{id}:
 *  put:
 *    tag:
 *    - links
 *    description: update a link by its id
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id of the link to update
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
 *              productId:
 *                type: number
 *              categoryId:
 *                type: number
 *              departmentId:
 *                type: number
 *            required:
 *              - id
 *              - productId
 *              - categoryId
 *              - departmentId
 *    responses:
 *        200:
 *          description: you should see the updated links
 *        400:
 *          description: error validating fields
 *        500:
 *          description: could not find your link or unknown message
 */
linkRouter.put(
  "/:id",
  body("categoryId").isInt(),
  body("departmentId").isInt(),
  body("productId").isInt(),
  async (req: Request, resp: Response) => {
    const id: number = parseInt(req.params.id, 10);
    try {
      const link = req.body;
      const newLink = await LinkService.updateLink(link, id);
      return resp.status(200).json(newLink);
    } catch (error) {
      return resp.status(500).json((error as Error).message);
    }
  },
);

/**
 * @openapi
 * /api/links/{id}:
 *  delete:
 *    tag:
 *    - links
 *    description: delete a link by its id
 *    parameters:
 *    - name: id
 *      in: path
 *      description: the id of the link you want to delete
 *      required: true
 *    responses:
 *        200:
 *          description: your link was deleted
 *        500:
 *          description: could not find your link or unknown message
 */
linkRouter.delete("/:id", async (req: Request, resp: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    await LinkService.deleteLink(id);
    return resp.status(200).json("your link was deleted");
  } catch (error) {
    return resp.status(500).json((error as Error).message);
  }
});
