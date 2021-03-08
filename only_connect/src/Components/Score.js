import React from 'react'

function WallIcon(props)
{
  return (
    <div className={`p-10 select-none items-center justify-items-center justify-center`}>
        <img className={`h-30 w-30 sm:h-36 sm:w-36 lg:h-auto lg:w-auto pointer-events-none`} src={props.icon} alt={props.icon}/>
        <h1 className="text-6xl sm:text-7xl lg:text-9xl text-center">{props.score}</h1>
      </div>
      )
}

export default WallIcon;
