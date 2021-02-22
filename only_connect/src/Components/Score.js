import React from 'react'

function WallIcon(props)
{
  return (
    <div className={`p-10 select-none items-center justify-items-center justify-center`}>
        <img className={`h-24 w-24 sm:h-30 sm:w-30 lg:h-auto lg:w-auto pointer-events-none`} src={props.icon} alt={props.icon}/>
        <h1 className="text-9xl text-center">{props.score}</h1>
      </div>
      )
}

export default WallIcon;
