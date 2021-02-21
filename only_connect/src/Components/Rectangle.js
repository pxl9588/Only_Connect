import React, { forwardRef } from "react";

const Rectangle = forwardRef(({ ...props }, ref) => {
    function handleClick() {
        if (props.clickBlock) {
            let obj = {
                word: props.word,
                id: props.id,
                group: props.group,
                clicked: props.clicked,
                matched: props.matched,
                ref,
            };
            props.clickBlock(obj);
        }
    }

    var text_size = "";
    var width = "";
    var height = "";
    //var color = "bg-gradient-to-r from-oc-blue via-blue-500 to-oc-blue";
    var color = "bg-oc-blue";
    var font_color = "text-black font-sans";

    //ANSWER
    if(props.type === "answer")
    {
        width = "w-full px-10";
        height = "h-8 lg:h-20";
        text_size = "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl";
        color = "bg-white";

    }
    else if (props.type === "correct")
    {
        width = "w-full px-16";
        height = "h-12 lg:h-20";
        text_size = "text-2xl sm:text-4xl lg:text-5xl";
        color = "bg-green-500";
    }
    else if (props.type === "incorrect")
    {
        width = "w-full px-16";
        height = "h-12 lg:h-20";
        text_size = "text-2xl sm:text-4xl lg:text-5xl";
        color = "bg-secondary";
    }

    //WALL
    else if (props.type === "wall")
    {
        width = "w-20 sm:w-20 lg:w-52 cursor-pointer";
        height = "h-16 sm:h-16 lg:h-40";
        text_size = "text-sm sm:text-md lg:text-4xl";
        color = `${props.color} ${!props.matched ? `md:hover:${props.hover}` : ""}`;
    }

    //VOWELS
    else if (props.type === "vowels")
    {
        width = "w-full px-10";
        height = "h-8 lg:h-20";
        text_size = "text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl";
        color = "bg-blue-800";
        font_color = "text-white";
    }

    //TIMER
    else if (props.type === "timer")
    {
        width = "p-2";
        height = "h-16 sm:h-20 lg:h-20";
        text_size = "text-2xl sm:text-4xl lg:text-5xl";
    }

    // Normal
    else
    {
        width = "w-16 sm:w-36 md:w-48 lg:w-56 xl:w-72";
        height = "h-12 sm:h-28 md:h-44 g:h-52 xl:h-64";
        text_size = "text-sm sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl";
    }

    if(props.color)
    {
        color = props.color;
    }

    return (
        <div
            ref={ref}
            onClick={props.matched ? undefined : handleClick}
            className={`
            ${width}
            ${height}
            ${color}
            shadow-3xl
            rounded-xl
            ${props.hidden ? "invisible" : ""}
            ${text_size}
            ${font_color}
            flex
            justify-center
            items-center
            select-none
            `}
        >
            {props.children}
        </div>
    );
});

export default Rectangle;
