import React, { useEffect, useState } from "react";
//import socketIOClient from "socket.io-client";
import Clue from "./Clue";
import Answer from "./Answer";
import ButtonNext from "./ButtonNext";
import ButtonCorrect from "./ButtonCorrect";
import ButtonBuzzer from "./ButtonBuzzer";
import Timer from "./Timer";
import Rectangle from "./Rectangle";

function ConnectionRow(props) {
    const [buzzed, setBuzzed] = useState(0);
    const [timerOver, setTimerOver] = useState(false);
    const [points, setPoints] = useState(5);
    const [count, setCount] = useState(1);
    const [timerIndex, setTimerIndex] = useState(1);
    const [cluesHidden, setCluesHidden] = useState({
        1: true,
        2: true,
        3: true,
    });
    const [answerHidden, setAnswerHidden] = useState({
        1: true,
        2: false,
    });

    var final_number = 4;

    useEffect(() => {
        if (timerOver) {
            setBuzzed(2);
            displayLastClue();
        }
    }, [timerOver]);

    const displayEnd = () => {
        setCluesHidden({
            1: false,
            2: false,
            3: false,
        });

        setAnswerHidden({
            1: false,
            2: true,
        });
    };
    const displayLastClue = () => {
        setCluesHidden({
            1: false,
            2: false,
            3: false,
        });

        setAnswerHidden({
            1: true,
            2: false,
        });

        setTimerIndex(4);
        setPoints(1);
    };
    const timerEnd = () => {
        setTimerOver(true);
    };
    const incorrect = () => {
        if (buzzed == 1) {
            // Answer was correct, add the current points to the teams score, display end
            displayLastClue();

            setBuzzed(2);
        } else if (buzzed == 2) {
            displayEnd();

            setTimeout(() => {
                props.exit();
            }, 2000);
        }
    };

    const correct = () => {
        if (buzzed) {
            // Answer was correct, add the current points to the teams score, display end
            displayEnd();

            setTimeout(() => {
                props.exit();
            }, 2000);
        }
    };
    const buzzerClick = () => {
        setBuzzed(1);
    };

    const nextClick = () => {
        if (count < final_number && !buzzed) {
            setCount(count + 1);
            var temp = { ...cluesHidden };

            const point_array = [3, 2, 1];
            setTimerIndex(timerIndex + 1);
            temp[count] = false;
            setCluesHidden(temp);
            setPoints(point_array[count - 1]);
        }
    };

    const renderSwitch = (admin) => {
        if (admin) {
            return (
                <div className="grid justify-items-center items-center py-2 sm:py-2 lg:py-24 gap-y-2 sm:gap-y-4 lg:gap-y-12 xl:gap-y-24">
                    <div
                        className={`justify-items-center items-center row-start-1 col-start-${timerIndex}`}
                    >
                        <Timer
                            completed={0}
                            max={40}
                            hidden={answerHidden[2]}
                            timerEnd={timerEnd}
                            finished={buzzed}
                            points={points}
                        ></Timer>
                    </div>

                    <div className="row-start-2 col-span-1">
                        <Clue>{props.row["clues"][0]}</Clue>
                    </div>
                    <div className="row-start-2 col-span-1">
                        <Clue hidden={cluesHidden[1]}>{props.row["clues"][1]}</Clue>
                    </div>
                    <div className="row-start-2 col-span-1">
                        <Clue hidden={cluesHidden[2]}>{props.row["clues"][2]}</Clue>
                    </div>
                    <div className="row-start-2 col-span-1">
                        <Clue hidden={cluesHidden[3]}>{props.row["clues"][3]}</Clue>
                    </div>

                    <div className="row-start-3 col-span-4 w-full sm:px-3 md:px-6 lg:-px-12 xl:px-24">
                        <Rectangle type="answer" hidden={answerHidden[1]}>
                            {props.row["answer"]}
                        </Rectangle>
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
                    <div
                        className={`justify-items-center items-center row-start-1 col-start-${timerIndex}`}
                    >
                        <Timer
                            completed={0}
                            max={40}
                            hidden={answerHidden[2]}
                            timerEnd={timerEnd}
                            finished={buzzed}
                            points={points}
                        ></Timer>
                    </div>

                    <div className="row-start-2 col-span-1">
                        <Clue>{props.row["clues"][0]}</Clue>
                    </div>
                    <div className="row-start-2 col-span-1">
                        <Clue hidden={cluesHidden[1]}>{props.row["clues"][1]}</Clue>
                    </div>
                    <div className="row-start-2 col-span-1">
                        <Clue hidden={cluesHidden[2]}>{props.row["clues"][2]}</Clue>
                    </div>
                    <div className="row-start-2 col-span-1">
                        <Clue hidden={cluesHidden[3]}>{props.row["clues"][3]}</Clue>
                    </div>

                    <div className="row-start-3 col-span-4 w-full sm:px-3 md:px-6 lg:-px-12 xl:px-24">
                        <Rectangle type="answer" hidden={answerHidden[1]}>
                            {props.row["answer"]}
                        </Rectangle>
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

    return <div>{renderSwitch(true)}</div>;
}

export default ConnectionRow;
