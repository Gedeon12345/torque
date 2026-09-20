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
├── components/  common · layout · ui · home · product
├── data/        site · navigation · categories · vehicles · products · brands · testimonials · advantages
├── hooks/       useScrolled · useTransientFlag
├── utils/       motion · discGeometry · format
├── layouts/     MainLayout
├── pages/       HomePage, PlaceholderPage
├── routes/      AppRoutes
├── store/       ShopProvider (panier + favoris, état local)
└── index.css    palette et tokens Tailwind
```

Alias : `@/` pointe vers `src/`.

## Avancement

- [x] Phase 1 : configuration, layout, header, footer
- [x] Phase 2 : hero, recherche véhicule, catégories
- [x] Phase 3 : produits, ProductCard, marques, témoignages (+ Pourquoi nous choisir, CTA)
- [x] Phase 4 : animations, responsive, polish (transitions de page, page 404, corrections 320 px, accessibilité)
- [ ] Phase 5 : pages supplémentaires, interactions locales

## Déploiement (Vercel)

- Framework détecté : Vite (build `npm run build`, sortie `dist`).
- `vercel.json` renvoie toutes les URL vers `index.html`, sinon un rafraîchissement
  sur `/cart` ou `/products/1` donnerait une erreur 404 (React Router gère les routes côté client).
