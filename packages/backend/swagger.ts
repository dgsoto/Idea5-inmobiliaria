import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: 'v1.0.0',
    title: 'Bonpland Api documentation',
    description: '',
  },
  servers: [
    {
      url: 'http://localhost:3002/api',
      description: '',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
    schemas: {
      CreateUserRequest: {
        id: 'string',
        firstname: 'string',
        lastname: 'string',
        email: 'string',
        password: 'string',
        phone: 'string',
      },

      LoginRequest: {
        email: 'string',
        password: 'string',
      },
    },
  },
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/app/routes.ts'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
