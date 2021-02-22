import React, { useEffect, useState } from "react";
//import socketIOClient from "socket.io-client";
import Clue from "./Clue";
import Answer from "./Answer";
import ButtonNext from "./ButtonNext";
import ButtonCorrect from "./ButtonCorrect";
import ButtonBuzzer from "./ButtonBuzzer";
import Timer from "./Timer";

function ConnectionRow(props)
{
    const final_number = 4;
    const max_time = 40;
    const [gameState, setGameState] = useState(
        {
            time: 0,
            timer_fill_color: "bg-blue-900",
            timer_color: "bg-blue-700",
            buzzed: 0,
            points: 5,
            count: 1,
            timerIndex: 1,
            cluesHidden:
            {
                1: true,
                2: true,
                3: true
            },
            answerHidden:
            {
                1:true,
                2:false
            }
        }
    );    

    useEffect(
        () =>
        {
            var id = null;
            //Max time reached, other team get's to answer
            if(gameState.time < max_time)
            {
                id = setInterval(()=>{setGameState({...gameState, time: gameState.time + 1});}, 1000);
            }
            else if(gameState.time === max_time)
            {
                console.log("Hello");
                setGameState({...gameState, timer_color: "bg-red-600", timer_fill_color: "bg-red-600", buzzed: 2, cluesHidden:
                {
                    1: false,
                    2: false,
                    3: false
                },
                answerHidden:
                {
                    1:true,
                    2:false
                },
                timerIndex: 4,
                points: 1});
            }
            return () => clearInterval(id);
        },[gameState]);

    const displayEnd = () => {
        setGameState(
            {
                ...gameState,
                cluesHidden:
                {
                    1: false,
                    2: false,
                    3: false
                },
                answerHidden:
                {
                    1:false,
                    2:true
                }
            }
        )
    };

    const incorrect = () =>
    {
        if(gameState.buzzed === 1)
        {
            // Answer was incorrect, display all clues, and switch turns
            props.switchTurn();
            setGameState({...gameState, buzzed: 2, cluesHidden:
                {
                    1: false,
                    2: false,
                    3: false
                },
                answerHidden:
                {
                    1:true,
                    2:false
                },
                timerIndex: 4,
                points: 1});
        }
        else if(gameState.buzzed === 2)
        {
            displayEnd();

            setTimeout(() => {
                props.exit();
            }, 2000);
        }
    };

    const correct = () => {
        if (gameState.buzzed) {
            // Answer was correct, add the current points to the teams score, display end
            displayEnd();

            props.addToScore(gameState.points);
            if(gameState.buzzed === 1)
            {
                props.switchTurn();
            }

            setTimeout(() => {
                props.exit();
            }, 2000);
        }        
    };
    
    const buzzerClick = () => {
        setGameState({...gameState, timer_color: "bg-green-600", timer_fill_color: "bg-green-600", buzzed: 1, time:max_time+1});
    };

    const nextClick = () => {
        if (gameState.count < final_number && !gameState.buzzed) {
            const point_array = [3, 2, 1];
            var temp = { ...gameState.cluesHidden};
            temp[gameState.count] = false;

            setGameState(
                {
                    ...gameState,
                    timerIndex: gameState.timerIndex + 1,
                    count: gameState.count + 1,
                    points: point_array[gameState.count-1],
                    cluesHidden: temp
                }
            )
        }
    };

    const renderSwitch = (admin) => {
        if (admin) {
            return (
            <div className="grid justify-items-center items-center py-2 sm:py-2 lg:py-24 gap-y-2 sm:gap-y-4 lg:gap-y-12 xl:gap-y-24">

                <div className={`justify-items-center items-center row-start-1 col-start-${gameState.timerIndex}`}>
                    <Timer completed={gameState.time} max={max_time} color={gameState.timer_color} fill_color={gameState.timer_fill_color} hidden={gameState.answerHidden[2]} points={gameState.points}></Timer>
                </div>

                    <div className="row-start-2 col-span-1">
                        <Clue>{props.row["clues"][0]}</Clue>
                    </div>
                    <div className="row-start-2 col-span-1">
                        <Clue hidden={gameState.cluesHidden[1]}>{props.row["clues"][1]}</Clue>
                    </div>
                    <div className="row-start-2 col-span-1">
                        <Clue hidden={gameState.cluesHidden[2]}>{props.row["clues"][2]}</Clue>
                    </div>
                    <div className="row-start-2 col-span-1">
                        <Clue hidden={gameState.cluesHidden[3]}>{props.row["clues"][3]}</Clue>
                    </div>

                <div className="row-start-3 col-span-4 w-full sm:px-3 md:px-6 lg:-px-12 xl:px-24">
                    <Answer type="answer" hidden={gameState.answerHidden[1]}>{props.row["answer"]}</Answer>
                </div>

                    <div className="row-start-4 col-span-2 justify-items-center px-4 lg:px-20 cursor-pointer">
                        <ButtonCorrect clickBlock={correct} type="correct">
                            Correct
                        </ButtonCorrect>
                    </div>

                    <div className="row-start-4 col-span-2 justify-items-center px-4 lg:px-20 cursor-pointer">
                        <ButtonCorrect clickBlock={incorrect} type="incorrect">
                            Incorrect
                        </ButtonCorrect>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="grid justify-items-center items-center py-2 sm:py-2 lg:py-24 gap-y-2 sm:gap-y-4 lg:gap-y-12 xl:gap-y-24">
    
                 <div className={`justify-items-center items-center row-start-1 col-start-${gameState.timerIndex}`}>
                    <Timer completed={gameState.time} max={max_time} color={gameState.timer_color} fill_color={gameState.timer_fill_color} hidden={gameState.answerHidden[2]} points={gameState.points}></Timer>
                </div>

                    <div className="row-start-2 col-span-1">
                        <Clue>{props.row["clues"][0]}</Clue>
                    </div>
                    <div className="row-start-2 col-span-1">
                        <Clue hidden={gameState.cluesHidden[1]}>{props.row["clues"][1]}</Clue>
                    </div>
                    <div className="row-start-2 col-span-1">
                        <Clue hidden={gameState.cluesHidden[2]}>{props.row["clues"][2]}</Clue>
                    </div>
                    <div className="row-start-2 col-span-1">
                        <Clue hidden={gameState.cluesHidden[3]}>{props.row["clues"][3]}</Clue>
                    </div>

                    <div className="row-start-3 col-span-4 w-full sm:px-3 md:px-6 lg:-px-12 xl:px-24">
                        <Answer type="answer" hidden={gameState.answerHidden[1]}>{props.row["answer"]}</Answer>
                    </div>

                    <div className="row-start-4 col-span-2 justify-items-center px-4 lg:px-20 cursor-pointer">
                        <ButtonBuzzer clickBlock={buzzerClick}>Buzzer</ButtonBuzzer>
                    </div>

                    <div className="row-start-4 col-span-2 justify-items-center px-4 lg:px-20 cursor-pointer">
                        <ButtonNext clickBlock={nextClick}>Next</ButtonNext>
                    </div>
                </div>
            );
        }
    };

    return <div>{renderSwitch(false)}</div>;
}

export default ConnectionRow;
