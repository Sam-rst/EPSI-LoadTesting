# 📌 **Tests de charge avec Locust**
Ce projet utilise **Locust** pour effectuer des tests de charge sur le serveur Express.js.

### 🚀 **1. Installation de Locust**
Assurez-vous que **Python 3** est installé, puis installez **Locust** avec :

```sh
cd test/load/
pip install -r requirements.txt
```

### 🏁 **2. Lancer les tests avec interface graphique**
Démarrez le serveur Express.js :

```sh
npm start
```

Puis exécutez Locust :

```sh
locust -f locustfile.py --host=http://localhost:3010
```

Ouvrez **Locust UI** dans votre navigateur :

```
http://localhost:8089
```

- **Nombre d’utilisateurs** : Exemple `1000`
- **Taux d’arrivée** : Exemple `50` (50 utilisateurs/seconde)
- **Démarrer le test**