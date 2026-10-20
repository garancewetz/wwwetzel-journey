# wwwetzel journey

Un petit jeu en pixel art. On marche dans le noir, seule une lueur entoure le personnage, et l'on découvre en chemin le parcours de Garance Wetzel : chaque expérience trouvée rapporte un point d'XP, recharge la mana et agrandit un peu la lumière.

- **Les intérêts** (Sarah Bernhardt, le fromage, un livre, le vin, un micro, un arc-en-ciel, le soleil, un rubis) se ramassent en route et vont dans le sac. Chacun ouvre un passage, et fait rire le reste du temps.
- **Les gardiens** barrent la route d'une région à l'autre : un rideau de théâtre, un renard (La Fontaine), Deckard Cain, un troll, un nuage de pluie. Leur réplique donne un indice sur l'objet à leur offrir, toujours trouvé juste avant.
- **Les ennemis** (un maître nageur, un champignon maléfique et Andariel, clin d'œil à Diablo) se battent de la même façon, mais il faut de la mana.
- **La mana** est la force de vaincre : chaque expérience l'agrandit et la recharge, et elle revient doucement en marchant.
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

Pour modifier la carte, voir `src/datas/board.ts` : elle est dessinée en texte, un caractère par case, avec un plan pour le sol (arbres, eau, herbe, chemins, boue) et un plan pour les objets et les gardiens. Les tuiles de chemin se choisissent seules d'après les cases voisines.

## Mise en ligne

Netlify, réglages dans `netlify.toml` : `npm run build`, dossier publié `out/`.
