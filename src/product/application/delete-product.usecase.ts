import OrderRepository from "../../order/domain/order.repository.interface";
import Product from "../../product/domain/product.entity";
import ProductRepository from "../infrastructure/product.repository";

export class DeleteProductUseCase {

    private productRepository: ProductRepository;
    private orderRepository: OrderRepository;

    constructor(productRepository: ProductRepository, orderRepository: OrderRepository) {
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
    }

    public execute(productId: number): Product | { error: string } {
        try {
            const productToDelete = this.productRepository.findById(productId);

            if (!productToDelete) {
                throw new Error("Produit non trouvée");
            }

            if (this.orderRepository.existsByProductId(productId)) {
                throw new Error("Impossible de supprimer un produit lié à une ou plusieurs commande(s)");
            }

            this.productRepository.delete(productToDelete);
            return productToDelete;
        } catch (error: any) {
            return { error: error.message };
        }
    }
}