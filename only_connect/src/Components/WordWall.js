import React, { Component } from "react";
import Rectangle from './Rectangle'

class WordWall extends Component {
    constructor() {
        super();
        this.color_dictionary = {0: "bg-red-500", 1: "bg-blue-500", 2:"bg-green-500", 3:"bg-yellow-500"};
        this.state = {
            clicked: [],
            color_count: 0,
            color: "",
            rect_dictionary: {},
            groups: [[0,1,2,3], [4,5,6,7], [8,9,10,11], [12,13,14,15]]
            
        };

        this.state.color = this.color_dictionary[this.state.color_count]
        this.words = ["Hazelnut", "Mocha", "Australia", "Cook Islands", "Cube", "Vanilla",
        "Butter Pecan", "San Pellegrino", "Coconut", "Papua New Guinea", "Caramel",
        "Prince", "Guam", "Champagne", "T", "Fiji"];

        for (var i = 0; i < 16; i++) {
            this.state.rect_dictionary[i] = "bg-oc-blue";
        }
    }

    clearGroup(recolor)
    {
        var temp_rects = {...this.state.rect_dictionary};
        if(recolor)
        {
            for(var j = 0; j < 4; j++)
            {
                temp_rects[this.state.clicked[j]] = "bg-oc-blue";
            }
        }

        //Check if the four are in a group
        this.setState({clicked: [], rect_dictionary: temp_rects});
    }
    checkGroup()
    {
        console.log(this.state.clicked);
        if(this.state.clicked.length == 4)
        {
            var found_match = false;
            var remove_index = -1;
            //Check if the indices of the group are valid
            console.log(this.state.groups);
            for(var group_counter = 0; group_counter < this.state.groups.length; group_counter++)
            {
                for(var index = 0; index < 4; index++)
                {
                    var group_val = this.state.groups[group_counter][index];
                    var click_val = this.state.clicked[index];
                    console.log(`group[${group_counter}][${index}] = ${group_val}, clicked[${index}] = ${click_val}`);
                    if(group_val !== click_val)
                    {
                        break;
                    }
                    else
                    {
                        // We got to end and they are same, we got a match
                        if(index === 3)
                        {
                            found_match = true;
                            remove_index = group_counter;
                            break;
                        }
                    }
                }

                if(found_match)
                {
                    var new_group_array = [...this.state.groups]
                    new_group_array.splice(remove_index, 1);

                    //Check if the four are in a group
                    var new_color_count = this.state.color_count + 1;
                    var new_color = this.color_dictionary[new_color_count];
                    this.setState({color_count: new_color_count, color: new_color, groups: new_group_array }, this.clearGroup(false));
                    break;
                }
                else
                {
                    setTimeout(() => {this.clearGroup(true)}, 250);
                }
            }            
        }
    }
    handleClick(i){
        var temp_rects = {...this.state.rect_dictionary};
        temp_rects[i] = this.state.color;

        this.setState((state) => {
            return {clicked: [...state.clicked, i].sort(function(a, b) {
                return a - b;}), rect_dictionary: temp_rects};
            }, this.checkGroup);
    }

    render()
    {
        console.log("Render called");
        this.wall = [];
        
        for(var i = 0; i < 16; i++)
        {
            this.wall.push(
            <Rectangle type="wall" key={i} color={this.state.rect_dictionary[i]} customClickEvent={this.handleClick.bind(this, i)}>{this.words[i]}</Rectangle>);
        }

       return (
            <div className="grid grid-flow-col grid-rows-4 lg:py-20 gap-y-1 gap-x-1 lg:gap-y-6 lg:gap-x-6 justify-center items-center">
                {this.wall}
            </div>  
        );
    }
}

export default WordWall;