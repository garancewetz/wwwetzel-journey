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
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
    },
    {
      "id": 13,
      "path": "grass",
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
    },
    {
      "id": 14,
      "path": "grass",
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
    },
    {
      "id": 15,
      "path": "grass",
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
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
      "item": {
        "type": "interest",
        "name": "Karaoké",
        "image": "/interests/karaoke.svg",
        "found": false
      }
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
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
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
      "item": {
        "type": "xp",
        "name": "Okeiro - Développeuse front - 2025",
        "image": "/xps/star.svg",
        "found": false
      }
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
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
    },
    {
      "id": 35,
      "isWay": true,
      "path": "grass",
      "item": {
        "type": "interest",
        "name": "Fromage",
        "image": "/interests/cheese.svg",
        "found": false
      }
    },
    {
      "id": 36,
      "isWay": true,
      "path": "grass"
    },
    {
      "id": 37,
      "path": "grass",
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
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
      "item": {
        "type": "interest",
        "name": "Lecture",
        "image": "/interests/reading.svg",
        "found": false
      }
      
    },
    {
      "id": 44,
      "path": "grass",
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
    }
  ],
  [
    {
      "id": 45,
      "path": "grass",
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
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
      "item": {
        "type": "xp",
        "name": "Colorz - Développeuse front - 2022",
        "image": "/xps/star.svg",
        "found": false,
        "company": "Colorz"

      }
    },
    {
      "id": 54,
      "isWay": true,
      "path": "grass"
    },
    {
      "id": 55,
      "path": "grass",
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
    }
  ],
  [
    {
      "id": 56,
      "path": "grass",
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
    },
    {
      "id": 57,
      "path": "grass",
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
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
      "item": {
        "type": "xp",
        "name": "Développeuse d'application web - OpenClassrooms - 2022",
        "image": "/xps/website.svg",
        "found": false
      }
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
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
    },
    {
      "id": 68,
      "isWay": true,
      "path": "grass",
      "item": {
        "type": "interest",
        "name": "Item 3",
        "image": "/interests/wine.svg",
        "found": false
      }
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
      "item": {
        "type": "xp",
        "name": "Uptoo - Développeuse front - 2019",
        "image": "/xps/star.svg",
        "found": false,
        "company": "Uptoo"
      }
    },
    {
      "id": 76,
      "path": "grass",
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
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
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
    },
    {
      "id": 79,
      "path": "grass",
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
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
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
    },
    {
      "id": 83,
      "path": "grass",
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
    },
    {
      "id": 84,
      "path": "grass",
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
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
      "item": {
        "type": "interest",
        "name": "Queer",
        "image": "/interests/rainbow.svg",
        "found": false
      }
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
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
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
      "item": {
        "type": "xp",
        "name": "Développeuse web - 3W Academy - 2018",
        "image": "/xps/computer.svg",
        "found": false
      }
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
      "item": {
        "type": "danger",
        "name": "Champignon maléfique",
        "image": "/dangers/mushroom.svg",
        "found": false
      }
    },
    {
      "id": 99,
      "path": "grass",
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
    }
  ],
  [
    {
      "id": 100,
      "path": "grass",
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
    },
    {
      "id": 101,
      "isWay": true,
      "path": "grass"
    },
    {
      "id": 102,
      "path": "grass",
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
    },
    {
      "id": 103,
      "path": "grass",
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
    },
    {
      "id": 104,
      "path": "grass",
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
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
      "item": {
        "type": "interest",
        "name": "Piano",
        "image": "/interests/piano.svg",
        "found": false
      }
    },
    {
      "id": 110,
      
      "path": "grass",
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
    }
  ],
  [
    {
      "id": 111,
      "path": "grass",
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
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
      "item": {
        "type": "interest",
        "name": "Soleil du sud",
        "image": "/interests/sun.svg",
        "found": false
      }
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
      "item": {
        "type": "xp",
        "name": "Master de lettres - Sorbonne Nouvelle - 2015",
        "image": "/xps/book.svg",
        "found": false
      }
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
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
    },
    {
      "id": 119,
      "path": "grass",
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
    },
    {
      "id": 120,
      "path": "grass",
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
    },
    {
      "id": 121,
      "path": "grass",
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
    }
  ],
  [
    {
      "id": 122,
      "path": "grass",
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
    },
    {
      "id": 123,
      "path": "grass",
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
    },
    {
      "id": 124,
      "path": "grass",
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
    },
    {
      "id": 125,
      "path": "grass",
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
    },
    {
      "id": 126,
      "path": "grass",
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
    },
    {
      "id": 127,
      "path": "grass",
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
    },
    {
      "id": 128,
      "path": "grass",
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
    },
    {
      "id": 129,
      "path": "grass",
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
    },
    {
      "id": 130,
      "path": "grass",
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
    },
    {
      "id": 131,
      "path": "grass",
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
    },
    {
      "id": 132,
      "path": "grass",
      "item": {
        "type": "obstacle",
        "name": "Arbre",
        "image": "/obstacles/tree.svg",
        "found": false
      }
    }
  ]
];

export default board;
