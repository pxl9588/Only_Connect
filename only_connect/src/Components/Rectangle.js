import React, { useCallback, useRef, useEffect, forwardRef } from "react";

function Rectangle({...props}){

    function handleClick(){
        if(props.clickBlock)
        {
            let obj = {
                        word: props.word,
                        id: props.id,
                        group: props.group,
                        clicked: props.clicked,
                        matched: props.matched
            }
            props.clickBlock(obj);
        }
    }
    var text_size = "";
    var width = "";
    var height = "";
    var color = "bg-gradient-to-r from-oc-blue via-blue-300 to-oc-blue"//"bg-oc-blue";
    var font_color = "text-black";

    //ANSWER
    if(props.type === "answer")
    {
        width = "w-full";
        height = "h-8 lg:h-20";
        text_size = "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl";
        color = "bg-blue-700";
        font_color = "text-white";
    }

    else if(props.type === "next")
    {
        width = "w-full p-2";
        height = "h-12 lg:h-20";
        text_size = "text-2xl sm:text-4xl lg:text-5xl";
        color = "bg-blue-500"
    }

    //WALL
    else if (props.type === "wall") {
        width = "w-20 sm:w-24 lg:w-52 cursor-pointer";
        height = "h-16 sm:h-20 lg:h-40";
        text_size = "text-1xl lg:text-4xl";
        color = `${props.color} ${!props.matched ? `md:hover:${props.hover}` : ""}`;
    }

    //VOWELS
    else if (props.type === "vowels")
    {
        width = "w-full";
        height = "h-8 lg:h-20";
        text_size = "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl";
        color = "bg-blue-700";
        font_color = "text-white";
    }
    else if (props.type === "timer")
    {
        width = "p-2";
        height = "h-12 lg:h-20";
        text_size = "text-2xl sm:text-4xl lg:text-5xl";
    }

    else
    {
        width = "w-16 sm:w-36 md:w-48 lg:w-56 xl:w-72";
        height = "h-12 sm:h-28 md:h-44 g:h-52 xl:h-64";
        text_size = "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl";
    }

    return (
      <div onClick={props.matched ? undefined: handleClick} className={`${width} ${height} ${color} shadow-2xl rounded-xl ${props.hidden ? "invisible" : "" }`}>
          <h1 className={`${text_size} ${font_color} w-full h-full flex justify-center items-center text-center select-none`}>{props.children}</h1>
        </div>)
}

export default Rectangle
