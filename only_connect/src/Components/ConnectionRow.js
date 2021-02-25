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
    const [roundState, setroundState] = useState(
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
            if(roundState.time < max_time)
            {
                id = setInterval(()=>{setroundState({...roundState, time: roundState.time + 1});}, 1000);
            }
            else if(roundState.time === max_time)
            {
                setroundState({...roundState, timer_color: "bg-red-600", timer_fill_color: "bg-red-600", buzzed: 2, cluesHidden:
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
        },[roundState]);

    const displayEnd = () => {
        setroundState(
            {
                ...roundState,
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
        if(roundState.buzzed === 1)
        {
            // Answer was incorrect, display all clues, and switch turns
            setroundState({...roundState, buzzed: 2, cluesHidden:
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
        else if(roundState.buzzed === 2)
        {
            displayEnd();

            setTimeout(() => {
                // No points added, team doesn't matter we always switch turns
                props.exit(0, true);
            }, 2000);
        }
    };

    const correct = () => {
        if (roundState.buzzed) {
            var teamOneTurn = props.turn;
            // Answer was correct, add the current points to the teams score, display end
            displayEnd();

            // If buzzed = 2, the other steam stole the points
            if(roundState.buzzed === 2)
            {
                teamOneTurn = !props.turn;
            }

            setTimeout(() => {
                props.exit(roundState.points, teamOneTurn);
            }, 2000);
        }        
    };
    
    const buzzerClick = () => {
        setroundState({...roundState, timer_color: "bg-green-600", timer_fill_color: "bg-green-600", buzzed: 1, time:max_time+1});
    };

    const nextClick = () => {
        if (roundState.count < final_number && !roundState.buzzed) {
            const point_array = [3, 2, 1];
            var temp = { ...roundState.cluesHidden};
            temp[roundState.count] = false;

            setroundState(
                {
                    ...roundState,
                    timerIndex: roundState.timerIndex + 1,
                    count: roundState.count + 1,
                    points: point_array[roundState.count-1],
                    cluesHidden: temp
                }
            )
        }
    };

    const renderSwitch = (admin) => {
        return (
            <div className="grid justify-items-center items-center py-2 sm:py-2 lg:py-24 gap-y-2 sm:gap-y-4 lg:gap-y-12 xl:gap-y-24">

                <div className={`justify-items-center items-center row-start-1 col-start-${roundState.timerIndex}`}>
                    <Timer completed={roundState.time} max={max_time} color={roundState.timer_color} fill_color={roundState.timer_fill_color} hidden={roundState.answerHidden[2]} points={roundState.points}></Timer>
                </div>

                <div className="row-start-2">
                    <Clue>{props.row["clues"][0]}</Clue>
                </div>
                <div className="row-start-2">
                    <Clue hidden={roundState.cluesHidden[1]}>{props.row["clues"][1]}</Clue>
                </div>
                <div className="row-start-2">
                    <Clue hidden={roundState.cluesHidden[2]}>{props.row["clues"][2]}</Clue>
                </div>
                <div className="row-start-2">
                    <Clue hidden={roundState.cluesHidden[3]}>{props.row["clues"][3]}</Clue>
                </div>

                <div className="row-start-3 col-span-4 w-full sm:px-3 md:px-6 lg:-px-12 xl:px-24">
                    <Answer type="answer" hidden={!admin && roundState.answerHidden[1]}>{props.row["answer"]}</Answer>
                </div>


                <div className="row-start-4 col-span-2 justify-items-center px-4 lg:px-20 cursor-pointer">
                    {
                        admin ? 
                        <ButtonCorrect clickBlock={correct} type="correct"> Correct </ButtonCorrect>
                        : 
                        <ButtonBuzzer clickBlock={buzzerClick}>Buzzer</ButtonBuzzer>
                    }
                </div>

                <div className="row-start-4 col-span-2 justify-items-center px-4 lg:px-20 cursor-pointer">
                    {
                        admin ? 
                        <ButtonCorrect clickBlock={incorrect} type="incorrect"> Incorrect</ButtonCorrect>
                        :
                        <ButtonNext clickBlock={nextClick}>Next</ButtonNext>
                    }
                </div>
            </div>
        );
    };

    return <div>{renderSwitch(true)}</div>;
}

export default ConnectionRow;
