const GameData = {
    connections: [
        {
            "clues": ["Liverpool", "Arsenal", "Chelsea", "Manchester City"],
            "answer": "Premier League Footbal Clubs",
        },
        {
            "clues": ["Mother", "Dash", "Head", "Shuffle"],
            "answer": "_____ Board",
        },
        {
            "clues": ["Ryan Giggs", "Louis van Gaal", "José Mourinho", "Ole Gunnar Solskjær"],
            "answer": "Manchester United Managers",
        },
        {
            "clues": ["Just Fontaine", "Gerd Müller", "Ronaldo", "Miroslav Klose"],
            "answer": "World Cup leading goal scorers",
        },

        {
            "clues": ["M : 1", "V : 2", "E : 3", "M : 4"],
            "answer": "Planets and their positions",
        },
        {
            "clues": ["F : USA", "R : New Zealand", "S : United Kingdom", "H : Canada"],
            "answer": "Countries and their popular sport"
        }
    ],
    sequences:
        [
            {
                "clues": ["Germany", "South Africa", "Brazil", "Russia"],
                "answer": "World Cup Locations"
            },
            {
                "clues": ["Mbappe", "Neymar Jr.", "Ronaldo", "Messi"],
                "answer": "Highest Paid Football Players"
            },
            {
                "clues": ["Arsenal", "Manchester City", "Chelsea", "Manchester United"],
                "answer": "Most Premier League championships"
            },
            {
                "clues": ["Chelsea", "Manchester City", "Manchester City", "Liverpool"],
                "answer": "Recent Premier League Champions"
            },
            {
                "clues": ["France", "Netherlands", "Argentina", "Croatia"],
                "answer": "World Cup Runner-ups"
            },
            {
                "clues": ["Keeper", "Defender", "Midfielder", "Forward"],
                "answer": "Positions (Towards Center)"
            }
            
        ],
    wall: {
        wall1: [
            {"answer": "Types of Sharks", "clues": ["Hammerhead", "Whale", "Sand", "Nurse"]},
            {"answer": "_____-Man","clues": ["Ant", "Spider", "Iron", "Super"]},
            {"answer": "Monopoly Pieces", "clues": ["Top Hat", "Battleship", "Thimble", "Boot"]},
            {"answer": "Plagues of Egypt", "clues": ["Boil", "Locust", "Blood", "Frog"]}
        ],
        wall2: [
            {"answer": 'Shades of Red', "clues": ['Blood', 'Maroon', 'Strawberry', 'Cherry']},
            {"answer": 'Films that start with American', "clues": ['Sniper', 'Pie', 'Gangster', 'Beauty']},
            {"answer": 'Types of birds', "clues": ['Eagle', 'Owl', 'Finch', 'Kiwi']},
            {"answer": 'Clue characters', "clues": ['Plum', 'Scarlet', 'Peacock', 'Green']},
        ],
    },
    missingVowels: [
        {'category': 'Desserts',
            'clues': [
            {'clue': 'TR MS', 'answer': 'TIRAMISU'},
            {'clue': 'BN NPD DNG', 'answer': 'BANANA PUDDING'},
            {'clue': 'BR WNS ND', 'answer': 'BROWNIE SUNDAE'},
            {'clue': 'CHC LTLV CK', 'answer': 'CHOCOLATE LAVA CAKE'}
        ]},
        {'category': 'Famous Paintings',
            'clues': [
            {'clue': 'MN LS', 'answer': 'MONA LISA'},
            {'clue': 'GR LW THPR LRRNG', 'answer': 'GIRL WITH A PEARL EARRING'},
            {'clue': 'THL STSP PR', 'answer': 'THE LAST SUPPER'},
            {'clue': 'ST RRN GHT', 'answer': 'STARRY NIGHT'},
        ]},
        {'category': 'National Parks',
            'clues': [
            {'clue': 'GR NDC NN', 'answer': 'GRAND CANYON'},
            {'clue': 'DT HV LLY', 'answer': 'DEATH VALLEY'},
            {'clue': 'YSMT', 'answer': 'YOSEMITE'},
            {'clue': 'YL LWS TN', 'answer': 'YELLOW STONE'}
        ]},
        {'category': 'Shakespeare Plays',
            'clues': [
            {'clue': 'HMLT', 'answer': 'HAMLET'},
            {'clue': ' MD SM MRNG HTS DRM', 'answer': 'A MIDSUMMER NIGHTS DREAM'},
            {'clue': 'KN GLR', 'answer': 'KING LEAR'},
            {'clue': 'MC HDBT NTH NG', 'answer': 'MUCH ADO ABOUT NOTHING'}
        ]}
    ]
};

export default GameData;
