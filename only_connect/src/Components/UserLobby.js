import React from 'react'

export default function UserLobby(props){
    function listUsers(){
       return props.Users.map((user) => (
       <li>{user.name}</li>
       ))
    }
    return (
        <div>
            <div >
                <div
                    className="w-28 h-28 flex bg-blue-500 hover:bg-blue-700"  
                >
                    <h2 className='text-center'>User Lobby:</h2>
                    {listUsers()}
                </div>
            </div>
        </div>
    )
}