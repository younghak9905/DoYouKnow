const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Question & Answer Service API',
        version: '1.0.0',
        description: 'API documentation for the Question & Answer Service',
    },
    servers: [
        {
            url: 'http://localhost:5000', // 서버 URL
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: [
        path.join(__dirname, './routes/*.js'), // Swagger 주석 기반 문서화
        path.join(__dirname, './docs/*.yaml'), // 외부 YAML 파일 기반 문서화
    ],
};

const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
    // Swagger UI 설정
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Swagger JSON 파일 직접 접근 경로
    app.get('/swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    console.log('Swagger documentation available at: http://localhost:5000/api-docs');
};

module.exports = setupSwagger;
