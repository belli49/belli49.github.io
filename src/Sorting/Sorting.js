import React from 'react';
import ReactDOM from 'react-dom';
import { motion } from "framer-motion";
import { BrowserRouter, Link, Route, Routes, Outlet } from "react-router-dom";

import './Sorting.css';
import '../index.css';

// Elements to be sorted
function SortElement(props) {
    if (props.value > 6) {
        return <div className='sortelementchild' style={{ height: `${ props.value }%`, userSelect:'none' }}> <a>{props.value}</a> </div>
    } else {
        return <div style={{userSelect:'none'}}>
            <a id='sortfloatingNumber' style={{bottom:`${props.value}%`}} >{props.value}</a>
            <div className='sortelementchild' style={{height: `${ props.value }%`}} ></div>
        </div>;
    }
}

// Class to handle Sorting app
export default class Sorts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sort: "bubble",
            totalBubblePasses: 0,
            elementsArray: [],
            currentlySorting: false,
            completelySorted: false,
            currentlySelectedIndex: [0, 1],

            initialState: {
                sort: "bubble",
                totalBubblePasses: 0,
                elementsArray: [],
                currentlySorting: false,
                completelySorted: false,
                currentlySelectedIndex: [0, 1],
            },
        };
    }

    // ---------- FUNCTIONS START ----------

    // ---------- ONCLICK HANDLERS START ----------
    // Adds Element to be sorted
    HandleAdd() {
        if (!this.state.currentlySorting && this.state.elementsArray.length < 30) {
            console.log("Added Number");
            const elements = this.state.elementsArray;
            this.setState({ ...this.state.initialState });
            elements.push(Math.floor( Math.random() * 100 ) + 1);
            this.setState({ elementsArray: elements });
        }

        return;
    }

    // Starts currently selected sort
    HandleStart() {
        //if (this.state.currentlySorting) return;
        if (this.state.completelySorted) return;
        if (this.state.elementsArray.length < 2) return;

        switch (this.state.sort) {
            case 'bubble':
                this.BubbleSort();
                break;

            default:
                break;
        }

        return;
    }

    HandleRandomise() {
        if ( this.state.elementsArray.length < 2 || this.state.currentlySorting ) return;

        let tempArray = this.state.elementsArray;
        let n = tempArray.length, i = 0;

        while (n > 0) {
            i = Math.floor( Math.random() * n );
            n--;
            [ tempArray[i], tempArray[n] ] = [ tempArray[n], tempArray[i] ];
        }

        this.setState({ elementsArray: tempArray });
        console.log("Elements Shuffled");
        return;
    }

    HandleReset() {
        console.log("Sort Reset");
        this.setState({ ...this.state.initialState });
        this.setState({ elementsArray: [] });
    }

    HandleRemove() {
        if (!this.state.currentlySorting && this.state.elementsArray.length > 0) {
            console.log("Removed Number");
            let nums = this.state.elementsArray;
            nums.pop();
            this.setState({ ...this.state.initialState });
            this.setState({ elementsArray: nums });
        }
    }

    // ---------- ONCLICK HANDLERS END ----------

    // ---------- SORT FUNCTIONS START ----------
    // Bubble Sort Function
    BubbleSort() {
        this.setState({ currentlySorting: true });
        console.log("Started Bubble Sort");
        
        let finishedSorting = false, lastPass = true;
        let i = 0, sortedElementsNumber = 0;

        const whileInterval = setInterval(() => {
            if (finishedSorting || !this.state.currentlySorting) { 
                finishedSorting = true;
                this.setState({ currentlySorting: false });
                console.log("Finished Bubble Sort");
                clearInterval(whileInterval); 
            } else {
                let nums = this.state.elementsArray;
                this.setState({ currentlySelectedIndex: [i, i + 1] });

                if (nums[i] > nums[i + 1]) {
                    lastPass = false;
                    [ nums[i], nums[i + 1] ] = [ nums[i + 1], nums[i] ];
                    this.setState({ elementsArray: nums });
                }

                if (++i >= this.state.elementsArray.length - 1 - sortedElementsNumber) {
                    if (lastPass) {
                        finishedSorting = true;
                        this.setState({ currentlySorting: false });
                    } else {
                        i = 0;
                        lastPass = true;
                    }
                    sortedElementsNumber++;
                }
            }

        }, 200);

        return;
    }
    // ---------- SORT FUNCTIONS END ----------
    // ---------- FUNCTIONS END ----------

    render () {
        return (
            <div style={{position: 'relative', width: 'auto', height: 'auto'}}>
                <div style={{position: 'relative', height: 'auto', width: '100%', marginTop: '10vh', textAlign: 'center'}}>
                    <Link to="/Projects">
                        <div className="gg-chevron-down" style={{zIndex:'1' , transform:'rotate(90deg) scale(2)', position:'absolute', left:'30vh', top:'1.9vh'}}></div>
                    </Link>
                    <a style={{position: 'relative', fontSize: '2em', color: 'white', cursor: 'default'}}>
                        Sort
                    </a>
                </div>

                <div id='sorttypesbuttonbar'>
                    <div/>
                    <button className='sortbutton' style={{color: "var(--main-color)"}}>Bubble</button>
                    <div/>
                    <button className='sortbutton' style={{color: "var(--main-color)"}}>Test</button>
                    <div/>
                    <button className='sortbutton' style={{color: "var(--main-color)"}}>Test</button>
                    <div/>
                </div>

                <div id='hiddensortcontent'>
                    <div id='sortbuttonsbar'>
                        <button className='sortbutton' onClick={this.HandleAdd.bind(this) }>Add</button>
                        <button className='sortbutton' onClick={this.HandleRemove.bind(this)} >Remove</button>
                        <button className='sortbutton' onClick={this.HandleRandomise.bind(this)}>Randomise</button>
                        <button className='sortbutton' onClick={this.HandleReset.bind(this)} >Reset</button>
                        <button className='sortbutton' onClick={this.HandleStart.bind(this)} >Start</button>
                    </div>

                    <div style={{height: '8px', position:'relative', width:'100%', backgroundColor:"var(--secondary-color)", zIndex:"-1"}} />
                    <div id='sortContainer'>
                        {this.state.elementsArray.map((element, index) => {
                            return <div key={index} className='sortelementparent' style={ (this.state.currentlySorting && this.state.currentlySelectedIndex.includes(index)) ? { opacity:'100%' } : { opacity:'80%' } } >{<SortElement value={ element } />}</div>;
                        })}
                    </div>
                    <div style={{height: '8px', position:'relative', width:'100%', backgroundColor:"var(--secondary-color)"}} />
                </div>
            </div>
        );
    }
}
