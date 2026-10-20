# wwwetzel journey

Un petit jeu en pixel art. On marche dans le noir, seule une lueur entoure le personnage, et l'on découvre en chemin le parcours de Garance Wetzel : chaque expérience trouvée agrandit la lumière. Des objets ramassés en route aident à se tirer de quelques rencontres.

**Jouer : à renseigner après la mise en ligne**

## Comment jouer

- **Ordinateur** : les flèches pour marcher (on peut les garder appuyées). On ramasse un objet en passant dessus. Les touches 1 à 8, ou un clic, utilisent un objet du sac.
- **Téléphone** : garder le doigt appuyé et glisser dans la direction voulue. On touche un objet du sac pour l'utiliser.

## Stack

Next.js 15 (App Router, export statique), React 19, TypeScript, Tailwind CSS 4. Aucune bibliothèque d'animation : les déplacements et fondus sont en CSS.

## Lancer en local

```bash
npm install
npm run dev
```

Le jeu est alors sur [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` : serveur de développement
- `npm run build` : site statique dans `out/`
- `npm run lint` : ESLint
- `npm run typecheck` : vérification TypeScript

## Organisation

```text
src/
  app/         # page et layout
  components/  # Game (la partie), World (la carte), Inventory (le sac), PathsSprite (les tuiles)
  datas/       # la carte, les objets, les réactions des dangers
  store/       # règles du jeu (reducer) et contrôles clavier / tactile
  types/
```

Pour modifier la carte, voir `src/datas/board.ts` : chaque case a un décor (`path`), peut être praticable (`isWay`) et porter des objets.

## Mise en ligne

Netlify, réglages dans `netlify.toml` : `npm run build`, dossier publié `out/`.
