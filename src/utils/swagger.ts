import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version } from '../../package.json';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'C5 Api',
      version,
      description: 'test api for creating instructional videos',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'C5',
        url: 'https://www.c5m7b4.com',
        email: 'c5m7b4@c5m7b4.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:8007',
      },
    ],
  },
  apis: [
    './src/product/product.router.ts',
    './src/productDetails/productDetails.router.ts',
  ],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
  // swagger page
  app.use(
    '/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, { explorer: true })
  );

  // docs in json format
  app.get('/docs.json', (req: Request, resp: Response) => {
    resp.setHeader('Content-Type', 'application/json');
    resp.send(swaggerSpec);
  });
}

export default swaggerDocs;
