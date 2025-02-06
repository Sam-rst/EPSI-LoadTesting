import Product from "../../product/domain/product.entity";
import ProductRepository from "../../product/domain/product.repository.interface";
import Order from "../domain/order.entity";
import OrderRepository from "../domain/order.repository.interface";

export class AddProductToOrderUseCase {

    private orderRepository: OrderRepository;
    private productRepository: ProductRepository;

    constructor(orderRepository: OrderRepository, productRepository: ProductRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    public execute(customerId: number, listProductsId: number[]): Order | { error: string } {
        try {
            const products: Product[] = listProductsId.map(productId =>
                this.productRepository.findById(productId)
            );

            if (products.includes(undefined)) {
                return { error: "Un ou plusieurs produits n'existent pas" };
            }

            // Récupérer la commande en cours par l'id du client
            const orderFound = this.orderRepository.findCartByCustomerId(customerId);

            if (orderFound) {
                // Ajouter des produits à la commande existante
                orderFound.addProducts(products);
                // Mettre à jour la commande dans la base de données
                this.orderRepository.update(orderFound);
                return orderFound;
            }

            // Si aucune commande existante n'est trouvée, en créer une nouvelle
            const orderCreated = new Order(customerId, products);
            const orderPersisted = this.orderRepository.create(orderCreated);
            return orderPersisted;

        } catch (error: any) {
            return { error: error.message };
        }
    }
}