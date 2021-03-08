const GameData = {
    connections: [
        {
            "clues": ["F: USA", "R: New Zealand", "S: United Kingdom", "H: Canada"],
            "answer": "Popular Sport : Country",
        },
        {
            "clues": ["Mother", "Dash", "Head", "Shuffle"],
            "answer": "_____ Board",
        },
        {
            "clues": ["Sunday Morning", "Californiacation", "Ex-Calling", "Hot Girl Bummer"],
            "answer": "Artist with color in name",
        },
        {
            "clues": ["Allan : CT", "Sharon : Z", "Yuliya : T", "Danya : KB"],
            "answer": "Pets and their owners",
        },

        {
            "clues": ["5th Avenue", "59th Street", "8th Avenue", "110th Street"],
            "answer": "Central Park perimeter streets",
        },
        {
            "clues": ["Bay Academy", "Midwood", "Baruch", "Fordham"],
            "answer": "Schools Alex attended"
        }
    ],
    sequences:
        [
            {
                "clues": ["S", "X", "3", "Y"],
                "answer": "Tesla Models"
            },
            {
                "clues": ["Take", "Select", "Caption", "Post"],
                "answer": "Posting on instagram"
            },
            {
                "clues": ["Hillary", "Laura", "Michelle", "Melania"],
                "answer": "First Ladies"
            },
            {
                "clues": ["Super Bowl", "NBA Championship", "Stanley Cup Finals", "World Series"],
                "answer": "Sports Finals"
            },
            {
                "clues": ["Max", "Ang", "Danya", "John"],
                "answer": "Covid Positive"
            },
            {
                "clues": ["Cancun", "Montreal", "Connecticut", "Sarratoga Springs"],
                "answer": "Places visited by the group"
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
