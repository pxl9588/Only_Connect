import React from "react";

function Answer(props) {

    var text_align = "text-center"
    var text_size = "text-2xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-5xl";
    var width = "w-full px-10";
    var height = "h-8 lg:h-20";
    var color = "bg-dark-shade";
    var font_color = "text-light-shade";
    var align_content = "flex justify-center items-center select-none"
    //var border = "border-2 border-black"
    var rounded = "rounded-xl lg:rounded-3xl"
    var shadow = "shadow-3xl"

    var text_style = `${text_size} ${text_align}`
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

export default Answer;
