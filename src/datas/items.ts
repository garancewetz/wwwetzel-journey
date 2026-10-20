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

// Ennemis : les vaincre coûte de la mana
const mushroom: Item = {
    "type": "danger",
    "id": "mushroom",
    "name": "Champignon maléfique",
    "image": "/dangers/mushroom.svg",
    "text": "Oh non, un champignon maléfique ! Il ne vit que dans l'ombre et l'humidité... Ai-je quelque chose de lumineux dans mon sac ?",
    "key": "sun",
    "solved": "Ha ! Le méchant champignon n'aime pas le soleil ! Le voilà réduit en poussière !",
    "after": "/dangers/mushroomXsun.svg"
}

const lifeguard: Item = {
    "type": "danger",
    "id": "lifeguard",
    "name": "Maître nageur musclé",
    "image": "/dangers/lifeguard.svg",
    "text": "Un maître nageur musclé me barre la route de la plage. Il s'ennuie ferme... Un petit remontant le ferait peut-être bouger ?",
    "key": "wine",
    "solved": "Je lui offre un verre de vin. Il aime ça, et me laisse passer !"
}

// Clin d'œil à Diablo II : la boss finale
const andariel: Item = {
    "type": "danger",
    "id": "andariel",
    "name": "Andariel",
    "image": "/dangers/andariel.svg",
    "text": "Andariel, la Vierge de l'Angoisse, garde le dernier passage ! On dit qu'elle ne craint qu'une chose : une arme qui brûle.",
    "key": "ruby",
    "solved": "Le rubis s'embrase : Andariel ne supporte pas le feu. Elle disparaît dans un cri."
}

// Gardiens amicaux : il suffit du bon objet
const curtain: Item = {
    "type": "guard",
    "id": "curtain",
    "name": "Rideau de théâtre",
    "image": "/guards/curtain.svg",
    "text": "Un lourd rideau de théâtre ferme le passage. Il ne se lèvera que pour une grande actrice...",
    "key": "sarahBernhardt",
    "solved": "Sarah Bernhardt entre en scène. Le rideau se lève sous les applaudissements !",
    "refuse": "Le rideau ne bouge pas. Il attend une vraie tragédienne."
}

const fox: Item = {
    "type": "guard",
    "id": "fox",
    "name": "Renard affamé",
    "image": "/guards/fox.svg",
    "text": "Un renard affamé me barre la route. Il a l'air de rêver d'un bon morceau de fromage...",
    "key": "cheese",
    "solved": "« Que vous êtes joli ! » Je lui donne le fromage, il file avec, comme dans la fable.",
    "refuse": "Le renard hausse les épaules. Ce n'est pas du fromage, ça."
}

// Autre clin d'œil à Diablo
const cain: Item = {
    "type": "guard",
    "id": "cain",
    "name": "Deckard Cain",
    "image": "/guards/cain.svg",
    "text": "Deckard Cain : « Restez un moment et écoutez... » Il ne s'arrête plus de parler. Un bon livre le ferait peut-être taire ?",
    "key": "reading",
    "solved": "Je lui offre un livre. Il s'y plonge et en oublie de parler. Je passe sur la pointe des pieds.",
    "refuse": "« Restez un moment et écoutez... » Il n'écoute que lui-même."
}

const troll: Item = {
    "type": "guard",
    "id": "troll",
    "name": "Troll grognon",
    "image": "/guards/troll.svg",
    "text": "Un troll grognon garde le passage du nord. Il ne laisse passer que ceux qui le font chanter.",
    "key": "karaoke",
    "solved": "Je lui tends le micro. Il chante faux, très fort, et s'en va en dansant.",
    "refuse": "Le troll grogne. Il veut chanter, pas ça."
}

const cloud: Item = {
    "type": "guard",
    "id": "cloud",
    "name": "Nuage de pluie",
    "image": "/guards/cloud.svg",
    "text": "Un nuage de pluie bouche le chemin de l'est. Il a le cafard... Il lui faudrait un peu de couleur.",
    "key": "queer",
    "solved": "Je déploie l'arc-en-ciel. Le nuage sourit et s'évapore.",
    "refuse": "Il pleut de plus belle."
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

export { mushroom, andariel, lifeguard, curtain, fox, cain, troll, cloud, ruby, tree, surpriseTree, interests, experiences, sorbonneXp, threeWXp, openclassroomsXp, uptooXp, colorzXp, okeiroXp, sarahBernhardt, karaoke, cheese, reading, wine, sun, queer }