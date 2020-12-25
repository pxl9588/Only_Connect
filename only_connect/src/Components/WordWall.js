import React, { Component } from "react";
import Rectangle from './Rectangle'
import { v4 as uuidv4 } from 'uuid';
import randomize from '../randomize'

const colorDictionary = {0: "bg-red-500", 1: "bg-blue-500", 2:"bg-green-500", 3:"bg-yellow-500"};
const wordDictionary = [['Hazelnut','Butter Pecan','Coconut', 'Caramel'],['Cube','Vanilla','T','Prince'],['Australia','Guam', 'Papua New Guinea','Cook Islands'],['Champagne','San Pellegrino','Fiji', 'Mocha']]
let idToIndex = new Map()

let blocks = []
wordDictionary.map((group, group_index) =>
{
    let words = group.map((word, i) =>
    {
        return {
            word: word,
            color: 'bg-oc-blue',
            id: uuidv4(),
            group: group_index,
            clicked: false
        } 
    });

    blocks.push(...words);
})

    /*for(let group of wordDictionary){
        let words = group.map((word,index) => {
                    return{
                    word: word,
                    color: 'bg-oc-blue',
                    id: uuidv4(),
                    group: index,
                    clicked: false
                }
            })
        blocks.push(...words)
        }*/

    // Commenting just for debugging, tired of having to find the answers
    //blocks = randomize(blocks)

    for(let [index,block] of blocks.entries()){
       idToIndex.set(block.id, index) 
    }    

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
        if ( clickedList.length < 4){
            clickedList.push(obj)
            let foundIndex = idToIndex.get(obj.id)
            solvedList[foundIndex].clicked = true
            solvedList[foundIndex].color = colorDictionary[count]
            this.setState({solved:solvedList,clicked:clickedList,color_count:count}, () => {
                if( clickedList.length === 4){
                    console.log(clickedList);
                    // === does not work here
                    if(clickedList[0].group == clickedList[1].group == clickedList[2].group == clickedList[3].group) {   
                        count++;
                    }
                    else{
                        for(let block of clickedList){
                            foundIndex = idToIndex.get(block.id)
                            solvedList[foundIndex].clicked = false
                            solvedList[foundIndex].color = 'bg-oc-blue'
                    }
                }clickedList = []
                        delay = 500
                }
                setTimeout(() => {this.setState({solved:solvedList,clicked:clickedList,color_count:count})}, delay);
        });
        }
    }
    
    buildBoard(){
        return this.state.solved.map((block, i) => (
            <Rectangle key={i} type="wall" {...block} clickBlock={this.clickBlock}>{block.word}</Rectangle>
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
