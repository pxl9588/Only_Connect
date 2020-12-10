import React from 'react'
import Rectangle from './Rectangle'

function PSRow()
{
    return (
        <div className="grid grid-cols-4 h-screen w-screen justify-items-center items-center py-40">
                <Rectangle text="A" type="rectangle"></Rectangle>
                <Rectangle text="B" type="rectangle hidden"></Rectangle>
                <Rectangle text="C" type="rectangle hidden"></Rectangle>
                <Rectangle text="?" type="rectangle hidden"></Rectangle>
            <div className="col-span-4">
                <Rectangle text="Alphabetical Letters" type="rectangleAnswer"></Rectangle>
            </div>
        </div>
    )
}

export default PSRow