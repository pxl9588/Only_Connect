import React from 'react'

function Rectangle(props)
{
    var text_size = "";
    if(props.type === "rectangle") {
        text_size = "text-8xl";
    } else {
        text_size = "text-4xl";
    }
    return (
      <div className={props.type + " shadow-2xl rounded-md"}>
          <h1 className={text_size}>{props.text}</h1>
        </div>)
}

export default Rectangle