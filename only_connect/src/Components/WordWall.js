import React from 'react'
import Rectangle from './Rectangle'

function WordWall()
{
    return (
        <div className="grid grid-flow-col grid-rows-4 lg:py-20 gap-y-1 gap-x-1 lg:gap-y-6 lg:gap-x-6 justify-center items-center">
            <Rectangle text="Fiji" type="wall"></Rectangle>
            <Rectangle text="Hazelnut" type="wall"></Rectangle>
            <Rectangle text="Mocha" type="wall"></Rectangle>
            <Rectangle text="Australia" type="wall"></Rectangle>
            <Rectangle text="Cook Islands" type="wall"></Rectangle>
            <Rectangle text="Cube" type="wall"></Rectangle>
            <Rectangle text="Vanilla" type="wall"></Rectangle>
            <Rectangle text="Butter Pecan" type="wall"></Rectangle>
            <Rectangle text="San Pellegrino" type="wall"></Rectangle>
            <Rectangle text="Coconut" type="wall"></Rectangle>
            <Rectangle text="Papua New Guinea" type="wall"></Rectangle>
            <Rectangle text="Caramel" type="wall"></Rectangle>
            <Rectangle text="Prince" type="wall"></Rectangle>
            <Rectangle text="Guam" type="wall"></Rectangle>
            <Rectangle text="Champagne" type="wall"></Rectangle>
            <Rectangle text="T" type="wall"></Rectangle>
        </div>  
    )
}

export default WordWall