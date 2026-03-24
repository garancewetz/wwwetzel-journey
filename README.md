# wwwetzel-journey

Portfolio front-end interactif de Garance Etzel, construit comme une expérience de navigation gamifiée.

## Demo

- Lien de démo live: `A renseigner`

## Objectif du projet

Ce projet présente des expériences et réalisations professionnelles via une interface interactive basée sur une grille, avec exploration clavier et découverte de contenus.

## Fonctionnalités

- Déplacement clavier dans une grille interactive
- Collecte d'éléments d'intérêt et d'expériences
- Affichage contextuel de contenus dans un panneau latéral
- Animations UI avec Framer Motion

## Stack technique

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion

## Installation

```bash
npm install
```

## Lancer le projet

```bash
npm run dev
```

Le projet est ensuite disponible sur [http://localhost:3000](http://localhost:3000).

## Scripts disponibles

- `npm run dev` lance le serveur de développement
- `npm run build` génère la version de production
- `npm run start` lance le serveur de production
- `npm run lint` exécute ESLint
- `npm run lint:fix` corrige automatiquement les erreurs lint simples
- `npm run typecheck` lance la vérification TypeScript

## Architecture

```text
src/
  app/           # Entrées App Router, layout global
  components/    # UI atoms, molecules, organisms
  datas/         # Données du jeu/portfolio
  store/         # Contexte global (BoardContext)
  types/         # Types TypeScript partagés
```

## Qualité

- Linting avec ESLint
- Typage statique avec TypeScript

## Contact

- Portfolio: `A renseigner`
- LinkedIn: `A renseigner`