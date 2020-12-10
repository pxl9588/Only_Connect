import React from 'react'
import WallIcon from './WallIcon'
import frog from './../images/frog.png'
import kangaroo from './../images/kangaroo.png'
import elephant from './../images/elephant.png'
import bird from './../images/bird.png'
import koala from './../images/koala.png'
import sloth from './../images/sloth.png'

function PSWall()
{
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="grid grid-flow-col grid-rows-2">
                <WallIcon icon={frog}></WallIcon>
                <WallIcon icon={kangaroo}></WallIcon>
                <WallIcon icon={elephant}></WallIcon>
                <WallIcon icon={bird}></WallIcon>
                <WallIcon icon={koala}></WallIcon>
                <WallIcon icon={sloth}></WallIcon>
            </div>
        </div>
    )
}

export default PSWall