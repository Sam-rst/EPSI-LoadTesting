import express from "express";
import { CreateProductUseCase } from "../application/create-product.usecase";
import { GetAllProductsUseCase } from "../application/get-all-products.usecase";
import { GetProductUseCase } from "../application/get-product.usecase";
import { ProductContainer } from "../product.container";
import { UpdateProductUseCase } from "../application/update-product.usecase";
import { OrderContainer } from "../../order/order.container";
import { DeleteProductUseCase } from "../application/delete-product.usecase";


const router = express.Router();

router.get("", (request, response) => {
    try {
        const productRepository = ProductContainer.getProductRepositoryInMemory();
        const getAllProductsUseCase = new GetAllProductsUseCase(productRepository);

        const products = getAllProductsUseCase.execute();
        response.status(201).json(products);
    } catch (error: any) {
        response.status(400).json({ error: error.message });
    }
});

router.post("", (request, response) => {
    try {
        const title = request.body.title;
        const price = request.body.price;
        const description = request.body.description;

        const productRepository = ProductContainer.getProductRepositoryInMemory();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        const product = createProductUseCase.execute(title, price, description);
        response.status(201).json(product);
    } catch (error: any) {
        response.status(400).json({ error: error.message })
    }
})

router.get("/:productId", (request, response) => {
    try {
        const productId = parseInt(request.params.productId);

        const productRepository = ProductContainer.getProductRepositoryInMemory();
        const getProductUseCase = new GetProductUseCase(productRepository);

        const product = getProductUseCase.execute(productId);
        response.status(200).json(product);
    } catch (error: any) {
        response.status(400).json({ error: error.message });
    }
});

router.patch("/:productId", (request, response) => {
    try {
        const productId = parseInt(request.params.productId);
        const title = request.body.title;
        const price = request.body.price;
        const description = request.body.description;

        const productRepository = ProductContainer.getProductRepositoryInMemory();
        const updateProductUseCase = new UpdateProductUseCase(productRepository);

        const product = updateProductUseCase.execute(productId, title, price, description);
        response.status(200).json(product);
    } catch (error: any) {
        response.status(400).json({ error: error.message });
    }
});

router.delete("/:productId", (request, response) => {
    try {
        const productId = parseInt(request.params.productId);

        const orderRepository = OrderContainer.getOrderRepositoryInMemory();
        const productRepository = ProductContainer.getProductRepositoryInMemory();
        const deleteProductUseCase = new DeleteProductUseCase(productRepository, orderRepository);

        const product = deleteProductUseCase.execute(productId);
        response.status(200).json(product);
    } catch (error: any) {
        response.status(400).json({ error: error.message });
    }
});

export default router;