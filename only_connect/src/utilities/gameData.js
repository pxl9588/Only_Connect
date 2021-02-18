const GameData = {
    patterns: [
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
        {'category': 'Chores', 'clues': ['W SH NTH GD HS', 'F LD NGL ND RY', 'WPN GT HW NDW S', 'HDNG STFF NTH CL ST']},
        {'category': 'Clothing Brands', 'clues': ['CL VNKL N', 'ZR', 'N DRRM R', 'K NNT HC L']},
        {'category': 'Mixed Drinks', 'clues': ['W H TRS SN', 'MSC WML', 'D RKN DSTR M', 'MRT TSR']},
        {'category': 'Cities in Israel', 'clues': ['JR S LM', 'T LV V', 'HF', 'JF F']}
    ]
};

export default GameData;