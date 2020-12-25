import React, { Component } from "react";
import Rectangle from './Rectangle'
import { v4 as uuidv4 } from 'uuid';
import randomize from '../randomize'

const colorDictionary = {0: "bg-red-500", 1: "bg-blue-500", 2:"bg-green-500", 3:"bg-yellow-500"};
const wordDictionary = [['Hazelnut','Mocha','Australia','Cook Islands'],['Cube','Vanilla','Butter Pecan','San Pellegrino'],['Coconut','Papua New Guinea','Caramel','Prince'],['Guam','Champagne','T','Fiji']]
let idToIndex = new Map()

let blocks = []
    for(let group of wordDictionary){
        let words = group.map((word,index) => {
                    return{
                    word: word,
                    color: 'bg-oc-blue',
                    id: uuidv4(),
                    group: group,
                    clicked: false
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
        console.log(obj)
        let clickedList = this.state.clicked, solvedList = this.state.solved, count = this.state.color_count
        let delay = 0
        console.log(solvedList)
        if ( clickedList.length < 4){
            clickedList.push(obj)
            let foundIndex = idToIndex.get(obj.id)
            solvedList[foundIndex].clicked = true
            solvedList[foundIndex].color = colorDictionary[count]
            this.setState({solved:solvedList,clicked:clickedList,color_count:count}, () => {
                if( clickedList.length === 4){
                    if(clickedList[0].group == clickedList[1].group == clickedList[2].group == clickedList[3].group) {   
                        count++;
                    }
                    else{
                        for(let block of clickedList){
                            foundIndex = idToIndex.get(block.id)
                            solvedList[foundIndex].clicked = false
                            solvedList[foundIndex].color = 'bg-oc-blue'
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
           <div>
                <h1 style={{textAlign: 'center'}}>Memory Game</h1>
                <div className="grid grid-flow-col grid-rows-4 lg:py-20 gap-y-1 gap-x-1 lg:gap-y-6 lg:gap-x-6 justify-center items-center">
                    {this.buildBoard()}
            </div>  
           </div>
           
        );
    }
}
export default WordWall;
