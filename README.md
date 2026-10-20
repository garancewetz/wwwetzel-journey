# wwwetzel journey

Un petit jeu en pixel art. On marche dans le noir, seule une lueur entoure le personnage, et l'on découvre en chemin le parcours de Garance Wetzel : chaque expérience trouvée rapporte un point d'XP, recharge la mana et agrandit un peu la lumière.

- **Les intérêts** (le soleil, le vin, le fromage, un rubis…) se ramassent en route et vont dans le sac. On peut les utiliser partout, pour 1 mana, avec des effets plus ou moins utiles. La mana revient en marchant.
- **Les ennemis** (un maître nageur, un champignon maléfique et Andariel, en clin d'œil à Diablo) barrent le passage vers certaines expériences : il faut trouver le bon intérêt à leur offrir. Les autres font juste réagir.
- **L'humeur** teinte doucement le bord de la lumière : chaude quand tout va bien, froide face à un danger.
- **La carte** se découvre pas à pas, à la seule lumière du halo.

La partie est gardée dans le navigateur : on reprend là où on s'était arrêté.

**Jouer : à renseigner après la mise en ligne**

## Comment jouer

- **Ordinateur** : les flèches pour marcher (on peut les garder appuyées). On ramasse un objet en passant dessus. Les touches 1 à 8, ou un clic, utilisent un objet du sac.
- **Téléphone** : un joystick vient se placer sous le doigt ; on garde appuyé et on glisse dans la direction voulue. On touche un objet du sac pour l'utiliser.

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
  store/       # règles du jeu (reducer), contrôles clavier / tactile, sauvegarde
  types/
```

Pour modifier la carte, voir `src/datas/board.ts` : chaque case a un décor (`path`), peut être praticable (`isWay`) et porter des objets.

## Mise en ligne

Netlify, réglages dans `netlify.toml` : `npm run build`, dossier publié `out/`.
