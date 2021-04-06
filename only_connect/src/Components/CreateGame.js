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
    const [gameData, setGameData] = useState({connections: [], sequences: [], wall: {wall1:[], wall2:[]}, missingVowels:[]});

    const collectData = (i,e) =>
    {
        var val = e.target.value;
        var tempInputVal = [...inputVal];
        tempInputVal[i] = val;
        setInputVal(tempInputVal);
        //Everything else
        if(page < 15)
        {
            if(i === 4)
            {
                setData({...data, answer: val})
            }   
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
                var key = "clue";

                if(i > 4)
                {
                    index = i - 5;
                    key = "answer";
                }

                tempMV["clues"][index][key] = val;
            }
            setMVData(tempMV);
        }
        console.log(data);
    }
    const generateInputs = () =>
    {
        var inputs = []
        for(var i = 0; i < 5; i++)
        {
            inputs.push(<div className={`${page > 15 ? "grid grid-cols-1 sm:flex" : ""} sm:m-10`} key={i}>
                {i < 4 ? "Clue #"+(i+1) : page > 15 ? "Category" : "Answer"}
                <input
                type="text"
                key={i}
                value={inputVal[i]}
                onInput={collectData.bind(this, i)}
                placeholder={i < 4 ? "Clue #"+(i+1) : page > 15 ? "Category" : "Answer"}
                className="mx-4 px-2 h-10 placeholder-gray-400 text-gray-700 relative bg-white rounded text-md shadow outline-none focus:outline-none focus:shadow-outline"></input>
                {
                    (page > 15 && i !== 4) ? <input
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
        if(page < 4)
        {
            tempGameData.connections.push(data);
            setGameData(tempGameData);
            setData(newData);
        }
        else if(page < 8)
        {
            tempGameData.sequences.push(data);
            setGameData(tempGameData);
            setData(newData);
        }
        else if(page < 12)
        {
            tempGameData.wall.wall1.push(data);
            setGameData(tempGameData);
            setData(newData);
        }
        else if(page < 16)
        {
            
            tempGameData.wall.wall2.push(data);
            setGameData(tempGameData);
            setData(newData);
        }
        else if(page < 20)
        {
            tempGameData.missingVowels.push(mvData);
            setGameData(tempGameData);
            setMVData(newMVData);
            if(page === 19)
            {
                console.log("downloading");
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
        if(i < 4)
        {
            content = `Connection Row #${i+1}`
        }
        else if(i < 8)
        {
            content = `Sequence Row #${(i%4)+1}`
        }
        else if(i < 12)
        {
            content = `Word Wall 1 #${(i%4)+1}`
        }
        else if(i < 16)
        {
            content = `Word Wall 2 #${(i%4)+1}`
        }
        else if(i < 19)
        {
            content = `Missing Vowels #${(i%4)+1}`
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
                    generateInputs()
                }
                
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-10 w-40 px-2 rounded m-4"
                    onClick={submit}>
                        Submit
                    </button>
            </div>
        </div>
        );
}

export default CreateGame;
