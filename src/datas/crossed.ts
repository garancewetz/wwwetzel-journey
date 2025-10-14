import { sun, piano, wine, sarahBernhardt, queer, reading, cheese, karaoke } from "./items";

const crossed = {
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
            id: piano.id,
            text: "Je ne veux pas jouer du piano pour le champignon maléfique !",
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
            text: "Je lui offre un verre de vin. Il aime ça !",
            image: null
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
            id: piano.id,
            text: "Il ne veut pas jouer du piano maintenant, il veut nager !",
            image: null
        },
    ]
}

export default crossed;