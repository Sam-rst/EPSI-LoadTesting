import Product from "../domain/product.entity";
import ProductRepository from "../infrastructure/product.repository";

export class GetAllProductsUseCase {

    private productRepository: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }

    public execute(): Product[] | { error: string } {
        try {
            const products = this.productRepository.findAll();

            return products;
        } catch (error: any) {
            return { error: error.message };
        }
    }
}