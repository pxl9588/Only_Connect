import React, { useState, useEffect } from "react";
import MissingVowelCategory from './MissingVowelCategory';
import Answer from './Answer';
import ButtonCorrect from "./ButtonCorrect";
//import ButtonNext from './ButtonNext';

function MissingVowels(props)
{
    const [roundState, setRoundState] = useState(
        {
            clueIndex: -1,
            categoryIndex: 0,
            displayClue: true,
            teamOnePoints: 0,
            teamTwoPoints: 0
        }
    );

    useEffect(()=>
    { 
        //Check round state and exit here dummy
        setTimeout(() => {setRoundState({...roundState, clueIndex:0})}, 500);
    }, [roundState.categoryIndex]);

    const correct = (teamOneCorrect) =>
    {
        var temp = {...roundState};
        if(teamOneCorrect)
        {
            temp.teamOnePoints += 1;
        }
        else
        {
            temp.teamTwoPoints += 1;
        }
        temp.displayClue = false;

        //First display the right answer
        setRoundState(temp);

        if(roundState.categoryIndex < 4)
        {
            if(roundState.clueIndex < 3)
            {
                //Show the next clue after the answer has been displayed for some time
                setTimeout(() => {setRoundState({...roundState, displayClue: true, clueIndex:roundState.clueIndex+1})}, 500);
            }
            else
            {
                //Show the next category
                setTimeout(() => {setRoundState({...roundState, displayClue: true, categoryIndex:roundState.categoryIndex+1, clueIndex: -1})}, 500);
            }
        }
        else
        {
            setTimeout(() => {
                props.exit(roundState.teamOnePoints, roundState.teamTwoPoints);
            }, 1500);
        }
    }

    /*const handleClick = (wasCorrect) =>
    {
        if(index < 3)
        {
            setIndex(index+1);
        }
        else
        {
            setIndex(-1);
            props.onClick();
        }
    }*/

    const renderView = (admin) =>
    {
        return (
            <div className="grid grid-rows-3 justify-items-center items-center py-14 lg:py-40 lg:gap-y-6">
                <div className="w-auto col-span-4">
                    <MissingVowelCategory>{roundState.categoryIndex < 4 ? props.data[roundState.categoryIndex]["category"]: ""}</MissingVowelCategory>
                </div>
                
                <div className="w-auto col-span-4">
                    <Answer hidden={roundState.clueIndex === -1}>{roundState.clueIndex > -1 ? (roundState.displayClue ? props.data[roundState.categoryIndex]["clues"][roundState.clueIndex]["clue"] : props.data[roundState.categoryIndex]["clues"][roundState.clueIndex]["answer"]) : ""}</Answer>   
                </div>
                {
                    admin ? 
                        <div className="row-start-4 col-span-4 justify-items-center px-4 lg:px-20">
                            <div className="grid grid-cols-2 gap-x-24">
                            <ButtonCorrect clickBlock={() => {if(roundState.displayClue){correct(true)}}} type="correct"> Team 1 </ButtonCorrect>
                            <ButtonCorrect clickBlock={() => {if(roundState.displayClue){correct(false)}}} type="incorrect"> Team 2 </ButtonCorrect>
                            </div>
                        </div>
                        :
                        <div></div>
                }
            </div>
        );
    }

    return<div>{renderView(true)}</div>
}

export default MissingVowels