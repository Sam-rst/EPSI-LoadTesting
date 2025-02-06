import Product from "../../product/domain/product.entity";
import ProductRepository from "../infrastructure/product.repository";

export class UpdateProductUseCase {

    private productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    public execute(productId: number, title: string, price: number, description: string): Product | { error: string } {
        try {
            const productToUpdate = this.productRepository.findById(productId);

            if (!productToUpdate) {
                throw new Error("Produit non trouvée");
            }

            productToUpdate.update(title, price, description);
            this.productRepository.update(productToUpdate);
            return productToUpdate;
        } catch (error: any) {
            return { error: error.message };
        }
    }
}