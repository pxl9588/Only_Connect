import React, { useEffect, useContext } from "react";
//import socketIOClient from "socket.io-client";
import Clue from './Clue';
import Answer from './Answer';
import ButtonCorrect from './ButtonCorrect';
import {SessionContext} from '../context/SessionContext.js';
import { firebase } from "./firebaseConfig";
import RoundState from './hooks/RoundState'
var database = firebase.database()

function WordConnectionRow(props)
{
    let {authUser, sessionId} = useContext(SessionContext)
    const isAdmin = () =>
    {
        return authUser.uid === props.admin;
    }

    const {setRoundState, setRoundStateLocal, roundState} = RoundState([{
        hidden: true
        },'wordConnectionRow']);

    useEffect(() => {
        const ref = database.ref(`${sessionId}/wordConnectionRow`);
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

    useEffect(() =>
        {
            setRoundState({hidden: true});
        }, [props]);


    const correct = (wasCorrect) =>
    {
        setRoundState({hidden: false});
        setTimeout(() => {
            //This is a trick to give two bonus points if full wall and connections are completed
            props.exit(wasCorrect ? 1.2 : 0);
        }, 2000);
    }

    const renderView = (admin) =>
    {
        return (
            <div className="grid justify-items-center items-center py-2 sm:py-2 lg:py-24 gap-y-2 sm:gap-y-4 lg:gap-y-12 xl:gap-y-24">
    
                    <div className="row-start-2">
                        <Clue color={props.color}>{props.row["clues"][0]}</Clue>
                    </div>
                    <div className="row-start-2">
                        <Clue color={props.color}>{props.row["clues"][1]}</Clue>
                    </div>
                    <div className="row-start-2">
                        <Clue color={props.color}>{props.row["clues"][2]}</Clue>
                    </div>
                    <div className="row-start-2">
                        <Clue color={props.color}>{props.row["clues"][3]}</Clue>
                    </div>
    
                    <div className="row-start-3 col-span-4 w-full sm:px-3 md:px-6 lg:-px-12 xl:px-24">
                        <Answer type="answer" hidden={roundState.hidden}>{props.row["answer"]}</Answer>
                    </div>
    
                    {
                        admin ? 
                        <div className="row-start-4 col-span-2 justify-items-center px-4 lg:px-20">
                            <ButtonCorrect hidden={!roundState.hidden} clickBlock={() => {correct(true)}} type="correct"> Correct </ButtonCorrect>
                        </div>
                        :
                        <div></div>
                    } 
                    {
                        admin ? 
                        <div className="row-start-4 col-span-2 justify-items-center px-4 lg:px-20">
                            <ButtonCorrect hidden={!roundState.hidden} clickBlock={() => {correct(false)}} type="incorrect"> Incorrect </ButtonCorrect>
                        </div>
                        :
                        <div></div>
                    }
            </div>
        );   
    }

    return <div>{renderView(isAdmin())}</div>;
}

export default WordConnectionRow