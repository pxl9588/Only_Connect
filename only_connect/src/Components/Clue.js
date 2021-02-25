import React from "react";

function Clue(props) {

    var text_align = "text-center"
    var text_size = "text-sm sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl";
    var text_font = "text-dark-shade";
    var width = "w-16 sm:w-36 md:w-48 lg:w-56 xl:w-72";
    var height = "h-12 sm:h-28 md:h-44 g:h-52 xl:h-64";
    //var color = "bg-gradient-to-b from-light-shade to-dark-accent";
    var color ="bg-light-shade";
    var font_color = "text-black font-sans";
    var align_content = "flex justify-center items-center select-none"
    //var border = "border-2 border-black"
    var rounded = "rounded-xl lg:rounded-3xl"
    var shadow = "shadow-3xl"

    var text_style = `${text_size} ${text_align} ${text_font}`
    var style = `${width}
    ${height}
    ${color}
    ${shadow}
    ${rounded}
    ${props.hidden ? "invisible" : ""}
    ${text_style}
    ${font_color}
    ${align_content}
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
