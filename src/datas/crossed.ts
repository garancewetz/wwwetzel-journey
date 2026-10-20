import { sun, wine, sarahBernhardt, queer, reading, cheese, karaoke, ruby } from "./items";

export interface Reaction {
    id?: string;
    text: string;
    // Nouvelle image du danger une fois neutralisé
    image: string | null;
    // Le danger s'écarte (sans nouvelle image : il disparaît)
    defeats?: boolean;
}

// Ce qui se passe quand on utilise un objet du sac face à un danger.
// Une réaction avec image ou defeats neutralise le danger, qui laisse alors passer.
const crossed: Record<string, Reaction[]> = {
    "mushroom": [
        {
            id: sun.id,
            text: "Ha ! Le méchant champignon n'aime pas le soleil ! Le voilà réduit en poussière !",
            image: "/dangers/mushroomXsun.svg"
        },
        {
            id: sarahBernhardt.id,
            text: "Oh ! Sarah Bernhardt refuse d'être mélée à toute cette histoire...",
            image: null
        },
        {
            id: wine.id,
            text: "Il me dit non-merci. Il ne boit plus du tout.",
            image: null
        },
        {
            id: queer.id,
            text: "Je ne veux pas faire de bisou au champignon maléfique !",
            image: null
        },
        {
            id: reading.id,
            text: "Mais non, ne lui donne pas ce livre ! Les pages risqueraient de pourrir.",
            image: null
        },
        {
            id: cheese.id,
            text: "Pfff, je n'aime pas le roquefort ! Ne mélange pas mon bon fromage avec ça !",
            image: null
        },
        {
            id: karaoke.id,
            text: "Je ne veux pas chanter avec le champignon maléfique !",
            image: null
        },
        {
            id: ruby.id,
            text: "Le rubis ne lui fait ni chaud ni froid. Il lui faudrait du vrai soleil.",
            image: null
        },

    ],
    "andariel": [
        {
            id: sun.id,
            text: "Le soleil du sud brûle comme les enfers. Andariel y retourne aussitôt !",
            image: null,
            defeats: true
        },
        {
            id: ruby.id,
            text: "Le rubis s'embrase : Andariel ne supporte pas le feu. Elle disparaît dans un cri.",
            image: null,
            defeats: true
        },
        {
            id: sarahBernhardt.id,
            text: "Sarah Bernhardt a joué des reines plus terrifiantes. Andariel n'impressionne personne.",
            image: null
        },
        {
            id: wine.id,
            text: "Elle ne boit que du poison. Mon vin ne l'intéresse pas.",
            image: null
        },
        {
            id: queer.id,
            text: "Andariel ne se laisse pas attendrir. Même pas par un arc-en-ciel.",
            image: null
        },
        {
            id: reading.id,
            text: "« Restez un moment et écoutez... » Non, pas le temps de lire Deckard Cain maintenant !",
            image: null
        },
        {
            id: cheese.id,
            text: "Elle préfère les âmes au fromage.",
            image: null
        },
        {
            id: karaoke.id,
            text: "Elle hurle déjà assez fort comme ça.",
            image: null
        },
    ],
    "lifeguard": [
        {
            id: sun.id,
            text: "Hahaha ! Le maître nageur musclé a pris un coup de soleil. ",
            image: "/dangers/lifeguardXsun.svg"
        },
        {
            id: sarahBernhardt.id,
            text: "Oh ! Sarah Bernhardt lui conseille de se mettre aux cols roulés.",
            image: null
        },
        {
            id: wine.id,
            text: "Je lui offre un verre de vin. Il aime ça, et me laisse passer !",
            image: null,
            defeats: true
        },
        {
            id: queer.id,
            text: "Je ne veux pas faire de bisou au maître nageur musclé ! Je ne suis pas une bisoulette.",
            image: null
        },
        {
            id: reading.id,
            text: "Il ne veut pas lire maintenant, il veut nager !",
            image: null
        },
        {
            id: cheese.id,
            text: "Il ne veut pas manger maintenant, il veut nager !",
            image: null
        },
        {
            id: karaoke.id,
            text: "Il ne veut pas chanter maintenant, il veut nager !",
            image: null
        },
        {
            id: ruby.id,
            text: "Un rubis ? Il le trouve joli, mais ne bouge pas d'un pouce.",
            image: null
        },
    ]
}

export default crossed;