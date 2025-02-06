import Order from "../domain/order.entity";
import OrderRepository from "../domain/order.repository.interface";

export class CancelOrderUseCase {
    private orderRepository: OrderRepository;

    constructor(orderRepository: OrderRepository) {
        this.orderRepository = orderRepository;
    }

    public execute(orderId: number): Order | { error: string } {
        try {
            const order = this.orderRepository.findById(orderId);

            if (!order) {
                throw new Error("Commande non trouvée");
            }

            order.cancel();
            this.orderRepository.update(order);
            return order;
        } catch (error: any) {
            return { error: error.message };
        }
    }
}