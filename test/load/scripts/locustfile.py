from locust import HttpUser, task, between
import random

class EcommerceUser(HttpUser):
    wait_time = between(1, 3)  # Temps d'attente entre les requêtes (1 à 3 secondes)

    @task(2)
    def get_all_orders(self):
        """ Récupère toutes les commandes """
        self.client.get("/orders")

    @task(2)
    def get_all_products(self):
        """ Récupère tous les produits """
        self.client.get("/products")

    @task(3)
    def create_product(self):
        """ Crée un produit """
        product_data = {
            "title": f"Product {random.randint(1, 1000)}",
            "price": random.randint(10, 500),
            "description": "Test product description"
        }
        response = self.client.post("/products", json=product_data)
        if response.status_code == 201:
            product_id = response.json().get("id")
            if product_id:
                self.get_product(product_id)

    def get_product(self, product_id):
        """ Récupère un produit spécifique """
        self.client.get(f"/products/{product_id}")

    @task(3)
    def create_order(self):
        """ Crée une commande """
        order_data = {
            "customerId": random.randint(1, 100),
            "listProductsId": [random.randint(1, 50) for _ in range(random.randint(1, 5))]
        }
        response = self.client.post("/orders", json=order_data)
        if response.status_code == 201:
            order_id = response.json().get("id")
            if order_id:
                self.pay_order(order_id)

    def pay_order(self, order_id):
        """ Paye une commande """
        self.client.patch(f"/orders/{order_id}/pay")

    @task(1)
    def cancel_order(self):
        """ Annule une commande aléatoire """
        order_id = random.randint(1, 100)
        self.client.patch(f"/orders/{order_id}/cancel")

    @task(1)
    def ship_order(self):
        """ Expédie une commande aléatoire """
        order_id = random.randint(1, 100)
        self.client.patch(f"/orders/{order_id}/ship")
