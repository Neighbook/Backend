import swaggerAutogen from 'swagger-autogen';

import { metadata } from '../config/openapi';

const outputFile = './openapi.json';
const endpointsFiles = ['../api/routes/*/*.js', '../api/routes/*/*.ts'];

swaggerAutogen(outputFile, endpointsFiles, metadata);
