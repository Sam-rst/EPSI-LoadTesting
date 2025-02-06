import Order from "./order.entity";

export default interface OrderRepository {
    create(order: Order): Order;
    findById(orderId: number): Order;
    findAllByCustomerId(customerId: number): Order[];
    findAll(): Order[];
    update(order: Order): Order;
    findCartByCustomerId(customerId: number): Order | undefined;
    existsByProductId(productId: number): boolean;
}