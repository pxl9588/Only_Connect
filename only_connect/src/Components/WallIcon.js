import React from 'react'

function WallIcon(props)
{
  const handleClick = () =>
  {
    if(props.onClick)
    {
      props.onClick(props.id);
    }
  }

  return (
    <div className={`p-10 sm:p-4 sm:mx-8 md:p-0 md:mx-12 lg:my-10 ${props.hidden ? "" : "cursor-pointer"} select-none`}  onClick={props.hidden ? null : handleClick}>
        <img className={`h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 lg:h-48 lg:w-48 ${props.hidden} pointer-events-none`} src={props.icon} alt={props.icon}/>
      </div>)
}

export default WallIcon;
