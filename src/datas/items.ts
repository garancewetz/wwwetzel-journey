// XP

const sorbonneXp = {
    "type": "xp",
    "id": "sorbonne",
    "name": "Master de lettres - Sorbonne Nouvelle - 2015",
    "image": "/xps/book.svg",
    "found": false,
    "text": "Un master de lettres, c'est intéressant !",
    "content": "Sorbonne"
}

const threeWXp = {
    "type": "xp",
    "id": "3w",
    "name": "Développeuse web - 3W Academy - 2018",
    "image": "/xps/computer.svg",
    "found": false,
    "text": "Un diplôme de développeuse web, c'est intéressant !",
    "content": "3W"
}

const openclassroomsXp = {
    "type": "xp",
    "id": "openclassrooms",
    "name": "Développeuse d'application web - OpenClassrooms - 2022",
    "image": "/xps/website.svg",
    "found": false,
    "text": "Un diplôme de développeuse d'application web, c'est intéressant !",
    "content": "OpenClassrooms"
}

const uptooXp = {
    "type": "xp",
    "id": "uptoo",
    "name": "Uptoo - Développeuse front - 2019",
    "image": "/xps/star.svg",
    "found": false,
    "content": "Uptoo",
    "text": "Je gagne en expérience !"
}

const colorzXp = {
    "type": "xp",
    "id": "colorz",
    "name": "Colorz - Développeuse front - 2022",
    "image": "/xps/star.svg",
    "found": false,
    "content": "Colorz",
    "text": "Je gagne en expérience !"
}

const okeiroXp = {
    "type": "xp",
    "id": "okeiro",
    "name": "Okeiro - Développeuse front - 2025",
    "image": "/xps/star.svg",
    "found": false,
    "content": "Okeiro",
    "text": "Je gagne en expérience !"
}


// Obstacles
const tree = {
    "type": "obstacle",
    "name": "Arbre",
    "image": "/obstacles/tree.svg",
    "found": false
}

const surpriseTree = {
    "type": "obstacle",
    "name": "Arbre surprise",
    "image": "/obstacles/surpriseTree.svg",
    "found": false
}

// Dangers
const mushroom = {
    "type": "danger",
    "id": "mushroom",
    "name": "Champignon maléfique",
    "image": "/dangers/mushroom.svg",
    "found": false,
    "text": "Oh non, un champignon maléfique ! JE SUIS EN DANGER ! Ai-je quelque chose dans mon sac pour le neutraliser ?"
}

const lifeguard = {
    "type": "danger",
    "id": "lifeguard",
    "name": "Maître nageur musclé",
    "image": "/dangers/lifeguard.svg",
    "found": false,
    "text": "Un maître nageur musclé ? Mais c'est horrible ! Je déteste les bonnets de bain, et je n'ai pas de tee-shirt à lui proposer..."
}



// Interests

const sarahBernhardt = {
    "type": "interest",
    "id": "sarahBernhardt",
    "name": "Sarah Bernhardt",
    "image": "/interests/sarahBernhardt.svg",
    "found": false,
    "text": "Mais que fait donc Sarah Bernhardt cachée derrière cet arbre ? Elle pêche à la ligne ?"
}

const karaoke = {
    "type": "interest",
    "id": "karaoke",
    "name": "Karaoké",
    "image": "/interests/karaoke.svg",
    "found": false,
    "text": "Et si on se lançait dans un karaoké ? On a besoin d'une chanson pour commencer..."
}

const cheese = {
    "type": "interest",
    "id": "cheese",
    "name": "Fromage",
    "image": "/interests/cheese.svg",
    "found": false,
    "text": "Oh, du fromage fondu ! J'adore ça !"
}

const reading = {
    "type": "interest",
    "id": "reading",
    "name": "Lecture",
    "image": "/interests/reading.svg",
    "found": false,
    "text": "Je suis en train de lire un livre sur la lecture. C'est fascinant !"
}

const wine = {
    "type": "interest",
    "id": "wine",
    "name": "Un verre de vin",
    "image": "/interests/wine.svg",
    "found": false,
    "text": "Du vin ? C'est parti !"
}

const sun = {
    "type": "interest",
    "id": "sun",
    "name": "Soleil du sud",
    "image": "/interests/sun.svg",
    "found": false,
    "text": "Un soleil du sud, c'est beau ! Je le mets dans mon sac à dos, il pourrait me servir plus tard... Vivement les vacances..."
}

const queer = {
    "type": "interest",
    "id": "queer",
    "name": "Queer",
    "image": "/interests/rainbow.svg",
    "found": false,
    "text": "Queer, c'est beau !"
}

const piano = {
    "type": "interest",
    "id": "piano",
    "name": "Piano",
    "image": "/interests/piano.svg",
    "found": false,
    "text": "Depuis le temps que je veux apprendre le piano. C'est une chance d'en trouver un ici !"
}

const interests = [
    sun,
    piano,
    wine,
    sarahBernhardt,
    queer,
    reading,
    cheese,
    karaoke
]

const experiences = [
    sorbonneXp,
    threeWXp,
    openclassroomsXp,
    uptooXp,
    colorzXp,
    okeiroXp
]

export { mushroom, tree, surpriseTree, interests, experiences, sorbonneXp, threeWXp, openclassroomsXp, uptooXp, colorzXp, okeiroXp, sarahBernhardt, karaoke, cheese, reading, wine, sun, queer, piano, lifeguard }