

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

// XP

const sorbonneXp = {
  "type": "xp",
  "name": "Master de lettres - Sorbonne Nouvelle - 2015",
  "image": "/xps/book.svg",
  "found": false,
  "text": "Un master de lettres, c'est intéressant !",
  "content": "Sorbonne"
}

const threeWXp = {
  "type": "xp",
  "name": "Développeuse web - 3W Academy - 2018",
  "image": "/xps/computer.svg",
  "found": false,
  "text": "Un diplôme de développeuse web, c'est intéressant !",
  "content": "3W"
}

const openclassroomsXp = {
  "type": "xp",
  "name": "Développeuse d'application web - OpenClassrooms - 2022",
  "image": "/xps/website.svg",
  "found": false,
  "text": "Un diplôme de développeuse d'application web, c'est intéressant !",
  "content": "OpenClassrooms"
}

const uptooXp = {
  "type": "xp",
  "name": "Uptoo - Développeuse front - 2019",
  "image": "/xps/star.svg",
  "found": false,
  "content": "Uptoo",
  "text": "Je gagne en expérience !"
}

const colorzXp = {
  "type": "xp",
  "name": "Colorz - Développeuse front - 2022",
  "image": "/xps/star.svg",
  "found": false,
  "content": "Colorz",
  "text": "Je gagne en expérience !"
}

const okeiroXp = {
  "type": "xp",
  "name": "Okeiro - Développeuse front - 2025",
  "image": "/xps/star.svg",
  "found": false,
  "content": "Okeiro",
  "text": "Je gagne en expérience !"
}



// Interests

const sarahBernhardt = {
  "type": "interest",
  "name": "Sarah Bernhardt",
  "image": "/interests/sarahBernhardt.svg",
  "found": false,
  "text": "Mais que fait donc Sarah Bernhardt cachée derrière cet arbre ? Elle pêche à la ligne ?"
}

const karaoke = {
  "type": "interest",
  "name": "Karaoké",
  "image": "/interests/karaoke.svg",
  "found": false,
  "text": "Et si on se lançait dans un karaoké ? On a besoin d'une chanson pour commencer..."
}

const cheese = {
  "type": "interest",
  "name": "Fromage",
  "image": "/interests/cheese.svg",
  "found": false,
  "text": "Oh, du fromage fondu ! J'adore ça !"
}

const reading = {
  "type": "interest",
  "name": "Lecture",
  "image": "/interests/reading.svg",
  "found": false,
  "text": "Je suis en train de lire un livre sur la lecture. C'est fascinant !"
}

const wine = {
  "type": "interest",
  "name": "Un verre de vin",
  "image": "/interests/wine.svg",
  "found": false,
  "text": "Du vin ? C'est parti !"
}

const sun = {
  "type": "interest",
  "name": "Soleil du sud",
  "image": "/interests/sun.svg",
  "found": false,
  "text": "Un soleil du sud, c'est beau ! Je le mets dans mon sac à dos, il pourrait me servir plus tard... Vivement les vacances..."
}

const queer = {
  "type": "interest",
  "name": "Queer",
  "image": "/interests/rainbow.svg",
  "found": false
}

const piano = {
  "type": "interest",
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

const board = [
  [
    {
      "id": 1,
      "path": "water"
    },
    {
      "id": 2,
      "path": "water"
    },
    {
      "id": 3,
      "path": "water"
    },
    {
      "id": 4,
      "path": "water"
    },
    {
      "id": 5,
      "path": "water"
    },
    {
      "id": 6,
      "path": "water"
    },
    {
      "id": 7,
      "path": "water"
    },
    {
      "id": 8,
      "path": "water"
    },
    {
      "id": 9,
      "path": "water"
    },
    {
      "id": 10,
      "path": "water"
    },
    {
      "id": 11,
      "path": "water"
    }
  ],
  [
    {
      "id": 12,
      "path": "grass",
      "items": [tree]
    },
    {
      "id": 13,
      "path": "grass",
      "items": [tree]
    },
    {
      "id": 14,
      "path": "grass",
      "items": [tree]
    },
    {
      "id": 15,
      "path": "grass",
      "items": [tree]
    },
    {
      "id": 16,
      "isWay": true,
      "path": "bottomToPlace"
    },
    {
      "id": 17,
      "isWay": true,
      "path": "grass"
    },
    {
      "id": 18,
      "isWay": true,
      "path": "grass"
    },
    {
      "id": 19,
      "isWay": true,
      "path": "grass"
    },
    {
      "id": 20,
      "isWay": true,
      "path": "grass",
      "items": [karaoke] 
    },
    {
      "id": 21,
      "path":"water"
    },
    {
      "id": 22,
      "path":"water"
    }
  ],
  [
    {
      "id": 23,
      "path": "grass",
      "items": [tree]
    },
    {
      "id": 24,
      "isWay": true,
      "path": "grass"
    },
    {
      "id": 25,
      "isWay": true,
      "path": "grass"
    },
    {
      "id": 26,
      "isWay": true,
      "path": "grass"

    },
    {
      "id": 27,
      "isWay": true,
      "path": "topToRight",
      "items": [okeiroXp]
    },
    {
      "id": 28,
      "isWay": true,
      "path": "leftToRight"
    },
    {
      "id": 29,
      "isWay": true,
      "path": "leftToRight"
    },
    {
      "id": 30,
      "isWay": true,
      "path": "bottomToLeft"
    },
    {
      "id": 31,
      "isWay": true,
      "path": "grass"
    },
    {
      "id": 32,
      "isWay": true,
      "path": "grass"
    },
    {
      "id": 33,
      "path": "water"
    }
  ],
  [
    {
      "id": 34,
      "path": "grass",
      "items": [tree]
    },
    {
      "id": 35,
      "isWay": true,
      "path": "grass",
      "items": [cheese]
    },
    {
      "id": 36,
      "isWay": true,
      "path": "grass"
    },
    {
      "id": 37,
      "path": "grass",
      "items": [tree]
    },
    {
      "id": 38,
      "isWay": true,
      "path": "grass"
    },
    {
      "id": 39,
      "isWay": true,
      "path": "grass"
    },
    {
      "id": 40,
      "isWay": true,
      "path": "grass"
    },
    {
      "id": 41,
      "isWay": true,
      "path": "bottomToTop"
    },
    {
      "id": 42,
      "isWay": true,
      "path": "grass"
    },
    {
      "id": 43,
      "isWay": true,
      "path": "grass",
      "items": [reading]
      
    },
    {
      "id": 44,
      "path": "grass",
      "items": [tree]
    }
  ],
  [
    {
      "id": 45,
      "path": "grass",
      "items": [tree]
    },
    {
      "id": 46,
          "isWay": true,
      "path": "grass"
    },
    {
      "id": 47,
        "isWay": true,
      "path": "grass"
    },
    {
      "id": 48,
      "isWay": true,
      "path": "grass"
    },
    {
      "id": 49,
      "path": "water"
    },
    {
      "id": 50,
      "path": "water"
    },
    {
      "id": 51,
      "path": "water"
    },
    {
      "id": 52,
      "isWay": true,
      "path":"topToRight"
    },
    {
      "id": 53,
      "isWay": true,
      "path": "bottomToLeft",
      "items": [colorzXp]
    },
    {
      "id": 54,
      "isWay": true,
      "path": "grass"
    },
    {
      "id": 55,
      "path": "grass",
      "items": [tree]
    }
  ],
  [
    {
      "id": 56,
      "path": "grass",
      "items": [tree]
    },
    {
      "id": 57,
      "path": "grass",
      "items": [tree]
    },
    {
      "id": 58,
      "isWay": true,
      "path": "bottomToRight"
    },
    {
      "id": 59,
      "isWay": true,
      "path": "leftToRight",
      "items": [openclassroomsXp]
    },
    {
      "id": 60,
      "isWay": true,
      "path": "bottomToLeft"
    },
    {
      "id": 61,
      "path": "water"
    },
    {
      "id": 62,
      "path": "water"
    },
    {
      "id": 63,
      "path": "water"
    },
    {
      "id": 64,
      "isWay": true,
      "path": "bottomToTop"
  
    },
    {
      "id": 65,
      "isWay": true,
      "path": "grass"
    },
    {
      "id": 66,
      "isWay": true,
      "path": "grass"
    }
  ],
  [
    {
      "id": 67,
      "path": "grass",
      "items": [tree]
    },
    {
      "id": 68,
      "isWay": true,
      "path": "grass",
      "items": [wine]
    },
    {
      "id": 69,
      "isWay": true,
      "path": "bottomToTop"

    },
    {
      "id": 70,
      "isWay": true,
      "path": "grass"
    },
    {
      "id": 71,
      "isWay": true,
      "path": "topToRight"
    },
    {
      "id": 72,
      "isWay": true,
      "path": "leftToRight"
    },
    {
      "id": 73,
      "isWay": true,
      "path": "leftToRight"

    },
    {
      "id": 74,
      "isWay": true,
      "path": "leftToRight"
    },
    {
      "id": 75,
      "isWay": true,
      "path": "leftToTop",
      "items": [uptooXp]
    },
    {
      "id": 76,
      "path": "grass",
      "items": [tree]
    },
    {
      "id": 77,
      "isWay": true,
      "path": "grass"

    }
  ],
  [
    {
      "id": 78,
      "path": "grass",
      "items": [tree]
    },
    {
      "id": 79,
      "path": "grass",
      "items": [tree]
    },
    {
      "id": 80,
      "isWay": true,
      "path": "bottomToTop"
    },
    {
      "id": 81,
      "isWay": true,
      "path": "grass"
    },
    {
      "id": 82,
      "path": "grass",
      "items": [tree]
    },
    {
      "id": 83,
      "path": "grass",
      "items": [tree]
    },
    {
      "id": 84,
      "isWay": true,
      "path": "grass",
      "items": [sarahBernhardt, surpriseTree]
    },
    {
      "id": 85,
      "path": "water"
    },
    {
      "id": 86,
      "isWay": true,
      "path": "grass"
    },
    {
      "id": 87,
      "isWay": true,
      "path": "grass",
      "items": [queer]
    },
    {
      "id": 88,
      "isWay": true,
      "path": "grass"

    }
  ],
  [
    {
      "id": 89,
      "path": "grass",
      "items": [tree]
    },
    {
      "id": 90,
        "isWay": true,
      "path": "grass"
    },
    {
      "id": 91,
      "isWay": true,
      "path": "rightToTop"
    },
    {
      "id": 92,
      "isWay": true,
      "path": "leftToRight",
      "items": [threeWXp]
    },
    {
      "id": 93,
      "isWay": true,
      "path": "leftToRight"
    },
    {
      "id": 94,
      "isWay": true,
      "path": "leftToRight"
    },
    {
      "id": 95,
      "isWay": true,
      "path": "bottomToLeft"
    },
    {
      "id": 96,
      "path": "water"
    },
    {
      "id": 97,
      "path": "water"
    },
    {
      "id": 98,
      "path": "mud",
      "isWay": true,
      "items": [{
        "type": "danger",
        "name": "Champignon maléfique",
        "image": "/dangers/mushroom.svg",
        "found": false,
        "text": "Oh non, un champignon maléfique ! JE SUIS EN DANGER ! Ai-je quelque chose dans mon sac pour le neutraliser ?"
      }]
    },
    {
      "id": 99,
      "path": "grass",
      "items": [tree]
    }
  ],
  [
    {
      "id": 100,
      "path": "grass",
      "items": [tree]
    },
    {
      "id": 101,
      "isWay": true,
      "path": "grass"
    },
    {
      "id": 102,
      "path": "grass",
      "items": [tree]
    },
    {
      "id": 103,
      "path": "grass",
      "items": [tree]
    },
    {
      "id": 104,
      "path": "grass",
      "items": [tree]
    },
    {
      "id": 105,
      "isWay": true,
      "path": "grass"
    },
    {
      "id": 106,
      "isWay": true,
      "path": "bottomToTop"
    },
    {
      "id": 107,
      "isWay": true,
      "path": "grass"
    },
    {
      "id": 108,
      "isWay": true,
      "path": "grass"
    },
    {
      "id": 109,
      "isWay": true,
      "path": "grass",
      "items": [interests[1]]
    },
    {
      "id": 110,
      
      "path": "grass",
      "items": [tree]
    }
  ],
  [
    {
      "id": 111,
      "path": "grass",
      "items": [tree]
    },
    {
      "id": 112,
      "isWay": true,
      "path": "placeToRight"
    },
    {
      "id": 113,
      "isWay": true,
      "path": "leftToRight",
      "items": [interests[0]]
    },
    {
      "id": 114,
      "isWay": true,
      "path": "leftToRight"
    },
    {
      "id": 115,
      "isWay": true,
      "path": "leftToRight",
      "items": [sorbonneXp]
    },
    {
      "id": 116,
      "isWay": true,
      "path": "leftToRight"
    },
    {
      "id": 117,
      "isWay": true,
      "path": "leftToTop"
    },
    {
      "id": 118,
      "path": "grass",
      "items": [tree]
    },
    {
      "id": 119,
      "path": "grass",
      "items": [tree]
    },
    {
      "id": 120,
      "path": "grass",
      "items": [tree]
    },
    {
      "id": 121,
      "path": "grass",
      "items": [tree]
    }
  ],
  [
    {
      "id": 122,
      "path": "grass",
      "items": [tree]
    },
    {
      "id": 123,
      "path": "grass",
      "items": [tree]
    },
    {
      "id": 124,
      "path": "grass",
      "items": [tree]
    },
    {
      "id": 125,
      "path": "grass",
      "items": [tree]
    },
    {
      "id": 126,
      "path": "grass",
      "items": [tree]
    },
    {
      "id": 127,
      "path": "grass",
      "items": [tree]
    },
    {
      "id": 128,
      "path": "grass",
      "items": [tree]
    },
    {
      "id": 129,
      "path": "grass",
      "items": [tree]
    },
    {
      "id": 130,
      "path": "grass",
       "items": [tree]
    },
    {
      "id": 131,
      "path": "grass",
      "items": [tree]
    },
    {
      "id": 132,
      "path": "grass",
      "items": [tree]
    }
  ]
];

export { board, experiences, interests };
