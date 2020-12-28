import React, { createRef, Component } from "react";
import Rectangle from "./Rectangle";
import { v4 as uuidv4 } from "uuid";
import randomize from "../randomize";
import "./WordWall.css";

const colorDictionary = {
    0: "bg-red-500",
    1: "bg-blue-500",
    2: "bg-green-500",
    3: "bg-yellow-500",
};
const wordDictionary = [
    ["Hazelnut", "Butter Pecan", "Coconut", "Caramel"],
    ["Cube", "Vanilla", "T", "Prince"],
    ["Australia", "Guam", "Papua New Guinea", "Cook Islands"],
    ["Champagne", "San Pellegrino", "Fiji", "Mocha"],
];
let idToIndex = new Map();
let refsArr = [];
let blocks = [];

for (let [index, group] of wordDictionary.entries()) {
    let words = group.map((word) => {
        refsArr.push(createRef());
        return {
            word: word,
            color: "bg-oc-blue",
            id: uuidv4(),
            group: index,
            clicked: false,
            matched: false,
        };
    });
    blocks.push(...words);
}
blocks = randomize(blocks);
for (let [index, block] of blocks.entries()) {
    idToIndex.set(block.id, index);
}
console.log(idToIndex);

class WordWall extends Component {
    constructor() {
        super();
        this.ref = createRef();
        this.state = {
            clicked: [],
            color_count: 0,
            solved: blocks,
        };
        this.clickBlock = this.clickBlock.bind(this);
    }

    clickBlock(obj) {
        let clickedList = this.state.clicked,
            solvedList = this.state.solved,
            count = this.state.color_count;
        let delay = 0;
        if (clickedList.length < 4) {
            if (obj.clicked) {
                clickedList = clickedList.filter((word) => {
                    console.log(word);
                    return word.id !== obj.id;
                });
                let unclickIndex = idToIndex.get(obj.id);
                solvedList[unclickIndex].color = "bg-oc-blue";
                solvedList[unclickIndex].clicked = false;
                setTimeout(() => {
                    this.setState({ solved: solvedList, clicked: clickedList, color_count: count });
                }, delay);
            } else {
                clickedList.push(obj);
                let foundIndex = idToIndex.get(obj.id);
                solvedList[foundIndex].clicked = true;
                solvedList[foundIndex].color = colorDictionary[count];
                this.setState(
                    { solved: solvedList, clicked: clickedList, color_count: count },
                    () => {
                        if (clickedList.length === 4) {
                            if (count == 3) {
                                clickedList.map(
                                    (item) => (solvedList[idToIndex.get(item.id)].matched = true),
                                );
                                this.setState({ solved: solvedList });
                            } else {
                                let areOfSameGroup =
                                    clickedList[0].group == clickedList[1].group &&
                                    clickedList[0].group == clickedList[2].group &&
                                    clickedList[0].group == clickedList[3].group;
                                if (areOfSameGroup) {
                                    const eltBoundsBefore = refsArr.map((el) => {
                                        return el.current.getBoundingClientRect();
                                    });
                                    const arr = [...refsArr];
                                    console.log(arr);
                                    for (let block of clickedList) {
                                        foundIndex = solvedList.findIndex(
                                            (word) => word.id == block.id,
                                        );
                                        solvedList[foundIndex].matched = true;
                                        let removedVal = solvedList.splice(foundIndex, 1);
                                        let removedRef = refsArr.splice(foundIndex, 1);
                                        solvedList.splice(count * 4, 0, ...removedVal);
                                        refsArr.splice(count * 4, 0, ...removedRef);
                                    }

                                    this.setState({ solved: solvedList }, () => {
                                        const eltBoundsAfter = arr.map((el) => {
                                            return el.current.getBoundingClientRect();
                                        });

                                        arr.forEach((item, index) => {
                                            const deltaX =
                                                eltBoundsBefore[index].left -
                                                eltBoundsAfter[index].left;
                                            const deltaY =
                                                eltBoundsBefore[index].top -
                                                eltBoundsAfter[index].top;
                                            const deltaW =
                                                eltBoundsBefore[index].width /
                                                eltBoundsAfter[index].width;
                                            const deltaH =
                                                eltBoundsBefore[index].height /
                                                eltBoundsAfter[index].height;

                                            item.current.animate(
                                                [
                                                    {
                                                        transformOrigin: "top left",
                                                        transform: `
                                                  translate(${deltaX}px, ${deltaY}px)
                                                  scale(${deltaW}, ${deltaH})
                                                `,
                                                    },
                                                    {
                                                        transformOrigin: "top left",
                                                        transform: `
                                                translate(${0}px, ${0}px)
                                                scale(${deltaW}, ${deltaH})
                                              `,
                                                    },
                                                ],
                                                {
                                                    duration: 1000,
                                                    easing: "ease-in-out",
                                                    fill: "both",
                                                },
                                            );
                                        });
                                    });

                                    count++;
                                } else {
                                    for (let block of clickedList) {
                                        foundIndex = idToIndex.get(block.id);
                                        solvedList[foundIndex].clicked = false;
                                        solvedList[foundIndex].color = " bg-oc-blue";
                                    }
                                }

                                for (let [index, block] of solvedList.entries()) {
                                    idToIndex.set(block.id, index);
                                }
                                clickedList = [];
                                delay = 1000;
                            }
                        }
                        setTimeout(() => {
                            this.setState({
                                solved: solvedList,
                                clicked: clickedList,
                                color_count: count,
                            });
                        }, delay);
                    },
                );
            }
        }
    }

    buildBoard() {
        return this.state.solved.map((block, index) => {
            return (
                <Rectangle ref={refsArr[index]} key={index} type="wall" {...block} clickBlock={this.clickBlock}>
                    {block.word}
                </Rectangle>
            );
        });
    }

    render() {
        return (
            <div>
                <h1 style={{ textAlign: "center" }}>Word Wall</h1>
                <div className="grid justify-center items-center">{this.buildBoard()}</div>
            </div>
        );
    }
}
export default WordWall;
