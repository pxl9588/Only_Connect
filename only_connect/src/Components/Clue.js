import React from "react";

function Clue(props) {

    var text_align = "text-center"
    var text_size = "text-sm sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl";
    var width = "w-16 sm:w-36 md:w-48 lg:w-56 xl:w-72";
    var height = "h-12 sm:h-28 md:h-44 g:h-52 xl:h-64";
    //var color = "bg-gradient-to-r from-oc-blue via-blue-500 to-oc-blue";
    var color = "bg-clue";
    var font_color = "text-black font-sans";
    var align_content = "flex justify-center items-center select-none"
    var border = "border-2 border-black"

    var text_style = `${text_size} ${text_align}`
    var style = `${width}
    ${height}
    ${color}
    shadow-2xl
    rounded-3xl
    ${props.hidden ? "invisible" : ""}
    ${text_style}
    ${font_color}
    ${align_content}
    ${border}
    `

    return (
        <div
            className={`
                ${style}
                `}
        >
            {props.children}
        </div>
    );
};

export default Clue;
