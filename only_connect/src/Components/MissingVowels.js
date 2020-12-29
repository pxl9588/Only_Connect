import React from 'react'
import Rectangle from './Rectangle'

function MissingVowels()
{
    return (
        <div className="grid grid-rows-2 justify-items-center items-center py-14 lg:py-40 gap-y-4 lg:gap-y-6">
                <Rectangle type="vowels">Films with photographer protagonists</Rectangle>
                <Rectangle type="answer">NG HT CR W LR SD FFM LGKL</Rectangle>
        </div>
    )
}

export default MissingVowels