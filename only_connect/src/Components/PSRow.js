import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Rectangle from "./Rectangle";
import "./PSRow.css";
import NextButton from "./NextButton";

function PSRow(props) {
    const [row, setRow] = useState({ inSession: true, count: 0 });
    const hidden_dictionary = {};
    const clues = props.row.clues;
    const answer = props.row.answer;
    const final_number = 3;

    // const handleClick = () => {
    //     setCount(count + 1);
    //     if (count == final_number + 1) {
    //         props.exitClick();
    //     }
    // };

    const handleNext = () => {
        let nextDisplay = row.count;
        if (nextDisplay < 3) {
            nextDisplay++;
        }
        setRow({ ...row, count: nextDisplay });
    };

    const buildRow = () => {
        return clues.map((clue, index) => {
            if (row.count >= index) {
                return (
                    <Rectangle type="rectangle" hidden={row.count >= index ? false : true}>
                        <textarea className="card">{clue}</textarea>
                    </Rectangle>
                );
            }
        });
    };

    return (
        <div className="grid grid-cols-4 justify-items-center items-center py-14 lg:py-40 gap-y-10 lg:gap-y-20">
            {buildRow()}
            <div className="col-span-full w-full justify-items-center px-4 lg:px-20">
                <Rectangle type="answer" hidden={row.count >= final_number + 1 ? "" : "hidden"}>
                    Hello
                </Rectangle>
                <TextField>Hello</TextField>
            </div>
            <div className="col-span-4 justify-items-center px-4 lg:px-20 cursor-pointer">
                <NextButton clickBlock={handleNext} type="answer">
                    Next
                </NextButton>
            </div>
        </div>
    );
}

export default PSRow;
