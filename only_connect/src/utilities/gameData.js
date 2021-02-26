const GameData = {
    connections: [
        {
            "clues": ["Michael Jordan", "Magic Johnson", "Derek Fisher", "Scottie Pippen"],
            "answer": " NBA Players with 5+ Championships",
        },
        {
            "clues": ["Dash", "Good American", "POOSH", "SKIMS"],
            "answer": "Kardashian Brands",
        },
        {
            "clues": [
                "Eva, Can I Stab Bats In A Cave",
                "Dammit, I'm Mad",
                "Do Geese See God",
                "Racecar",
            ],
            "answer": "Palindromes",
        },
        {
            "clues": ["Mag", "Hip", "Yup", "Pot"],
            "answer": "______pie",
        },

        {
            "clues": ["Apples", "Dates", "Pomegranate", "Challah"],
            "answer": "Symbolic Rosh Hashanah Foods",
        },
        {
            "clues": ["Wombat", "Opoosum", "Koala", "Kangaroo"],
            "answer": "Marsupials"
        }
    ],
    sequences:
        [
            {
                "clues": ["Blue", "North", "Luna", "X Æ A-Xii"],
                "answer": "Celebrity Babies in order of birth"
            },
            {
                "answer": "Order of sharks in Baby Shark",
                "clues": ["Baby", "Mommy", "Daddy", "Grandma"]
            },
            {
                "clues": ["Rachel", "Becca", "Hannah", "Clare"],
                "answer": "The Bachelorettes from ‘17-’20"
            },
            {
                "clues": ["M = 1", "V = 2", "E = 3", "M = 4"],
                "answer": "Planets"
            },
            {
                "clues": ["Zach", "Alex", "PJ", "Ang"],
                "answer": "Big Rascals Birthday’s"
            },
            {
                "clues": ["United States", "China", "Canada", "Russia"],
                "answer": "Size of Countries (Increasing)"
            }
        ],
    wall: {
        wall1: [
            {
                "clues": ["Fiji", "Mocha", "San Pellegrino", "Champagne"],
                "answer": "Drinks named after cities"
            },
            {
                "clues": ["T", "Cube", "Vanilla", "Prince"],
                "answer": "Rappers named Ice ____"
            },
            {
                "clues": ["Hazelnut", "Coconut", "Butter Pecan", "Caramel"],
                "answer": "Dunkin Donuts Flavors"
            },
            {
                "clues": ["Papua New Guinea", "Guam", "Australia", "Cook Islands"],
                "answer": "Oceania islands"
            }
        ],
        wall2: [
            {"answer": 'Animal named bands', "clues": ['Eagles', 'Beatles', 'Monkees', 'Gorillaz']},
            {"answer": 'Bird named sport teams', "clues": ['Pelicans', 'Seahawks', 'Falcons', 'Cardinals']},
            {"answer": 'Birth stones', "clues": ['Sapphire', 'Ruby', 'Emerald', 'Amethyst']},
            {"answer": 'Pokemon games', "clues": ['Crystal', 'Gold', 'Silver', 'Diamond']},
        ],
    },
    missingVowels: [
        {'category': 'Chores', 'clues': [
            {'clue': 'W SH NTH GD HS', 'answer': 'WASHING THE DISHES'},
            {'clue': 'F LD NGL ND RY', 'answer': 'FOLDING LAUNDRY'},
            {'clue': 'WPN GT HW NDW S', 'answer': 'WIPING THE WINDOWS'},
            {'clue': 'HNG NGCL THS NTH CL ST', 'answer': 'HANGING CLOTHES IN THE CLOSET'}
        ]},
        {'category': 'Clothing Brands', 'clues': [
            {'clue': 'CL VNKL N', 'answer': 'CALVIN KLEIN'},
            {'clue': 'ZR', 'answer': 'ZARA'},
            {'clue': 'N DRRM R', 'answer': 'UNDER ARMOUR'},
            {'clue': 'K NNT HC L', 'answer': 'KENNETH COLE'}
        ]},
        {'category': 'Mixed Drinks', 'clues': [
            {'clue': 'W H TRS SN', 'answer': 'WHITE RUSSIAN'},
            {'clue': 'MSC WML', 'answer': 'MOSCOW MULE'},
            {'clue': 'D RKN DSTR M', 'answer': 'DARK AND STORMY'},
            {'clue': 'MRT TSR', 'answer': 'AMARETTO SOUR'}
        ]},
        {'category': 'Cities in Israel', 'clues': [
            {'clue': 'JR S LM', 'answer': 'JERUSALEM'},
            {'clue': 'T LV V', 'answer': 'TEL AVIV'},
            {'clue': 'HF', 'answer': 'HAIFA'},
            {'clue': 'JF F', 'answer': 'JAFFA'}]
        }
    ]
};

export default GameData;
