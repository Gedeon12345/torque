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
