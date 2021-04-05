const GameData = {
    connections: [
        {
            "answer": "Family Vacations",
            "clues": ["San Francisco", "Hawaii", "Florida", "Vermont"]  
        },
        {
            "answer": "Sports boys have participated in",
            "clues": ["Martial Arts", "Tennis", "Swimming", "Lacrosse"]
        },
        {
            "answer": "Former USSR Countries",
            "clues": ["Kazakhstan", "Belarus", "Georgia", "Kyrgyzstan"]
        },
        {
            "answer": "US State Capitals",
            "clues": ["Hartford", "Albany", "Montpelier", "Denver"]
        },
        {
            "answer": "Family Cars",
            "clues": ["", "Mercedes", "Jeep", "BMW"]
        },
        {
            "answer": "Schools Yuliya attended",
            "clues": ["Bambi", "Brooklyn Tech", "Hunter", "NYU"]
        }
    ],
    sequences:
        [
            {
                "answer": "Year of the _____",
                "clues": ["'18 - Dog", "'19 - Pig", "'20 - Rat", "'21 - Ox"]  
            },
            {
                "answer": "Family Members in Baby Shark",
                "clues": ["Baby", "Mommy", "Daddy", "Grandma"]
            },
            {
                "answer": "Family Birthdays",
                "clues": ["Anton", "Ira", "Daniel", "Dima"]
            },
            {
                "answer": "Planets",
                "clues": ["Earth", "Mars", "Jupiter", "Saturn"]
            },
            {
                "answer": "Colors of the Rainbow",
                "clues": ["Red", "Orange", "Yellow", "Green"]
            },
            {
                "answer": "Places of Residence",
                "clues": ["Mogilov", "Brooklyn", "Staten Island", "Weston"]
            }
        ],
    wall: {
        wall1: [
            {
                "answer": 'Fruits',
                "clues": ['Apple', 'Banana', 'Orange', 'Pear']
            },
            {
                "answer": 'Mario Characters',
                "clues": ['Boo', 'Peach', 'Bowser', 'Donkey Kong']
            },
            {
                "answer": 'Electronics',
                "clues": ['Microsoft', 'Dell', 'Asus', 'HP']
            },
            {
                "answer": 'Colors',
                "clues": ['Rose', 'Salmon', 'Magenta', 'Ruby']
            }
        ],
        wall2: [
            {
                "answer": 'Types of Oil',
                "clues": ['Motor', 'Canola', 'Vegetable', 'Olive']
            },
            {
                "answer": 'Types of Plants',
                "clues": ['Ash', 'Elm', 'Palm', 'Birch']
            },
            {
                "answer": 'Weather',
                "clues": ['Foggy', 'Rainy', 'Sunny', 'Snowy']
            },
            {
                "answer": 'Pokemon Characters',
                "clues": ['Brock', 'Pikachu', 'Misty', 'Team Rocket']
            }
        ]
    },
    missingVowels: [
        {'category': 'Chores', 'clues': [
            {'clue': 'W SH NTH GD HS', 'answer': 'WASHING THE DISHES'},
            {'clue': 'F LD NGL ND RY', 'answer': 'FOLDING LAUNDRY'},
            {'clue': 'WPN GT HW NDW S', 'answer': 'WIPING THE WINDOWS'},
            {'clue': 'HNG NGCL THS NTH CL ST', 'answer': 'HANGING CLOTHES IN THE CLOSET'}
        ]},
        {'category': 'Sports', 'clues': [
            {'clue': 'SCCR', 'answer': 'SOCCER'},
            {'clue': 'LCRSS', 'answer': 'LACROSSE'},
            {'clue': 'SWM MNG', 'answer': 'SWIMMING'},
            {'clue': 'FT BLL', 'answer': 'FOOTBALL'}
        ]},
        {'category': 'Sodas', 'clues': [
            {'clue': 'CK', 'answer': 'COKE'},
            {'clue': 'SP RT', 'answer': 'SPRITE'},
            {'clue': 'MN TN DW', 'answer': 'MOUNTAIN DEW'},
            {'clue': 'PP S', 'answer': 'PEPSI'}
        ]},
        {'category': 'Ski Resorts', 'clues': [
            {'clue': 'STW', 'answer': 'STOWE'},
            {'clue': 'KM', 'answer': 'OKEMO'},
            {'clue': 'VL', 'answer': 'VAIL'},
            {'clue': 'MNT SNW', 'answer': 'MOUNT SNOW'}
        ]}
    ]
};

export default GameData;
