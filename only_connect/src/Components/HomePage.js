import React from 'react'

function HomePage(props)
{
  return (
    <div className="home_page_container">
        <h1 className="default_title">Sole Relation</h1>
        <div className="home_page_button_container">
            <button className="default_button default_text"
            onClick={props.newGameClick}
            >
                Start Game
            </button>
            <button className="default_button default_text"
            onClick={props.createGameClick}>
                Create Game
            </button>
        </div>
      </div>
      )
}

export default HomePage;
