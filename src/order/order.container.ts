import OrderRepository from "./domain/order.repository.interface";
import OrderRepositoryInMemory from "./infrastructure/order.repository";


export class OrderContainer {
    private static orderRepositoryInMemory: OrderRepository;

    public static getOrderRepositoryInMemory(): OrderRepository {
        if (!OrderContainer.orderRepositoryInMemory) {
            OrderContainer.orderRepositoryInMemory = new OrderRepositoryInMemory();
        }

        return OrderContainer.orderRepositoryInMemory;
    }
}