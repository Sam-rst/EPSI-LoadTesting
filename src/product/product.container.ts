import ProductRepository from "./infrastructure/product.repository";

export class ProductContainer {
    private static productRepositoryInMemory: ProductRepository;

    public static getProductRepositoryInMemory(): ProductRepository {
        if (!ProductContainer.productRepositoryInMemory) {
            ProductContainer.productRepositoryInMemory = new ProductRepository();
        }

        return ProductContainer.productRepositoryInMemory;
    }
}