import React from "react";

function MissingVowelCategory(props) {

    var text_align = "text-center"
    var text_size = "text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl";
    var text_font = "text-dark-shade";
    var width = "w-full px-10";
    var height = "h-8 lg:h-20";
    //var color = "bg-gradient-to-b from-light-shade to-dark-accent";
    var color ="bg-light-shade";
    var font_color = "text-light-shade font-sans";
    var align_content = "flex justify-center items-center select-none"
    //var border = "border-2 border-black"
    var rounded = "rounded-xl lg:rounded-3xl"
    var shadow = "shadow-3xl"

    var text_style = `${text_size} ${text_align} ${text_font}`
    var style = `${width}
    ${height}
    ${props.color ? props.color : color}
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

export default MissingVowelCategory;
