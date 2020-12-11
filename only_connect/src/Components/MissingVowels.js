import React from 'react'
import Rectangle from './Rectangle'

function MissingVowels()
{
    return (
        <div className="grid grid-rows-2 justify-items-center items-center py-14 lg:py-40 gap-y-4 lg:gap-y-6">
                <Rectangle text="Films with photographer protagonists" type="vowels"></Rectangle>
                <Rectangle text="NG HT CR W LR SD FFM LGKL " type="answer"></Rectangle>
        </div>
    )
}

export default MissingVowels