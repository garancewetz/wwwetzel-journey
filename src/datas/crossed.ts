import { sun, wine, sarahBernhardt, queer, reading, cheese, karaoke, ruby } from "./items";

export interface Reaction {
    id?: string;
    text: string;
}

// Ce que répondent les ennemis aux objets qui ne les font pas céder (la bonne clé est dans items.ts)
const crossed: Record<string, Reaction[]> = {
    "mushroom": [
        {
            id: sarahBernhardt.id,
            text: "Oh ! Sarah Bernhardt refuse d'être mélée à toute cette histoire..."
        },
        {
            id: wine.id,
            text: "Il me dit non-merci. Il ne boit plus du tout."
        },
        {
            id: queer.id,
            text: "Je ne veux pas faire de bisou au champignon maléfique !"
        },
        {
            id: reading.id,
            text: "Mais non, ne lui donne pas ce livre ! Les pages risqueraient de pourrir."
        },
        {
            id: cheese.id,
            text: "Pfff, je n'aime pas le roquefort ! Ne mélange pas mon bon fromage avec ça !"
        },
        {
            id: karaoke.id,
            text: "Je ne veux pas chanter avec le champignon maléfique !"
        },
        {
            id: ruby.id,
            text: "Le rubis ne lui fait ni chaud ni froid."
        },

    ],
    "andariel": [
        {
            id: sun.id,
            text: "Le soleil ? En enfer il fait déjà bien assez chaud. Andariel ricane."
        },
        {
            id: sarahBernhardt.id,
            text: "Sarah Bernhardt a joué des reines plus terrifiantes. Andariel n'impressionne personne."
        },
        {
            id: wine.id,
            text: "Elle ne boit que du poison. Mon vin ne l'intéresse pas."
        },
        {
            id: queer.id,
            text: "Andariel ne se laisse pas attendrir. Même pas par un arc-en-ciel."
        },
        {
            id: reading.id,
            text: "« Restez un moment et écoutez... » Non, pas le temps de lire Deckard Cain maintenant !"
        },
        {
            id: cheese.id,
            text: "Elle préfère les âmes au fromage."
        },
        {
            id: karaoke.id,
            text: "Elle hurle déjà assez fort comme ça."
        },
    ],
    "lifeguard": [
        {
            id: sun.id,
            text: "Il est déjà bronzé à point. Le soleil ne lui fait ni chaud ni froid."
        },
        {
            id: sarahBernhardt.id,
            text: "Oh ! Sarah Bernhardt lui conseille de se mettre aux cols roulés."
        },
        {
            id: queer.id,
            text: "Je ne veux pas faire de bisou au maître nageur musclé ! Je ne suis pas une bisoulette."
        },
        {
            id: reading.id,
            text: "Il ne veut pas lire maintenant, il veut nager !"
        },
        {
            id: cheese.id,
            text: "Il ne veut pas manger maintenant, il veut nager !"
        },
        {
            id: karaoke.id,
            text: "Il ne veut pas chanter maintenant, il veut nager !"
        },
        {
            id: ruby.id,
            text: "Un rubis ? Il le trouve joli, mais ne bouge pas d'un pouce."
        },
    ]
}

export default crossed;