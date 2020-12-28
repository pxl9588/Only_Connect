import React, { Component } from "react";
import Rectangle from './Rectangle'
import { v4 as uuidv4 } from 'uuid';
import randomize from '../randomize'

const colorArray = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500"];
const hoverArray = ["bg-red-300", "bg-blue-300", "bg-green-300", "bg-yellow-300"];
const wordArray = [['Hazelnut','Butter Pecan','Coconut', 'Caramel'],['Cube','Vanilla','T','Prince'],['Australia','Guam', 'Papua New Guinea','Cook Islands'],['Champagne','San Pellegrino','Fiji', 'Mocha']]
let idToIndex = new Map()

let blocks = []
    for(let [index, group] of wordArray.entries()){
        let words = group.map((word) => {
                    return{
                    word: word,
                    color: 'bg-oc-blue',
                    id: uuidv4(),
                    group: index,
                    clicked: false,
                    matched: false

                }
            })
        blocks.push(...words)
        }
    blocks = randomize(blocks)
    for(let [index,block] of blocks.entries()){
       idToIndex.set(block.id, index) 
    }
    console.log(idToIndex)
    

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
        let clickedList = this.state.clicked, solvedList = this.state.solved, count = this.state.color_count
        let delay = 0
        if (clickedList.length < 4)
        {
            if (obj.clicked)
            {
                clickedList = clickedList.filter((word) => { 
                    console.log(word)
                    return word.id !== obj.id
                });
                let unclickIndex = idToIndex.get(obj.id)
                solvedList[unclickIndex].color = 'bg-oc-blue';
                solvedList[unclickIndex].clicked = false;
                setTimeout(() => {this.setState({solved:solvedList,clicked:clickedList,color_count:count})}, delay);
            }
            else
            {
                clickedList.push(obj)
                let foundIndex = idToIndex.get(obj.id)
                solvedList[foundIndex].clicked = true
                solvedList[foundIndex].color = colorArray[count]
                this.setState({solved:solvedList,clicked:clickedList,color_count:count}, () => {
                    if( clickedList.length === 4)
                    {
                        let areOfSameGroup = clickedList[0].group == clickedList[1].group && clickedList[0].group == clickedList[2].group && clickedList[0].group == clickedList[3].group 
                            if (areOfSameGroup){
                                console.log("hello");
                            count++;  
                            }
                        for(let block of clickedList){
                            foundIndex = idToIndex.get(block.id)
                            if(areOfSameGroup){
                                solvedList[foundIndex].matched = true;
                            }
                            else{
                                solvedList[foundIndex].clicked = false;
                                solvedList[foundIndex].color = 'bg-oc-blue';
                            }
                            
                        }
                        clickedList = [];
                        delay = 250;
                    }
                    setTimeout(() => {this.setState({solved:solvedList,clicked:clickedList,color_count:count})}, delay);
                });
            }
        }
    }
    
    buildBoard(){
        return this.state.solved.map((block, index) => (
            <Rectangle type="wall" hover={hoverArray[this.state.color_count]} key={index} {...block} clickBlock={this.clickBlock}>{block.word}</Rectangle>
        )) 
    }

    render(){
       return (
           <div>
                <div className="grid grid-flow-col grid-rows-4 lg:py-20 gap-y-1 gap-x-1 lg:gap-y-6 lg:gap-x-6 justify-center items-center">
                    {this.buildBoard()}
            </div>  
           </div>
           
        );
    }
}
export default WordWall;
