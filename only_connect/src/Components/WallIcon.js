import React from 'react'

function WallIcon(props)
{
    return (
      <div className="p-10">
          <img src={props.icon} alt={props.icon}/>
        </div>)
}

export default WallIcon