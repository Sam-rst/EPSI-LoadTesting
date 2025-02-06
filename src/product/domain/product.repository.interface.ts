import Product from "./product.entity";

export default interface ProductRepository {
    create(order: Product): Product;
    findById(productId: number): Product;
    findAll(): Product[];
    update(order: Product): Product;
}