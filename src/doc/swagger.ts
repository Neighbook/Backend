const outputFile = './openapi.json'
const endpointsFiles = ['../api/routes/*/*.js', '../api/routes/*/*.ts', ]
import swaggerAutogen = require('swagger-autogen')
const metadata = require('../config/openapi')
swaggerAutogen(outputFile, endpointsFiles, metadata.metadata)
