const outputFile = './open-api.json'
const endpointsFiles = ['../api/routes/*.js', '../api/routes/*.ts']
import swaggerAutogen = require('swagger-autogen')
const metadata = require('../config/open-api')
swaggerAutogen(outputFile, endpointsFiles, metadata.metadata)
