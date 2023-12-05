/**
 * @swagger
 * components:
 *   schemas:
 *     Department:
 *       type: object
 *       required:
 *         - id
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         description:
 *           type: string
 *           description: product id
 *       example:
 *         id: 1
 *         description: Grocery
 */

/**
 * @swagger
 * paths:
 *  /api/depts/{id}:
 *    get:
 *      summary: get department by id
 *      tags:
 *        - Department
 *    delete:
 *      summary: delete a department
 *      tags:
 *        - Department
 *    put:
 *      summary: update a department
 *      tags:
 *        - Department
 *  /api/depts:
 *    get:
 *      summary: get department listing
 *      tags:
 *       - Department
 *    post:
 *      summary: create a new department
 *      tags:
 *        - Department
 */

import express from "express";
import type { Response, Request } from "express";
import { body, validationResult } from "express-validator";
import type { Error } from "../types";

import * as DeptService from "./dept.service";

export const deptRouter = express.Router();

/**
 * @openapi
 * /api/depts:
 *  get:
 *    tag:
 *    - depts
 *    description: list all departments
 *    responses:
 *        200:
 *          description: you should see a list of products
 *        500:
 *          description: something went wrong
 */
deptRouter.get("/", async (req: Request, resp: Response) => {
  try {
    const depts = await DeptService.getDepartments();
    return resp.status(200).json(depts);
  } catch (error) {
    return resp.status(500).json((error as Error).message);
  }
});

/**
 * @openapi
 * /api/depts/{id}:
 *  get:
 *    tag:
 *    - depts
 *    description: get a single department by its id
 *    parameters:
 *    - name: id
 *      in: path
 *      description: the id of the department you want
 *      required: true
 *    responses:
 *        200:
 *          description: you should see a list of departments
 *        404:
 *          description: your department was not found
 *        500:
 *          description: could not find your book or unknown message
 */
deptRouter.get("/:id", async (req: Request, resp: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const dept = await DeptService.getDepartmentById(id);
    if (!dept) {
      return resp.status(404).json("your department was not found");
    }
    return resp.status(200).json(dept);
  } catch (error) {
    return resp.status(500).json((error as Error).message);
  }
});

/**
 * @openapi
 * /api/depts:
 *  post:
 *    tag:
 *    - depts
 *    description: Create a new department
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
 *          description: you should see the details of the department you just created
 *        400:
 *          description: errors in your validation, missing form fields
 *        500:
 *          description: something went wrong
 */
deptRouter.post(
  "/",
  body("id").isInt(),
  body("description").isString(),
  async (req: Request, resp: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }
    const dept = req.body;
    try {
      const newDept = await DeptService.createDepartment(dept);
      return resp.status(200).json(newDept);
    } catch (error) {
      return resp.status(500).json((error as Error).message);
    }
  },
);

/**
 * @openapi
 * /api/depts/{id}:
 *  put:
 *    tag:
 *    - depts
 *    description: update a dept by its id
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id of the department to update
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
 *          description: you should see the updated department
 *        400:
 *          description: error validating fields
 *        500:
 *          description: could not find your department or unknown message
 */
deptRouter.put(
  "/:id",
  body("id").isInt(),
  body("department").isString(),
  async (req: Request, resp: Response) => {
    const id: number = parseInt(req.params.id, 10);
    const dept = req.body;
    try {
      const newDept = await DeptService.updateDepartment(dept, id);
      return resp.status(200).json(newDept);
    } catch (error) {
      return resp.status(500).json((error as Error).message);
    }
  },
);

/**
 * @openapi
 * /api/depts/{id}:
 *  delete:
 *    tag:
 *    - depts
 *    description: delete a department by its id
 *    parameters:
 *    - name: id
 *      in: path
 *      description: the id of the department you want to delete
 *      required: true
 *    responses:
 *        200:
 *          description: your department was deleted
 *        500:
 *          description: could not find your department or unknown message
 */
deptRouter.delete("/:id", async (req: Request, resp: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    await DeptService.deleteDepartment(id);
    return resp.status(200).json("your department has been deleted");
  } catch (error) {
    return resp.status(500).json((error as Error).message);
  }
});
