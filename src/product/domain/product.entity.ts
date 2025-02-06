export default class Product {
    private id: number;

    private title: string;

    private price: number;

    private description: string;

    private createdAt: Date;

    private updatedAt: Date;

    private isDeleted: boolean = false;

    private deletedAt: Date;

    constructor(title: string, price: number, description: string) {
        this.setTitle(title);
        this.setPrice(price);
        this.setDescription(description);
        this.createdAt = new Date();
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public setTitle(title: string): void {
        if (title.length === 0) {
            throw new Error("Le titre du produit ne doit pas être vide.");
        }

        if (title.length < 4 || title.length > 50) {
            throw new Error("Le titre du produit doit être compris entre 4 et 50 caractères.");
        }
        this.title = title;
    }

    public setPrice(price: number): void {
        if (price < 0) {
            throw new Error("Le prix ne peut pas être négatif.");
        }
        this.price = price;
    }

    public setDescription(description: string): void {
        if (description.length === 0) {
            throw new Error("La description du produit ne peut pas être vide.");
        }

        if (description.length < 10 || description.length > 100) {
            throw new Error("La description du produit doit être comprise entre 10 et 100 caractères.");
        }

        this.description = description;
    }

    public getPrice(): number {
        return this.price;
    }

    public update(title: string, price: number, description: string): void {
        this.setTitle(title);
        this.setPrice(price);
        this.setDescription(description);
        this.updatedAt = new Date();
    }

    public delete(): void {
        this.isDeleted = true;
        this.deletedAt = new Date();
    }
}