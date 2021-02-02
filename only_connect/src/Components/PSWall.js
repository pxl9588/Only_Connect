import React from "react";
import WallIcon from "./WallIcon";
import frog from "./../images/frog.png";
import kangaroo from "./../images/kangaroo.png";
import elephant from "./../images/elephant.png";
import bird from "./../images/bird.png";
import koala from "./../images/koala.png";
import sloth from "./../images/sloth.png";
import { useState } from "react";
import { Card } from "@material-ui/core";
import "./PSWall.css";

function PSWall(props) {
    const [hidden, setHidden] = useState({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
    });

    const handleClick = (i) => {
        const temp_hidden = { ...hidden };
        temp_hidden[i] = "invisible";
        setHidden(temp_hidden);
        props.onClick();
    };

    return (
        <div className="PSWall_container">
            <h1 className="title">Only Connect</h1>
            <div className="grid grid-flow-col grid-rows-3 sm:grid-rows-2 lg:grid-rows-2">
                <Card>
                    <WallIcon
                        icon={frog}
                        hidden={hidden[1]}
                        id="1"
                        onClick={handleClick}
                    ></WallIcon>
                </Card>
                <Card>
                    <WallIcon
                        icon={kangaroo}
                        hidden={hidden[2]}
                        id="2"
                        onClick={handleClick}
                    ></WallIcon>
                </Card>
                <Card>
                    <WallIcon
                        icon={elephant}
                        hidden={hidden[3]}
                        id="3"
                        onClick={handleClick}
                    ></WallIcon>
                </Card>
                <Card>
                    {" "}
                    <WallIcon
                        icon={bird}
                        hidden={hidden[4]}
                        id="4"
                        onClick={handleClick}
                    ></WallIcon>
                </Card>

                <Card>
                    <WallIcon
                        icon={koala}
                        hidden={hidden[5]}
                        id="5"
                        onClick={handleClick}
                    ></WallIcon>
                </Card>

                <Card>
                    <WallIcon
                        icon={sloth}
                        hidden={hidden[6]}
                        id="6"
                        onClick={handleClick}
                    ></WallIcon>
                </Card>
            </div>
        </div>
    );
}

export default PSWall;
