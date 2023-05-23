import swaggerAutogen from 'swagger-autogen';

import { metadata } from '../config/openapi';

const outputFile = './dist/doc/openapi.json';
const endpointsFiles = ['../api/routes/*/*.js', '../api/routes/*/*.ts'];

swaggerAutogen(outputFile, endpointsFiles, metadata);
