import React from "react";

const width = "p-2";
const height = "h-12 lg:h-20";
const text_size = "text-2xl sm:text-4xl lg:text-5xl";
const color = "bg-blue-500";

const NextButton = (props) => {
    const handleClick = () => {
        props.clickBlock();
    };
    return (
        <div onClick={handleClick} className={`${width} ${height} ${color} shadow-2xl rounded-md`}>
            <h1
                className={`${text_size} w-full h-full flex justify-center items-center text-center`}
            >
                {props.children}
            </h1>
        </div>
    );
};

export default NextButton;
