import express from "express";
import { AddProductToOrderUseCase } from "../application/add-product.usecase";
import { PayOrderUseCase } from "../application/pay-order.usecase";
import { GetOrderUseCase } from "../application/get-order.usecase";
import { GetOrdersUseCase } from "../application/get-orders.usecase";
import { CancelOrderUseCase } from "../application/cancel-order.usecase";
import { OrderContainer } from "../order.container";
import { ProductContainer } from "../../product/product.container";
import { ShipOrderUseCase } from "../application/ship-order.usecase";


const router = express.Router();

router.get("", (request, response) => {
    try {
        const productRepository = OrderContainer.getOrderRepositoryInMemory();
        const getOrdersUseCase = new GetOrdersUseCase(productRepository);

        const orders = getOrdersUseCase.execute();
        response.status(201).json(orders);
    } catch (error: any) {
        response.status(400).json({ error: error.message });
    }
});

router.post("", (request, response) => {
    try {
        const customerId = request.body.customerId;
        const listProductsId = request.body.listProductsId;

        const productRepository = ProductContainer.getProductRepositoryInMemory();
        const orderRepository = OrderContainer.getOrderRepositoryInMemory();
        const addProductToOrderUseCase = new AddProductToOrderUseCase(orderRepository, productRepository);

        const order = addProductToOrderUseCase.execute(customerId, listProductsId);
        response.status(201).json(order);
    } catch (error: any) {
        response.status(400).json({ error: error.message })
    }
});

router.get("/:orderId", (request, response) => {
    try {
        const orderId = parseInt(request.params.orderId);

        const orderRepository = OrderContainer.getOrderRepositoryInMemory();
        const getOrderUseCase = new GetOrderUseCase(orderRepository);

        const order = getOrderUseCase.execute(orderId);
        response.status(200).json(order);
    } catch (error: any) {
        response.status(400).json({ error: error.message });
    }
});

router.patch("/:orderId/pay", (request, response) => {
    try {
        const orderId = parseInt(request.params.orderId);

        const orderRepository = OrderContainer.getOrderRepositoryInMemory();
        const payOrderUseCase = new PayOrderUseCase(orderRepository);

        const order = payOrderUseCase.execute(orderId);
        response.status(200).json(order);
    } catch (error: any) {
        response.status(400).json({ error: error.message });
    }
});

router.patch("/:orderId/cancel", (request, response) => {
    try {
        const orderId = parseInt(request.params.orderId);

        const orderRepository = OrderContainer.getOrderRepositoryInMemory();
        const cancelOrderUseCase = new CancelOrderUseCase(orderRepository);

        const order = cancelOrderUseCase.execute(orderId);
        response.status(200).json(order);
    } catch (error: any) {
        response.status(400).json({ error: error.message });
    }
});

router.patch("/:orderId/ship", (request, response) => {
    try {
        const orderId = parseInt(request.params.orderId);

        const orderRepository = OrderContainer.getOrderRepositoryInMemory();
        const shipOrderUseCase = new ShipOrderUseCase(orderRepository);

        const order = shipOrderUseCase.execute(orderId);
        response.status(200).json(order);
    } catch (error: any) {
        response.status(400).json({ error: error.message });
    }
});

export default router;