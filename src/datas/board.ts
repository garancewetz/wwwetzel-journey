import { mushroom, tree, surpriseTree, sorbonneXp, threeWXp, openclassroomsXp, uptooXp, colorzXp, okeiroXp, sarahBernhardt, karaoke, cheese, reading, wine, sun, queer, piano, lifeguard } from "./items";


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
      "path": "water"
    },
    {
      "id": 22,
      "path": "water"
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
      "path": "grass",
      "items": [lifeguard]
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
      "path": "topToRight"
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
      "items": [mushroom]
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
      "items": [piano]
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
      "items": [sun]
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

export { board };
