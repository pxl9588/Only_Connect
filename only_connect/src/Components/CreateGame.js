import React, {useState} from 'react';

function CreateGame(props)
{
    const [page, setPage] = useState(0);
    const newData = {
        answer: "",
        clues: []
    };

    const newMVData = {
        category: "",
        clues:
        [
            {"clue": "", "answer": ""},
            {"clue": "", "answer": ""},
            {"clue": "", "answer": ""},
            {"clue": "", "answer": ""}
        ]
    };

    const newInputVal = ["","","","","","","","",""];

    const [mvData, setMVData] = useState(newMVData);
    const [data, setData] = useState(newData);
    const [inputVal, setInputVal] = useState(newInputVal);
    const [gameData, setGameData] = useState({
        "connections": [
            {
                "answer": "",
                "clues": []
            },
            {
                "answer": "",
                "clues": []
            },
            {
                "answer": "",
                "clues": []
            },
            {
                "answer": "",
                "clues": []
            },
            {
                "answer": "",
                "clues": []
            },
            {
                "answer": "",
                "clues": []
            }
        ],
        "sequences": [
            {
                "answer": "",
                "clues": []
            },
            {
                "answer": "",
                "clues": []
            },
            {
                "answer": "",
                "clues": []
            },
            {
                "answer": "",
                "clues": []
            },
            {
                "answer": "",
                "clues": []
            },
            {
                "answer": "",
                "clues": []
            }
        ],
        "wall": {
            "wall1": [
                {
                    "answer": "",
                    "clues": []
                },
                {
                    "answer": "",
                    "clues": []
                },
                {
                    "answer": "",
                    "clues": []
                },
                {
                    "answer": "",
                    "clues": []
                }
            ],
            "wall2": [
                {
                    "answer": "",
                    "clues": []
                },
                {
                    "answer": "",
                    "clues": []
                },
                {
                    "answer": "",
                    "clues": []
                },
                {
                    "answer": "",
                    "clues": []
                }
            ]
        },
        "missingVowels": [
            {
                "category": "Sports Equipment",
                "clues": [
                    {
                        "clue": "Bsbll Bt",
                        "answer": "Baseball Bat"
                    },
                    {
                        "clue": "Rgby Bll",
                        "answer": "Rugby Ball"
                    },
                    {
                        "clue": "Tnns Rckt",
                        "answer": "Tennis Racket"
                    },
                    {
                        "clue": "Sccr Shn Grds",
                        "answer": "Soccer Shin Guards"
                    }
                ]
            },
            {
                "category": "",
                "clues": [
                    {
                        "clue": "",
                        "answer": ""
                    },
                    {
                        "clue": "",
                        "answer": ""
                    },
                    {
                        "clue": "",
                        "answer": ""
                    },
                    {
                        "clue": "",
                        "answer": ""
                    }
                ]
            },
            {
                "category": "",
                "clues": [
                    {
                        "clue": "",
                        "answer": ""
                    },
                    {
                        "clue": "",
                        "answer": ""
                    },
                    {
                        "clue": "",
                        "answer": ""
                    },
                    {
                        "clue": "",
                        "answer": ""
                    }
                ]
            },
            {
                "category": "",
                "clues": [
                    {
                        "clue": "",
                        "answer": ""
                    },
                    {
                        "clue": "",
                        "answer": ""
                    },
                    {
                        "clue": "",
                        "answer": ""
                    },
                    {
                        "clue": "",
                        "answer": ""
                    }
                ]
            }
        ]
    });

    const collectData = (i,e) =>
    {
        var val = e.target.value;
        var tempInputVal = [...inputVal];
        //Everything else
        if(page < 20)
        {
            // This records the answer
            if(i === 4)
            {
                setData({...data, answer: val})
            }   
            // This records the clues
            else
            {
                var tempClues = data.clues;
                tempClues[i] = val;
                setData({...data, clues: tempClues});
            }
        }
        //Missing Vowels
        else
        {
            var tempMV = {...mvData};

            if(i === 4)
            {
                tempMV.category = val;
            }
            else
            {
                var index = i;
                var key = "answer";

                if(i > 4)
                {
                    index = i - 5;
                    key = "clue";
                }
                else
                {
                    tempInputVal[5+i] = val.replace(/[aeiou]/ig,'');
                    tempMV["clues"][index]["clue"] = tempInputVal[5+i]
                }

                tempMV["clues"][index][key] = val;
            }

            setMVData(tempMV);
        }

        tempInputVal[i] = val;
        setInputVal(tempInputVal);
    }
    const generateInputs = () =>
    {
        var inputs = []
        for(var i = 0; i < 5; i++)
        {
            inputs.push(<div className={`${page >= 20 ? "grid grid-cols-1 md:flex" : "my-5"}  md:m-5`} key={i}>
                {i < 4 ? "Clue #"+(i+1) : page >= 20 ? "Category" : "Answer"}
                <input
                type="text"
                key={i}
                value={inputVal[i]}
                onInput={collectData.bind(this, i)}
                placeholder={i < 4 ? "Clue #"+(i+1) : page >= 20 ? "Category" : "Answer"}
                className="mx-4 px-2 h-10 placeholder-gray-400 text-gray-700 relative bg-white rounded text-md shadow outline-none focus:outline-none focus:shadow-outline"></input>
                {
                    (page >= 20 && i !== 4) ? <input
                    type="text"
                    key={5+i}
                    value={inputVal[5+i]}
                    onInput={collectData.bind(this, 5+i)}
                    placeholder={i < 4 ? "Clue Missing Vowel #"+(i+1) : ""}
                    className="mx-4 px-2 h-10 placeholder-gray-400 text-gray-700 relative bg-white rounded text-md shadow outline-none focus:outline-none focus:shadow-outline"></input> : ""
                }
                </div>
            );
        }

        return inputs;
    }

    const submit = () =>
    {
        var tempGameData = {...gameData};
        // Connection Rows
        if(page < 6)
        {
            tempGameData.connections[page] = data;
            setGameData(tempGameData);
            setData(newData);
        }
        else if(page < 12)
        {
            tempGameData.sequences[page] = data;
            setGameData(tempGameData);
            setData(newData);
        }
        else if(page < 16)
        {
            tempGameData.wall.wall1[page] = data;
            setGameData(tempGameData);
            setData(newData);
        }
        else if(page < 20)
        {
            tempGameData.wall.wall2[page] = data;
            setGameData(tempGameData);
            setData(newData);
        }
        else if(page < 24)
        {
            tempGameData.missingVowels[page] = data;
            setGameData(tempGameData);
            setMVData(newMVData);
            if(page === 23)
            {
                downloadFile();
            }
        }
        else
        {
            return;
        }
        setInputVal(newInputVal);
        setPage(page + 1);
    }

    const back = () =>
    {
        var new_page = page - 1;
        if(page === 0)
        {
            return;
        }

        var newInputVal = []
        if(new_page < 6)
        {
            for(var i = 0; i < 4; i++)
            {
                newInputVal.push(gameData.connections[new_page].clues[i]);
            }
            newInputVal.push(gameData.connections[new_page].answer);
            setData({answer: gameData.connections[new_page].answer, clues: gameData.connections[new_page].clues});
        }
        else if(new_page < 12)
        {
            for(i = 0; i < 4; i++)
            {
                newInputVal.push(gameData.sequences[new_page].clues[i]);
            }
            newInputVal.push(gameData.sequences[new_page].answer);
            setData({answer: gameData.sequences[new_page].answer, clues: gameData.sequences[new_page].clues});
        }
        else if(new_page < 16)
        {
            for(i = 0; i < 4; i++)
            {
                newInputVal.push(gameData.wall.wall1[new_page].clues[i]);
            }
            newInputVal.push(gameData.wall.wall1[new_page].answer);
            setData({answer: gameData.wall.wall1[new_page].answer, clues: gameData.wall.wall1[new_page].clues});
        }
        else if(new_page < 20)
        {
            for(i = 0; i < 4; i++)
            {
                newInputVal.push(gameData.wall.wall2[new_page].clues[i]);
            }
            newInputVal.push(gameData.wall.wall2[new_page].answer);
            setData({answer: gameData.wall.wall2[new_page].answer, clues: gameData.wall.wall2[new_page].clues});
        }
        else if(new_page < 24)
        {
            for(i = 0; i < 4; i++)
            {
                newInputVal.push(gameData.missingVowels[new_page].clues[i]["clues"]["clue"]);
            }
            newInputVal.push(gameData.missingVowels[new_page].clues[i]["category"]);
            for(i = 0; i < 4; i++)
            {
                newInputVal.push(gameData.missingVowels[new_page].clues[i]["clues"]["answer"]);
            }
            setMVData({category: gameData.missingVowels[new_page].category, clues: gameData.missingVowels[new_page].clues});
        }
        else
        {
            return;
        }
        setInputVal(newInputVal);
        setPage(page - 1);
    }

    const downloadFile = async () => {
        const myData = {...gameData};
        const fileName = "myGame";
        const json = JSON.stringify(myData);
        const blob = new Blob([json],{type:'application/json'});
        const href = await URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = fileName + ".json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const generateHeader = (i) =>
    {
        var content = ""
        if(i < 6)
        {
            content = `Connection Row #${i+1}`;
        }
        else if(i < 12)
        {
            content = `Sequence Row #${(i%6)+1}`;
        }
        else if(i < 16)
        {
            content = `Word Wall 1 #${(i%6)+1}`;
        }
        else if(i < 20)
        {
            content = `Word Wall 2 #${(i%4)+1}`;
        }
        else if(i < 24)
        {
            content = `Missing Vowels #${(i%4)+1}`;
        }
        else
        {
            content = "Your game is being downloaded";
        }
        
        return(<div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{content}</div>);
    }

    return (
        <div className="flex h-full justify-center">
            <div className="grid grid-cols-1 sm:gap-y-4 justify-center justify-items-center">
                {
                    generateHeader(page)
                }
                {
                    page < 24 ?
                    generateInputs() : ""
                }
                {
                    page < 24 ?
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-10 w-40 px-2 rounded m-4"
                    onClick={submit}>
                        Submit
                    </button>
                    : ""
                }
                {
                    page > 0 ?
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-10 w-40 px-2 rounded m-4"
                    onClick={back}>
                        Back
                    </button>
                    : ""
                }
            </div>
        </div>
        );
}

export default CreateGame;
