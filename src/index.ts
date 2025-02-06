import express from "express";
import bodyParser from "body-parser";
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from "swagger-jsdoc";


// Controllers
import ProductController from "./product/presentation/product.controller"
import OrderController from "./order/presentation/order.controller"

const app = express();
const PORT = 3010;

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'My Express.js API',
            version: '1.0.0',
            description: 'A sample Express.js API built with TypeScript and Swagger',
        },
    },
    apis: ['./*.ts'],
};
const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.json());

app.get("/", (request, response) => {
    response.send("Hello world !");
});

app.use("/api/products", ProductController)

app.use("/api/orders", OrderController)

app.listen(PORT, () => {
    console.log("App started");
    console.log(`Lien du serveur (en local) : http://localhost:${PORT}`);
});
