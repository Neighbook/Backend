import swaggerAutogen from 'swagger-autogen';

const outputFile = './openapi.json';
const endpointsFiles = ['../api/routes/*/*.js', '../api/routes/*/*.ts'];

const metadata = require('../config/openapi');
swaggerAutogen(outputFile, endpointsFiles, metadata.metadata);
