const GameData = {
    patterns: [
        {
            clues: ["Michael Jordan", "Magic Johnson", "Derek Fisher", "Scottie Pippen"],
            answer: " NBA Players with 5+ Championships",
        },
        {
            clues: ["Dash", "Good American", "POOSH", "SKIMS"],
            answer: "Kardashian Brands",
        },
        {
            clues: [
                "Eva, Can I Stab Bats In A Cave",
                "Dammit, I'm Mad",
                "Do Geese See God",
                "Racecar",
            ],
            answer: "Palindromes",
        },
        {
            clues: ["Mag", "Hip", "Yup", "Pot"],
            answer: "______pie",
        },

        {
            clues: ["Apples", "Dates", "Pomegranate", "Challah"],
            answer: "Symbolic Rosh Hashanah Foods",
        },
        {
            clues: ["Wombat", "Opoosum", "Koala", "Kangaroo"],
            answer: "Marsupials",
        },
    ],
    sequences: {
        1: {
            clues: ["Blue", "North", "Luna", "X Æ A-Xii"],
            answers: "Celebrity Babies in order of birth",
        },
        2: {
            clues: "Order of sharks in Baby Shark",
            answers: ["Baby", "Mommy", "Daddy", "Grandma"],
        },
        3: {
            clues: ["Rachel", "Becca", "Hannah", "Clare"],
            answers: "The Bachelorettes from ‘17-’20",
        },
        4: {
            clues: ["M = 1", "V = 2", "E = 3", "M = 4"],
            answers: "Planets",
        },
        5: {
            clues: ["Zach", "Alex", "PJ", "Ang"],
            answers: "Big Rascals Birthday’s",
        },
        6: {
            clues: ["United States", "China", "Canada", "Russia"],
            answers: "Size of Countries (Increasing)",
        },
    },
    wall: {
        wall1: [
            {"Drinks named after cities": ["Fiji", "Mocha", "San Pellegrino", "Champagne"]},
            {"Rappers named Ice ____":["T", "Cube", "Vanilla", "Prince"]},
            {"Dunkin Donuts Flavors" :["Hazelnut", "Coconut", "Butter Pecan", "Caramel"]},
            {"Oceania islands": ["Papua New Guinea", "Guam", "Australia", "Cook Islands"]},
        ],
        wall2: [
            {"Animal named bands": ["Eagles", "Beatles", "Monkees", "Gorillaz"]},
            {"Bird named sport teams": ["Pelicans", "Seahawks", "Falcons", "Cardinals"]},
            {"Birth stones": ["Sapphire", "Ruby", "Emerald", "Amethyst"]},
            {"Pokemon games": ["Crystal", "Gold", "Silver", "Diamond"]}
        ],
    },
    "missing vowels": {
        Chores: ["W SH NTH GD HS", "F LD NGL ND RY", "WPN GT HW NDW s", "HDNG STFF NTH CL ST"],
        "Clothing Brands": ["CL VNKL N", "ZR", "N DRRM R", "K NNT HC L"],
        "Mixed Drinks": ["W H TRS SN", "MSC WML", "D RKN DSTR M", "MRT TSR"],
        "Cities in Israel": ["JR S LM", "T LV V", "HF", "JF F"],
    },
};

export default GameData;