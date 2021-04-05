import React, { useState, useEffect, useContext } from "react";
import MissingVowelCategory from './MissingVowelCategory';
import Answer from './Answer';
import ButtonCorrect from "./ButtonCorrect";
import {SessionContext} from '../context/SessionContext.js';
//import ButtonNext from './ButtonNext';

function MissingVowels(props)
{

    let {authUser} = useContext(SessionContext)
    const isAdmin = () =>
    {
        return authUser.uid === props.admin;
    }

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
        setTimeout(() => {setRoundState({...roundState, clueIndex:0})}, 1000);
    }, [roundState.categoryIndex]);

    const correct = (teamOneCorrect) =>
    {
        //First display the right answer
        setRoundState({...roundState, displayClue:false});
        
        var temp = {...roundState};
        temp.displayClue = true;
        if(teamOneCorrect)
        {
            temp.teamOnePoints =  roundState.teamOnePoints + 1;
        }
        else
        {
            temp.teamTwoPoints = roundState.teamTwoPoints + 1;
        }

        if(roundState.categoryIndex < 3)
        {
            if(roundState.clueIndex < 3)
            {
                temp.clueIndex = roundState.clueIndex + 1;
                //Show the next clue after the answer has been displayed for some time
                setTimeout(() => {setRoundState(temp)}, 750);
            }
            else
            {
                temp.clueIndex = -1;
                temp.categoryIndex = roundState.categoryIndex + 1;
                //Show the next category
                setTimeout(() => {setRoundState(temp)}, 750);
            }
        }
        else
        {
            if(roundState.clueIndex < 3)
            {
                temp.clueIndex = roundState.clueIndex + 1;
                //Show the next clue after the answer has been displayed for some time
                setTimeout(() => {setRoundState(temp)}, 750);
            }
            else
            {
                setTimeout(() => {props.exit(temp.teamOnePoints, temp.teamTwoPoints);}, 750);
            }
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

    return<div>{renderView(isAdmin())}</div>
}

export default MissingVowels