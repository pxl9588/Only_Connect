import React from 'react'

function WallIcon(props)
{
  const handleClick = () =>
  {
    props.onClick(props.id);
  }

  return (
    <div className={`p-10 sm:p-6 ${props.hidden ? "" : "cursor-pointer"} select-none`}  onClick={props.hidden ? null : handleClick}>
        <img className={`h-24 w-24 md:h-auto md:w-auto ${props.hidden} pointer-events-none`} src={props.icon} alt={props.icon}/>
      </div>)
}

export default WallIcon;
