# Torque — Front-end (React + Vite + Tailwind)

Boutique de pièces automobiles. Front-end uniquement, données mockées.

## Démarrer

```bash
npm install
npm run dev
```

## Stack

React 19 · Vite · Tailwind CSS 4 · React Router · Framer Motion · Lucide React

## Structure

```
src/
├── components/  common · layout · ui · home · product · catalog · cart
├── data/        site · navigation · categories · vehicles · products · brands · testimonials · advantages
├── hooks/       useScrolled · useTransientFlag · usePersistentState · useDocumentTitle · useSortParam
├── utils/       motion · discGeometry · format · catalog (recherche, tri)
├── layouts/     MainLayout
├── pages/       Home · Products · ProductDetail · Category · Search · Cart · Favorites · About
├── routes/      AppRoutes
├── store/       ShopProvider (panier + favoris, sauvegardés dans le localStorage)
└── index.css    palette et tokens Tailwind
```

Alias : `@/` pointe vers `src/`.

## Avancement

- [x] Phase 1 : configuration, layout, header, footer
- [x] Phase 2 : hero, recherche véhicule, catégories
- [x] Phase 3 : produits, ProductCard, marques, témoignages (+ Pourquoi nous choisir, CTA)
- [x] Phase 4 : animations, responsive, polish (transitions de page, page 404, corrections 320 px, accessibilité)
- [x] Phase 5 : catalogue, fiche produit, catégories, recherche, panier, favoris, à propos
- [ ] Page Contact (en attente de décision)

## Déploiement (Vercel)

- Framework détecté : Vite (build `npm run build`, sortie `dist`).
- `vercel.json` renvoie toutes les URL vers `index.html`, sinon un rafraîchissement
  sur `/cart` ou `/products/1` donnerait une erreur 404 (React Router gère les routes côté client).

## Photos des produits

Les photos vont dans `public/products/` (format 4:3, par exemple 1200 × 900 px, JPG, fond neutre).
Tant qu'un fichier est absent, une illustration de secours s'affiche : le site fonctionne dès maintenant
et chaque photo ajoutée remplace automatiquement l'illustration.

| Fichier attendu | Produit |
| --- | --- |
| `plaquettes-frein-avant.jpg` | Plaquettes de frein avant |
| `filtre-a-huile.jpg` | Filtre à huile |
| `phare-led-universel.jpg` | Phare LED universel |
| `disque-frein-ventile.jpg` | Disque de frein ventilé |
| `amortisseur-avant.jpg` | Amortisseur avant |
| `batterie-12v-60ah.jpg` | Batterie 12 V 60 Ah |
| `bougies-allumage.jpg` | Bougies d'allumage (jeu de 4) |
| `pneu-205-55-r16.jpg` | Pneu 205/55 R16 |
| `filtre-habitacle.jpg` | Filtre d'habitacle |
| `plaquettes-frein-arriere.jpg` | Plaquettes de frein arrière |
| `amortisseur-arriere.jpg` | Amortisseur arrière |
| `batterie-12v-70ah.jpg` | Batterie 12 V 70 Ah |
| `feux-arriere-led.jpg` | Feux arrière LED |

Les prix sont en euros (`utils/format.js`).
