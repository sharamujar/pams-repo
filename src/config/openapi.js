import swaggerJSDoc from 'swagger-jsdoc';

export default async function serveSwaggerSpecification(req, res) {
  const swaggerDefinition = {
    openapi: '3.0.0',
        info: {
            title: 'Express API for PAMS',
            version: '1.0.0',
        },
        tags: [
          {
            name: 'Users',
            description: 'Operations related to user management',
          }
        ],
    };

    const options = {
        swaggerDefinition,
        // Paths to files containing OpenAPI definitions
        apis: ['./src/routes/*.js'],
    };

    const openapiSpecification = swaggerJSDoc(options);

  res.setHeader('Content-Type', 'application/json');
  res.send(openapiSpecification);
}