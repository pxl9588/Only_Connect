import React, { createRef, Component } from "react";
import Rectangle from './Rectangle'
import { v4 as uuidv4 } from 'uuid';
import randomize from '../randomize'
import './WordWall.css'

const colorDictionary = {0: "bg-red-500", 1: "bg-blue-500", 2:"bg-green-500", 3:"bg-yellow-500"};
const wordDictionary = [['Hazelnut','Mocha','Australia','Cook Islands'],['Cube','Vanilla','Butter Pecan','San Pellegrino'],['Coconut','Papua New Guinea','Caramel','Prince'],['Guam','Champagne','T','Fiji']]
let idToIndex = new Map()

let blocks = []
    for(let [index, group] of wordDictionary.entries()){
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
        this.ref = createRef()
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
        if (clickedList.length < 4){
            if (obj.clicked){
                clickedList = clickedList.filter((word) => { 
                    console.log(word)
                    return word.id !== obj.id
                    
                });
                let unclickIndex = idToIndex.get(obj.id)
                solvedList[unclickIndex].color = 'bg-oc-blue';
                solvedList[unclickIndex].clicked = false;
                setTimeout(() => {this.setState({solved:solvedList,clicked:clickedList,color_count:count})}, delay);
            }
            else{
                clickedList.push(obj)
            let foundIndex = idToIndex.get(obj.id)
            solvedList[foundIndex].clicked = true
            solvedList[foundIndex].color = colorDictionary[count]
            this.setState({solved:solvedList,clicked:clickedList,color_count:count}, () => {
                if( clickedList.length === 4){
                    let areOfSameGroup = clickedList[0].group == clickedList[1].group && clickedList[0].group == clickedList[2].group && clickedList[0].group == clickedList[3].group 
                        if (areOfSameGroup){
                          count++;  
                        }
                    for(let block of clickedList){
                        foundIndex = idToIndex.get(block.id)
                        if(areOfSameGroup){
                            solvedList[foundIndex].matched = true
                            // let removed = solvedList.pop()
                            // solvedList.unshift(removed)
                        }
                        else{
                            solvedList[foundIndex].clicked = false
                            solvedList[foundIndex].color = 'bg-oc-blue'
                        }
                        
                    }
                    // for(let block of solvedList){
                        
                    // }
                      clickedList = []
                        delay = 1000
                }
                setTimeout(() => {this.setState({solved:solvedList,clicked:clickedList,color_count:count})}, delay);
        });
            }
            
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
                <div className="grid justify-center items-center">
                    {this.buildBoard()}
            </div>  
           </div>
           
        );
    }
}
export default WordWall;
