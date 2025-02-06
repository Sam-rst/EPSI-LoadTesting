import Order from "../domain/order.entity";
import OrderRepository from "../domain/order.repository.interface";

export default class OrderRepositoryInMemory implements OrderRepository {
    private orders: Order[] = [];

    create(order: Order): Order {
        order.setId(this.orders.length + 1)
        this.orders.push(order);

        return order;
    }

    findAll(): Order[] {
        return this.orders;
    }

    findById(id: number): Order | undefined {
        return this.orders.find((order) => order.getId() === id);
    }

    findAllByCustomerId(customerId: number): Order[] {
        return this.orders.filter((order) => order.getCustomerId() === customerId);
    }

    update(order: Order): Order {
        this.orders = this.orders.map((orderInList) => {
            if (orderInList.getId() === order.getId()) {
                return order;
            }

            return orderInList;
        })
        return
    }

    findCartByCustomerId(customerId: number): Order | undefined {
        return this.orders.find((order) => order.getCustomerId() === customerId && order.isCreated() === false);
    }

    existsByProductId(productId: number): boolean {
        return this.orders.some((order) => order.getProducts().some((product) => product.getId() === productId));
    }
}