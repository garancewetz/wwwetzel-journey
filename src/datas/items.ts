import { Item } from '@/types/game';

// XP

const sorbonneXp: Item = {
    "type": "xp",
    "id": "sorbonne",
    "name": "Sorbonne Nouvelle · Master de lettres · 2015",
    "image": "/xps/book.svg"
}

const threeWXp: Item = {
    "type": "xp",
    "id": "3w",
    "name": "3W Academy · Développeuse web · 2018",
    "image": "/xps/computer.svg"
}

const openclassroomsXp: Item = {
    "type": "xp",
    "id": "openclassrooms",
    "name": "OpenClassrooms · Développeuse d'application web · 2022",
    "image": "/xps/website.svg"
}

const uptooXp: Item = {
    "type": "xp",
    "id": "uptoo",
    "name": "Uptoo · Développeuse front · 2019",
    "image": "/xps/star.svg"
}

const colorzXp: Item = {
    "type": "xp",
    "id": "colorz",
    "name": "Colorz · Développeuse front · 2022",
    "image": "/xps/star.svg"
}

const okeiroXp: Item = {
    "type": "xp",
    "id": "okeiro",
    "name": "Okeiro · Développeuse front · 2025",
    "image": "/xps/star.svg"
}


// Obstacles
const tree: Item = {
    "type": "obstacle",
    "name": "Arbre",
    "image": "/obstacles/tree.svg"
}

const surpriseTree: Item = {
    "type": "obstacle",
    "name": "Arbre surprise",
    "image": "/obstacles/surpriseTree.svg"
}

// Dangers
const mushroom: Item = {
    "type": "danger",
    "id": "mushroom",
    "name": "Champignon maléfique",
    "image": "/dangers/mushroom.svg",
    "text": "Oh non, un champignon maléfique ! JE SUIS EN DANGER ! Ai-je quelque chose dans mon sac pour le neutraliser ?"
}

// Clin d'œil à Diablo II
const andariel: Item = {
    "type": "danger",
    "id": "andariel",
    "name": "Andariel",
    "image": "/dangers/andariel.svg",
    "text": "Andariel, la Vierge de l'Angoisse, me barre la route ! On dit qu'elle craint le feu... Ai-je quelque chose de brûlant dans mon sac ?"
}

const lifeguard: Item = {
    "type": "danger",
    "id": "lifeguard",
    "name": "Maître nageur musclé",
    "image": "/dangers/lifeguard.svg",
    "text": "Un maître nageur musclé ? Mais c'est horrible ! Je déteste les bonnets de bain, et je n'ai pas de tee-shirt à lui proposer..."
}



// Interests

const sarahBernhardt: Item = {
    "type": "interest",
    "id": "sarahBernhardt",
    "name": "Sarah Bernhardt",
    "image": "/interests/sarahBernhardt.svg",
    "text": "Mais que fait donc Sarah Bernhardt derrière cet arbre ? Elle pêche à la ligne ?",
    "uses": [
        "Sarah Bernhardt déclame une tirade. Les arbres applaudissent.",
        "« Quand même ! » lance Sarah Bernhardt. C'était sa devise."
    ]
}

const karaoke: Item = {
    "type": "interest",
    "id": "karaoke",
    "name": "Karaoké",
    "image": "/interests/karaoke.svg",
    "text": "Et si on se lançait dans un karaoké ? On a besoin d'une chanson pour commencer...",
    "uses": [
        "Je chante à tue-tête. Personne pour m'entendre, c'est parfait.",
        "Le micro grésille. Le karaoké attendra une meilleure acoustique."
    ]
}

const cheese: Item = {
    "type": "interest",
    "id": "cheese",
    "name": "Fromage",
    "image": "/interests/cheese.svg",
    "text": "Oh, du fromage fondu ! J'adore ça !",
    "uses": [
        "Je grignote un bout de fromage. Ça va tout de suite mieux.",
        "Je garde le reste pour l'apéro. On ne sait jamais."
    ]
}

const reading: Item = {
    "type": "interest",
    "id": "reading",
    "name": "Lecture",
    "image": "/interests/reading.svg",
    "text": "Je suis en train de lire un livre sur la lecture. C'est fascinant !",
    "uses": [
        "Je lis trois pages en marchant. Je me cogne dans un arbre.",
        "Je corne la page. Je reprendrai plus tard, promis."
    ]
}

const wine: Item = {
    "type": "interest",
    "id": "wine",
    "name": "Un verre de vin",
    "image": "/interests/wine.svg",
    "text": "Du vin ? C'est parti !",
    "uses": [
        "Je trinque avec un arbre. Il ne trinque pas.",
        "Pas avant d'avoir trouvé toutes mes expériences. Bon, une gorgée."
    ]
}

const sun: Item = {
    "type": "interest",
    "id": "sun",
    "name": "Soleil du sud",
    "image": "/interests/sun.svg",
    "text": "Un soleil du sud, c'est beau ! Je le mets dans mon sac à dos, il pourrait me servir plus tard... Vivement les vacances...",
    "uses": [
        "Je brandis le soleil du sud. Le noir ne bouge pas d'un pixel.",
        "Deux minutes de bronzette. Vivement les vacances."
    ]
}

const queer: Item = {
    "type": "interest",
    "id": "queer",
    "name": "Queer",
    "image": "/interests/rainbow.svg",
    "text": "Queer, c'est beau !",
    "uses": [
        "Je déploie l'arc-en-ciel. Tout de suite, la balade est plus belle.",
        "Un peu de fierté dans le noir, ça ne fait jamais de mal."
    ]
}

const ruby: Item = {
    "type": "interest",
    "id": "ruby",
    "name": "Rubis parfait",
    "image": "/interests/ruby.svg",
    "text": "Un rubis parfait ! Serti dans une arme, il brûle tout ce qu'il touche.",
    "uses": [
        "Je fais briller le rubis. Il me brûle un peu les doigts.",
        "Un rubis parfait. Il irait bien sur une épée."
    ]
}

const interests: Item[] = [
    sun,
    wine,
    sarahBernhardt,
    queer,
    reading,
    cheese,
    karaoke,
    ruby
]

const experiences: Item[] = [
    sorbonneXp,
    threeWXp,
    openclassroomsXp,
    uptooXp,
    colorzXp,
    okeiroXp
]

export { mushroom, andariel, ruby, tree, surpriseTree, interests, experiences, sorbonneXp, threeWXp, openclassroomsXp, uptooXp, colorzXp, okeiroXp, sarahBernhardt, karaoke, cheese, reading, wine, sun, queer, lifeguard }