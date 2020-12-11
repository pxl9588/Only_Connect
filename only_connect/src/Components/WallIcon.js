import React from 'react'

function WallIcon(props)
{
    return (
      <div className="p-10">
          <img className="h-24 w-24 sm:h-30 sm:w-30 lg:h-auto lg:w-auto"src={props.icon} alt={props.icon}/>
        </div>)
}

export default WallIcon