import Product from "../../product/domain/product.entity";

const enum STATUS {
    CREATED = "CREATED",
    PAID = "PAID",
    CANCELED = "CANCELED",
    SHIPPED = "SHIPPED",
}

export default class Order {
    private id: number;

    private total: number;

    private customer: number;

    private products: Product[];

    private maxProducts: number = 4;

    private status: STATUS;

    private createdAt: Date;

    private paidAt: Date;

    private canceledAt: Date;

    private shippedAt: Date;

    constructor(customerId: number, products: Product[]) {
        this.createdAt = new Date();
        this.customer = customerId;
        this.products = products;
        this.status = STATUS.CREATED;
        this.setProducts(products);

        this.calculateTotal();
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    private setProducts(products: Product[]): void {
        if (products.length == 0) {
            throw new Error("Une commande demande au minimum 1 produit pour être acceptée.");
        }

        if (products.length > this.maxProducts) {
            throw new Error(`Une commande ne peut avoir que ${this.maxProducts} produits au maximum.`);
        }
        this.products = products;
    }

    public getCustomerId(): number {
        return this.customer;
    }

    public getTotal() {
        return this.total;
    }

    public isCreated(): boolean {
        return this.status === STATUS.CREATED;
    }

    private calculateTotal(): void {
        this.total = this.products.reduce((acc, product) => {
            return acc + product.getPrice();
        }, 0);
    }

    public getProducts(): Product[] {
        return this.products;
    }

    public addProducts(products: Product[]): void {
        if ((products.length + this.products.length) > this.maxProducts) {
            throw new Error(`Une commande ne peut avoir que ${this.maxProducts} produits au maximum.`);
        }

        this.products = [...this.products, ...products];
        this.calculateTotal();
    }

    public pay(): void {
        if (this.products.length === 0) {
            throw new Error("Vous ne pouvez pas payer une commande sans produits dedans.")
        }

        if (this.status === STATUS.PAID) {
            throw new Error("Commande déjà passée.")
        }

        if (this.status === STATUS.CANCELED) {
            throw new Error("Vous ne pouvez pas payer une commande annulée.")
        }

        try {
            this.status = STATUS.PAID;
            this.paidAt = new Date();
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public cancel(): void {
        if (this.status === STATUS.CANCELED) {
            throw new Error("Vous ne pouvez pas annuler une commande déjà annulée.")
        }

        if (this.status !== STATUS.PAID) {
            throw new Error("Vous ne pouvez pas annuler une commande qui n'est pas payée.")
        }

        try {
            this.status = STATUS.CANCELED;
            this.canceledAt = new Date();
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public ship(): void {
        if (this.status === STATUS.SHIPPED) {
            throw new Error("Vous ne pouvez pas expedier une commande déjà expédiée.")
        }

        if (this.status !== STATUS.PAID) {
            throw new Error("Vous ne pouvez pas expedier une commande qui n'est pas payée.")
        }

        try {
            this.status = STATUS.SHIPPED;
            this.shippedAt = new Date();
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}