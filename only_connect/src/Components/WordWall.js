import React, { Component } from "react";
import Rectangle from './Rectangle'
import { v4 as uuidv4 } from 'uuid';

const colorDictionary = {0: "bg-red-500", 1: "bg-blue-500", 2:"bg-green-500", 3:"bg-yellow-500"};
const wordDictionary = ["Hazelnut","Cube","Coconut", "Guam",
                        "Mocha","Vanilla","Papua New Guinea","Champagne",
                        "Australia","Butter Pecan","Caramel","T",
                        "Cook Islands","San Pellegrino","Prince","Fiji"];

let blocks = wordDictionary.map((el,index) => {
    return{
        word: el,
        color: 'bg-oc-blue',
        id: uuidv4(),
        group: index % 4,
        index: index,
        clicked: false
    }
})

class WordWall extends Component {
    constructor() {
        super();
        this.state = {
            clicked: [],
            color_count: 0,
            solved: blocks
        };
        this.clickBlock = this.clickBlock.bind(this)
    }

    clickBlock(obj){
        console.log(obj)
        let clickedList = this.state.clicked, solvedList = this.state.solved, count = this.state.color_count
        let delay = 0
        console.log(solvedList)
        if ( clickedList.length < 4){
            clickedList.push(obj)
            solvedList[obj.index].clicked = true
            solvedList[obj.index].color = colorDictionary[count]
            this.setState({solved:solvedList,clicked:clickedList,color_count:count}, () => {
                if( clickedList.length === 4){
                    if(clickedList[0].group == clickedList[1].group == clickedList[2].group == clickedList[3].group) {   
                        count++;
                    }
                    else{
                        for(let block of clickedList){
                            solvedList[block.index].clicked = false
                            solvedList[block.index].color = 'bg-oc-blue'
                    }
                }       clickedList = []
                        delay = 1000
                }
                setTimeout(() => {this.setState({solved:solvedList,clicked:clickedList,color_count:count})}, delay);
        });
        }
    }
    
    buildBoard(){
        return this.state.solved.map((block) => (
            <Rectangle type="wall" {...block} clickBlock={this.clickBlock}>{block.word}</Rectangle>
        )) 
    }

    render(){
       return (
            <div className="grid grid-flow-col grid-rows-4 lg:py-20 gap-y-1 gap-x-1 lg:gap-y-6 lg:gap-x-6 justify-center items-center">
                {this.buildBoard()}
            </div>  
        );
    }
}
export default WordWall;
