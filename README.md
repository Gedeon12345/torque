# Torque — Front-end (React + Vite + Tailwind)

Boutique de pièces automobiles, branchée sur l'API `torque-backend`.

## Démarrer

```bash
npm install
cp .env.example .env   # VITE_API_URL=http://localhost:4000/api par défaut
npm run dev
```

Le back-end (`torque-backend`) doit tourner en parallèle (`npm run dev` dans son propre dossier),
avec au moins `npm run seed` exécuté une fois pour avoir des catégories et des produits à afficher.

## Compte obligatoire pour agir

Le catalogue (accueil, pièces, catégories, recherche, fiche produit) est consultable sans compte :
c'est la vitrine. Mais ajouter un favori, ajouter au panier, passer commande, et tout ce qui est sous
`/account`, `/orders`, `/favorites`, `/cart` exigent d'être connecté. Sans compte, cliquer sur ces
actions redirige vers `/login` (et revient à la page de départ une fois connecté).

Pages : `/login`, `/register`, `/account`, `/orders`, `/orders/:idOrNumber`.

## Espace administration

`/admin`, `/admin/products`, `/admin/orders` sont réservés au rôle `admin` (voir le back-end pour
créer un premier administrateur avec `npm run make-admin`). Un client connecté normal est renvoyé
vers l'accueil. C'est un espace volontairement simple : tableau de bord, liste des produits avec
archivage, liste des commandes avec changement de statut.

## Données

Le catalogue (produits, catégories), les comptes et les commandes viennent de l'API — plus aucune
donnée mockée pour ces parties. Restent statiques (contenu éditorial, pas géré par le back-end) :
`data/site.js`, `data/navigation.js`, `data/vehicles.js` (recherche par véhicule), `data/advantages.js`,
`data/brands.js`, `data/testimonials.js`.

### Photos produits

Les fiches produits pointent vers `/products/<fichier>.jpg` sur le serveur du back-end. Tant qu'une
photo n'est pas déposée là-bas, `ProductImage` affiche l'icône de la catégorie à la place : le site
reste complet en attendant les vraies photos.

## Panier et favoris

Toujours stockés dans le navigateur (pas encore de panier côté serveur), mais toute action dessus
passe par `useRequireAuth`, qui redirige vers la connexion si nécessaire — conformément à la règle
« compte obligatoire pour agir ».

## Structure

```
src/
├── components/  common · layout · ui · home · product · catalog · cart · auth · orders · admin
├── data/        contenu éditorial statique (voir plus haut)
├── hooks/       useProducts/useProduct/useCategories (API) · useOrders · useAdminResource ·
│                useRequireAuth · useCartProducts · useDocumentTitle · useSortParam · etc.
├── layouts/     MainLayout
├── pages/       Home, Products, ProductDetail, Category, Search, Cart, Favorites, About,
│                Login, Register, Account, Orders, OrderDetail, admin/*
├── routes/      AppRoutes (ProtectedRoute pour un compte, AdminRoute pour le rôle admin)
├── store/       AuthProvider (API) · ShopProvider (panier/favoris locaux)
└── utils/       apiClient (fetch + jeton), format, motion, discGeometry, categoryIcons
```

## Déploiement (Vercel)

- Framework : Vite (build `npm run build`, sortie `dist`). `vercel.json` renvoie toutes les URL vers
  `index.html` (React Router gère les routes côté client).
- Variable d'environnement à définir sur Vercel : `VITE_API_URL` → l'URL publique du back-end
  (ex. `https://torque-api.onrender.com/api`).
- Côté back-end, pensez à ajouter l'URL Vercel du front-end dans `CORS_ORIGINS`.

## Avancement

- [x] Phase 1 à 4 : configuration, layout, landing page complète, responsive, animations
- [x] Phase 5 (B5) : branchement sur l'API — catalogue réel, comptes, commandes, panier/favoris
      protégés par connexion, espace admin simple
