import React from 'react'
import Rectangle from './Rectangle'

function PSRow()
{
    return (
        <div className="grid grid-cols-4 justify-items-center items-center py-14 lg:py-40 gap-y-10 lg:gap-y-20">
                <Rectangle text="A" type="rectangle"></Rectangle>
                <Rectangle text="B" type="rectangle"></Rectangle>
                <Rectangle text="C" type="rectangle"></Rectangle>
                <Rectangle text="?" type="rectangle"></Rectangle>
            <div className="col-span-full w-full justify-items-center px-4 lg:px-20">
                <Rectangle text="Alphabet" type="answer"></Rectangle>
            </div>
        </div>
    )
}

export default PSRow