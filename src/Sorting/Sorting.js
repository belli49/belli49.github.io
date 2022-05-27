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
            selectOpacity: false,

            initialState: {
                sort: "bubble",
                totalBubblePasses: 0,
                elementsArray: [],
                currentlySorting: false,
                completelySorted: false,
                currentlySelectedIndex: [0, 1],
                selectOpacity: false,
            },
        };
    }


    // ---------- FUNCTIONS START ----------
    // Adds Element to be sorted
    HandleAdd() {
        if (!this.state.currentlySorting && this.state.elementsArray.length < 30) {
            const elements = this.state.elementsArray;
            this.setState({ ...this.state.initialState });
            elements.push(parseInt( Math.random() * 100 ) + 1);
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
                this.BubbleSortNext();
                break;

            default:
                break;
        }

        return;
    }

    HandleReset() {
        this.setState({ ...this.state.initialState });
    }

    HandleRemove() {
        let nums = this.state.elementsArray;
        nums.pop();
        this.setState({ elementsArray: nums });
    }

    // Bubble Sort Function to call every time interval
    BubbleSortNext() {
        if (this.state.completelySorted) return;
        if (!this.state.currentlySorting) {
            this.setState({ currentlySorting: true, lastPass: true, currentlySelectedIndex: [0, 1] });
        }
        this.setState({ selectOpacity: true });
        let i = this.state.currentlySelectedIndex[0], j = this.state.currentlySelectedIndex[1];
        let nums = this.state.elementsArray, lastpass = true;

        console.log([i, j]);
        console.log(nums[i], nums[j]);

        if (nums[i] > nums[j]) {
            [nums[i], nums[j]] = [nums[j], nums[i]];
            this.setState({ lastPass: false, elementsArray: nums });
            lastpass = false;
        }
        this.setState({ currentlySelectedIndex: [j, j + 1] });

        if (j >= nums.length - 1 - this.state.totalBubblePasses) {
            if (this.state.lastPass && lastpass)
                this.setState({ selectOpacity: false, currentlySorting: false, completelySorted: true });
            else 
                this.setState({ currentlySelectedIndex: [0, 1], lastPass: true, totalBubblePasses: this.state.totalBubblePasses + 1 });
        }

        return;
    }

    // Bubble Sort Function
    InstantBubbleSort() {
        this.setState({ currentlySorting: true });
        console.log("Started Bubble Sort");
        
        let finished = false;
        while (!finished) {
            finished = true;
            let nums = this.state.elementsArray;

            for (let i = 0; i < this.state.elementsArray.length - 1; i++) {
                this.setState({ currentlySelectedIndex: [i, i + 1]});
                if (nums[i] > nums[i + 1]) {
                    finished = false;
                    [ nums[i], nums[i + 1] ] = [ nums[i + 1], nums[i] ];
                    this.setState({ elementsArray: nums });
                }
            }
        }



        this.setState({ currentlySorting: false });
        return;
    }
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
                        <button className='sortbutton'>Randomise</button>
                        <button className='sortbutton' onClick={this.HandleReset.bind(this)} >Reset</button>
                        <button className='sortbutton' onClick={this.HandleStart.bind(this)} >Start</button>
                    </div>

                    <div style={{height: '8px', position:'relative', width:'100%', backgroundColor:"var(--secondary-color)", zIndex:"-1"}} />
                    <div id='sortContainer'>
                        {this.state.elementsArray.map((element, index) => {
                            return <div key={index} className='sortelementparent' style={ (this.state.selectOpacity && this.state.currentlySelectedIndex.includes(index)) ? { opacity:'100%' } : { opacity:'80%' } } >{<SortElement value={ element } />}</div>;
                        })}
                    </div>
                    <div style={{height: '8px', position:'relative', width:'100%', backgroundColor:"var(--secondary-color)"}} />
                </div>
            </div>
        );
    }
}
