const options = {
    openapi: '3.0.0',
    language: "en-US",
    disableLogs: true,
    autoHeaders: true,
    autoQuery: true,
    autoBody: true,
    writeOutputFile: true
};

const swaggerAutogen = require('swagger-autogen')(options)

const outputFile = './swagger_output.json'
const endpointsFiles = ['app.js']

swaggerAutogen(outputFile, endpointsFiles).then()
