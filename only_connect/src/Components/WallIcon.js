import React from 'react'

function WallIcon(props)
{
  const handleClick = () =>
  {
    props.onClick(props.id);
  }
  var pointer = "cursor-pointer";
  if(props.hidden)
  {
    pointer = "";
  }

  return (
    <div className={`p-10 ${pointer} select-none`}  onClick={props.hidden ? null : handleClick}>
        <img className={`h-24 w-24 sm:h-30 sm:w-30 lg:h-auto lg:w-auto ${props.hidden} pointer-events-none`} src={props.icon} alt={props.icon}/>
      </div>)
}

export default WallIcon;
