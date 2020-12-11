import React from 'react'

function Rectangle(props)
{
    var text_size = "";
    var width = "";
    var height = "";
    var color ="bg-oc-blue";

    //ANSWER
    if(props.type === "answer") {
        width = "p-2";
        height = "h-12 lg:h-20";
        text_size = "text-2xl sm:text-4xl lg:text-5xl";
    }

    //WALL
    else if (props.type === "wall")
    {
        width = "w-20 sm:w-24 lg:w-52";
        height = "h-16 sm:h-20 lg:h-40";
        text_size = "text-1xl lg:text-4xl";
    }

    //VOWELS
    else if (props.type === "vowels")
    {
        width = "p-4";
        height = "";
        text_size = "text-3xl sm:text-4xl lg:text-5xl";
        color = "bg-blue-800 text-white";
    }

    else
    {
        width = "w-16 sm:w-36 lg:w-80";
        height = "h-12 sm:h-28 lg:h-64";
        text_size = "text-2xl sm:text-6xl lg:text-8xl";
    }

    return (
      <div className={width + " " + height + " " + color + " " + " shadow-2xl rounded-md"}>
          <h1 className={text_size + " w-full h-full flex justify-center items-center text-center"}>{props.text}</h1>
        </div>)
}

export default Rectangle