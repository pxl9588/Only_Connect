import React, { useEffect, useContext } from "react";
import MissingVowelCategory from './MissingVowelCategory';
import Answer from './Answer';
import ButtonCorrect from "./ButtonCorrect";
import ButtonBuzzer from "./ButtonBuzzer";
import {SessionContext} from '../context/SessionContext.js';
import { firebase } from "./firebaseConfig";
import RoundState from './hooks/RoundState'
var database = firebase.database()
//import ButtonNext from './ButtonNext';

function MissingVowels(props)
{

    let {authUser, sessionId} = useContext(SessionContext)
    const isAdmin = () =>
    {
        return authUser.uid === props.admin;
    }

    const {setRoundState, setRoundStateLocal, roundState} = RoundState([{
        clueIndex: -1,
        categoryIndex: 0,
        displayClue: true,
        teamOnePoints: 0,
        teamTwoPoints: 0,
        buzzed: 0,
        buzzed_team: -1
        },'missingVowels']);


    useEffect(() => {
        const ref = database.ref(`${sessionId}/missingVowels`);
        ref.on("value", (state) => {
            const data = state.val();
            if (data) {
                setRoundStateLocal(data);
            }
        });
        return () => {
            ref.off();
        };
    }, [sessionId, setRoundStateLocal]);

    useEffect(()=>
    { 
        //Check round state and exit here dummy
        setTimeout(() => {setRoundState({...roundState, clueIndex:0})}, 1000);
    }, [roundState.categoryIndex]);

    const buzzer = () =>
    {
        // Set the buzzer to the team that buzzed in
        setRoundState({...roundState, buzzed: 1, buzzed_team: props.team});
    }

    const correct = (correct) =>
    {
        
        var temp = {...roundState};
        if(!correct)
        {
            // If the first team got it wrong, switch teams to allow for steal
            if(roundState.buzzed === 1)
            {
                setRoundState({...roundState, buzzed: 2, buzzed_team: (roundState.buzzed_team === 0) ? 1 : 0});
                return;
            }
        }
        else
        {
            if(roundState.buzzed_team === 0)
            {
                temp.teamOnePoints =  roundState.teamOnePoints + 1;
            }
            else
            {
                temp.teamTwoPoints = roundState.teamTwoPoints + 1;
            }
        }

        //Display the right answer
        setRoundState({...roundState, displayClue:false});
        
        temp.displayClue = true;
        temp.buzzed = 0;
        temp.buzzed_team = -1;

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

    const renderView = (admin) =>
    {
        return (
            <div className="grid grid-rows-4 justify-items-center items-center py-14 lg:py-40 lg:gap-y-6">
                <div className="w-auto col-span-4" hidden={roundState.buzzed === 0}>
                    {
                        roundState.buzzed_team === 0 ? "Team One " : "Team Two "
                    }
                    {
                        roundState.buzzed === 1 ? "buzzed in!" : "can steal!"
                    }
                </div>
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
                            <ButtonCorrect clickBlock={() => {if(roundState.displayClue && roundState.buzzed){correct(true)}}} hidden={roundState.buzzed === 0} type="correct"> Correct </ButtonCorrect>
                            <ButtonCorrect clickBlock={() => {if(roundState.displayClue && roundState.buzzed){correct(false)}}} hidden={roundState.buzzed === 0} type="incorrect"> Incorrect </ButtonCorrect>
                            </div>
                        </div>
                        :
                        <div className="row-start-4 col-span-4 justify-items-center px-4 lg:px-20">
                            <ButtonBuzzer clickBlock={() => {if(roundState.displayClue && !roundState.buzzed){buzzer()}}} hidden={roundState.buzzed > 0}>Buzzer</ButtonBuzzer>
                        </div>
                }
            </div>
        );
    }

    return<div>{renderView(isAdmin())}</div>
}

export default MissingVowels