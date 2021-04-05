import React from 'react'

function HomePage(props)
{
  return (
    <div className="h-screen justify-center">
        <h1 className="lg:text-6xl text-center">Welcome to Sole Relation!</h1>
        <div className="grid grid-rows-1 gap-y-4 justify-center justify-items-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-10 w-40 px-2 rounded"
            onClick={props.newGameClick}
            >
                New Game
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-10 w-40 px-2 rounded"
            onClick={props.createGameClick}>
                Create Game
            </button>
        </div>
      </div>
      )
}

export default HomePage;
