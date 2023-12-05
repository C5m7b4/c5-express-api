import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
// import swaggerJsdoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';
import swaggerDocs from "./utils/swagger";

import { productRouter } from "./product/product.router";
import { priceRouter } from "./price/price.router";
import { deptRouter } from "./dept/dept.router";
import { categoryRouter } from "./category/category.router";
import { linkRouter } from "./link/link.router";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const port: number = parseInt(process.env.PORT as string, 10);

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/products", productRouter);
app.use("/api/prices", priceRouter);
app.use("/api/depts", deptRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/links", linkRouter);

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
  swaggerDocs(app, port);
  console.log(`swagger docs are available at http://localhost:${port}/docs`);
});
