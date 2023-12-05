/**
 * @swagger
 * components:
 *   schemas:
 *     Flag:
 *       type: object
 *       required:
 *         - productId
 *         - tax1
 *         - tax2
 *         - tax3
 *         - tax4
 *         - fs
 *         - wic
 *       properties:
 *         productId:
 *           type: number
 *         tax1:
 *           type: number
 *         tax2:
 *           type: number
 *         tax3:
 *           type: number
 *         tax4:
 *           type: number
 *         fs:
 *           type: number
 *         wic:
 *           type: number
 */

/**
 * @swagger
 * paths:
 *  /api/flags/{id}:
 *    get:
 *      summary: get flag by id
 *      tags:
 *        - Flag
 *    delete:
 *      summary: delete a flag
 *      tags:
 *        - Flag
 *    put:
 *      summary: update a flag
 *      tags:
 *        - Flag
 *  /api/flags:
 *    get:
 *      summary: get flag listing
 *      tags:
 *       - Flag
 *    post:
 *      summary: create a new flag
 *      tags:
 *        - Flag
 */

import express from "express";
import type { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import type { Error } from "../types";
import * as FlagService from "./flag.service";

export const flagRouter = express.Router();

/**
 * @openapi
 * /api/flags:
 *  get:
 *    tag:
 *    - flags
 *    description: list all flags
 *    responses:
 *        200:
 *          description: you should see a list of flags
 *        500:
 *          description: something went wrong
 */
flagRouter.get("/", async (req: Request, resp: Response) => {
  try {
    const flags = await FlagService.getFlags();
    return resp.status(200).json(flags);
  } catch (error) {
    return resp.status(500).json((error as Error).message);
  }
});

/**
 * @openapi
 * /api/flags/{id}:
 *  get:
 *    tag:
 *    - flags
 *    description: get a single flag by its id
 *    parameters:
 *    - name: id
 *      in: path
 *      description: the id of the flag you want
 *      required: true
 *    responses:
 *        200:
 *          description: you should see a list of flags
 *        404:
 *          description: your flag was not found
 *        500:
 *          description: could not find your flag or unknown message
 */
flagRouter.get("/:id", async (req: Request, resp: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const flag = await FlagService.getFlagById(id);
    if (!flag) {
      return resp.status(400).json("could not find your flag item");
    }
    return resp.status(200).json(flag);
  } catch (error) {
    return resp.status(500).json((error as Error).message);
  }
});

/**
 * @openapi
 * /api/flags:
 *  post:
 *    tag:
 *    - flags
 *    description: Create a new flag
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              productId:
 *                type: number
 *              tax1:
 *                type: number
 *              tax2:
 *                type: number
 *              tax3:
 *                type: number
 *              tax4:
 *                type: number
 *              fs:
 *                type: number
 *              wic:
 *                type: number
 *            required:
 *              - productId
 *              - tax1
 *              - tax2
 *              - tax3
 *              - tax4
 *              - fs
 *              - wic
 *    responses:
 *        200:
 *          description: you should see the details of the categories you just created
 *        400:
 *          description: errors in your validation, missing form fields
 *        500:
 *          description: something went wrong
 */
flagRouter.post(
  "/",
  body("tax1").isInt(),
  body("tax2").isInt(),
  body("tax3").isInt(),
  body("tax4").isInt(),
  body("fs").isInt(),
  body("wic").isInt(),
  async (req: Request, resp: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ error: errors.array() });
    }
    try {
      const flag = req.body;
      const newFlag = await FlagService.createFlag(flag);
      return resp.status(200).json(newFlag);
    } catch (error) {
      return resp.status(500).json((error as Error).message);
    }
  },
);

/**
 * @openapi
 * /api/flags/{id}:
 *  put:
 *    tag:
 *    - flags
 *    description: update a flag by its id
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id of the flag to update
 *        required: true
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              productId:
 *                type: number
 *              tax1:
 *                type: number
 *              tax2:
 *                type: number
 *              tax3:
 *                type: number
 *              tax4:
 *                type: number
 *              fs:
 *                type: number
 *              wic:
 *                type: number
 *            required:
 *              - productId
 *              - tax1
 *              - tax2
 *              - tax3
 *              - tax4
 *              - fs
 *              - wic
 *    responses:
 *        200:
 *          description: you should see the updated category
 *        400:
 *          description: error validating fields
 *        500:
 *          description: could not find your categoru or unknown message
 */
flagRouter.put(
  "/:id",
  body("tax1").isInt(),
  body("tax2").isInt(),
  body("tax3").isInt(),
  body("tax4").isInt(),
  body("fs").isInt(),
  body("wic").isInt(),
  async (req: Request, resp: Response) => {
    const id: number = parseInt(req.params.id, 10);
    try {
      const flag = req.body;
      const newFlag = await FlagService.updateFlag(flag, id);
      if (!newFlag) {
        return resp.status(404).json("your flag could not be found");
      }
      return resp.status(200).json(newFlag);
    } catch (error) {
      return resp.status(500).json((error as Error).message);
    }
  },
);

/**
 * @openapi
 * /api/flags/{id}:
 *  delete:
 *    tag:
 *    - flags
 *    description: delete a flag by its id
 *    parameters:
 *    - name: id
 *      in: path
 *      description: the id of the flag you want to delete
 *      required: true
 *    responses:
 *        200:
 *          description: your flag was deleted
 *        500:
 *          description: could not find your flag or unknown message
 */
flagRouter.delete("/:id", async (req: Request, resp: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    await FlagService.deleteFlag(id);
    return resp.status(200).json("your flag was deleted");
  } catch (error) {
    return resp.status(500).json((error as Error).message);
  }
});
