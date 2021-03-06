import React, {forwardRef} from "react";

const WordWallClue = forwardRef(({ ...props }, ref) => {
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

    var text_align = "text-center"
    var text_size = "text-sm sm:text-md lg:text-4xl";
    var text_font = "text-dark-shade";
    var width = "w-20 sm:w-20 lg:w-52 cursor-pointer";
    var height = "h-16 sm:h-16 lg:h-40";
    //var color = "bg-gradient-to-b from-light-shade to-dark-accent";
    var font_color = "text-black font-sans";
    var align_content = "flex justify-center items-center select-none"
    //var border = "border-2 border-black"
    var rounded = "rounded-xl lg:rounded-3xl"
    var shadow = "shadow-3xl"

    var text_style = `${text_size} ${text_align} ${text_font}`
    var style = `${width}
    ${height}
    ${props.color}
    ${shadow}
    ${rounded}
    ${props.hidden ? "invisible" : ""}
    ${text_style}
    ${font_color}
    ${align_content}
    `

    return (
        <div
            ref={ref}
            id={props.key}
            onClick={props.matched ? undefined : handleClick}
            className={`${style}`}
        >
            {props.children}
        </div>
    );
});

export default WordWallClue;
