import React, { useState, useEffect } from "react";
import MissingVowelCategory from './MissingVowelCategory';
import Answer from './Answer';
import ButtonCorrect from "./ButtonCorrect";
//import ButtonNext from './ButtonNext';

function MissingVowels(props)
{
    const [roundState, setRoundState] = useState(
        {
            index: -1,
            displayClue: true,
        }
    );

    useEffect(()=>
    {
        setTimeout(() => {setRoundState({...roundState, index:roundState.index+1})}, 2000);
    }, [props]);
    const correct = (wasCorrect) =>
    {
        //First display the right answer
        setRoundState({...roundState, displayClue: false});

        if(roundState.index < 3)
        {
            setTimeout(() => {setRoundState({...roundState, displayClue: true, index:roundState.index+1})}, 1500);
        }
        else
        {
            setTimeout(() => {
                setRoundState({...roundState, index:-1});
                props.onClick();
            }, 2000);
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
                    <MissingVowelCategory>{props.data["category"]}</MissingVowelCategory>
                </div>
                
                <div className="w-auto col-span-4">
                    <Answer hidden={roundState.index === -1}>{roundState.index > -1 ? (roundState.displayClue ? props.data["clues"][roundState.index]["clue"] : props.data["clues"][roundState.index]["answer"]) : ""}</Answer>   
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