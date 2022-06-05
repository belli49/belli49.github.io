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
            sort: "",
            totalBubblePasses: 0,
            elementsArray: [],
            currentlySorting: false,
            completelySorted: false,
            currentlySelectedIndex: [0, 1],
            selectedElement: -1,
            inputvalue: 0,

            initialState: {
                totalBubblePasses: 0,
                elementsArray: [],
                currentlySorting: false,
                completelySorted: false,
                currentlySelectedIndex: [0, 1],
                selectedElement: -1,
                inputvalue: 0,
            },
        };
    }

    // ---------- FUNCTIONS START ----------

    // Input field OnChange Handler
    HandleInputChange (event) {
        this.setState({ inputvalue: event.target.value });

        return;
    }

    // ---------- ONCLICK HANDLERS START ----------

    HandleChangeSort(sortType) {
        if (this.state.sort != sortType) {
            this.HandleReset();
            this.setState({ sort: sortType });
        }

        return;
    }

    HandleValueChange() {
        let nums = this.state.elementsArray, i = this.state.selectedElement, newValue = this.state.inputvalue;
        
        if (newValue >= 100) newValue = 100;
        else if (newValue < 0) newValue = 0;

        nums[i] = newValue;

        this.setState({  elementsArray: nums  });

        return;
    }

    HandleValueChangeToggle(index) {
        if (this.state.currentlySorting) return;
        console.log("Element Selected");
        this.setState({ selectedElement: index });

        return;
    }

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

    HandleStart() {
        if (this.state.currentlySorting) return;
        // if (this.state.completelySorted) return;
        if (this.state.elementsArray.length < 2) return;

        this.HandleValueChangeToggle(-1);

        switch (this.state.sort) {
            case 'bubble':
                this.BubbleSort();
                break;

            case 'insertion':
                this.InsertionSort();
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
        
        let finishedSorting = false, lastPass = true, firstPass = true;
        let i = 0, sortedElementsNumber = 0;

        const whileInterval = setInterval(() => {
            if (finishedSorting || !this.state.currentlySorting) { 
                finishedSorting = true;
                this.setState({ currentlySorting: false });
                console.log("Finished Bubble Sort");
                clearInterval(whileInterval); 
            } else {
                let nums = this.state.elementsArray;

                if (firstPass) {
                    this.setState({ currentlySelectedIndex: [i, i + 1] });
                    firstPass = false;
                    return;
                }

                if (nums[i] > nums[i + 1]) {
                    lastPass = false;
                    [ nums[i], nums[i + 1] ] = [ nums[i + 1], nums[i] ];
                    this.setState({ elementsArray: nums });
                }

                i++;

                setTimeout(() => {
                    this.setState({ currentlySelectedIndex: [i, i + 1] });

                    if (i >= this.state.elementsArray.length - 1 - sortedElementsNumber) {
                        if (lastPass) {
                            finishedSorting = true;
                            this.setState({ currentlySorting: false });
                        } else {
                            i = 0;
                            lastPass = true;
                            firstPass = true;
                        }
                        sortedElementsNumber++;
                    }
                }, 200);
                
            }

        }, 400);

        return;
    }

    // Insertion Sort Function
    InsertionSort() {
        this.setState({ currentlySorting: true });
        console.log("Started Insertion Sort");
        
        let i = 1, j = 0, finishedSorting = false, foundWhereToInsert = false;

        const whileInterval = setInterval(() => {
            if (finishedSorting || !this.state.currentlySorting) { 
                finishedSorting = true;
                this.setState({ currentlySorting: false });
                console.log("Finished Insertion Sort");
                clearInterval(whileInterval); 
            } else {
                let nums = this.state.elementsArray;
                this.setState({ currentlySelectedIndex: [j, i] });

                if (!foundWhereToInsert && nums[i] <= nums[j]) {
                    foundWhereToInsert = true;
                    return;
                }

                if (foundWhereToInsert) {
                    foundWhereToInsert = false;
                    let temp = nums[i], tempIndex = i;
                    while (j <= --tempIndex) {
                        nums[tempIndex + 1] = nums[tempIndex];
                    }
                    nums[j] = temp;
                    this.setState({ elementsArray: nums, currentlySelectedIndex: [j, j+1] });

                    i++;
                    j = 0;
                    return;
                }

                if (++j == i) {
                    j = 0;
                    i++;
                }

                if (i >= this.state.elementsArray.length) {
                    finishedSorting = true;
                    this.setState({ currentlySorting: false });
                }
            }

        }, 250);

        return;
    }

    // Merge Sort Function
    MergeSort(array, indexArray) {
       
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
                        Sort Visualiser
                    </a>
                </div>

                <div id='sorttypesbuttonbar'>
                    <div/>
                    <button className='sorttypebutton' 
                        onClick={this.HandleChangeSort.bind(this, "bubble")}
                        style={(this.state.sort == 'bubble') ? {backgroundColor: 'var(--main-color)', color:'var(--secondary-color)'} : {}}
                    >Bubble</button>
                    <div/>
                    <button className='sorttypebutton' 
                        onClick={this.HandleChangeSort.bind(this, "insertion")}
                        style={(this.state.sort == 'insertion') ? {backgroundColor: 'var(--main-color)', color:'var(--secondary-color)'} : {}}
                    >Insertion</button>
                    <div/>
                    <button className='sorttypebutton' 
                        onClick={this.HandleChangeSort.bind(this, "test")}
                        style={(this.state.sort == 'test') ? {backgroundColor: 'var(--main-color)', color:'var(--secondary-color)'} : {}}
                    >Placeholder</button>
                    <div/>
                </div>

                <div id='hiddensortcontent' style={(this.state.sort == '') ? {maxHeight: '0px'} : {}}>
                    <div id='sortbuttonsbar'>
                        <button className='sortbutton' onClick={this.HandleAdd.bind(this) }>Add</button>
                        <button className='sortbutton' onClick={this.HandleRemove.bind(this)} >Remove</button>
                        <button className='sortbutton' onClick={this.HandleRandomise.bind(this)}>Randomise</button>
                        <button className='sortbutton' onClick={this.HandleReset.bind(this)} >Reset</button>
                        <button className='sortbutton' onClick={this.HandleStart.bind(this)} style={this.state.currentlySorting ? {backgroundColor: 'var(--secondary-color)', color: 'var(--main-color)'} : {}} >Start</button>
                    </div>

                    <div id='extraButtonLayer' 
                    style={(this.state.selectedElement == -1) ? {maxHeight: "0px"} : {maxHeight: "66px"}}>
                        <input id='element-value-input' onChange={this.HandleInputChange.bind(this)}
                        type={"number"} min={"1"} max={"100"} tabIndex={'0'}
                        placeholder={this.state.elementsArray[this.state.selectedElement]}
                        ></input>
                        <button className='sortbutton' style={{top:'6px'}} onClick={this.HandleValueChange.bind(this)}>Change</button>
                    </div>

                    <div style={{height: '8px', position:'relative', width:'100%', backgroundColor:"var(--secondary-color)", zIndex:"1"}} />
                    <div id='sortContainer'>
                        {this.state.elementsArray.map((element, index) => {
                            return <div key={index} 
                            className='sortelementparent' 
                            onClick={this.HandleValueChangeToggle.bind(this, index)} 
                            style={ (this.state.selectedElement == index || this.state.currentlySorting && this.state.currentlySelectedIndex.includes(index)) ? { opacity:'100%' } : { opacity:'80%' } } >
                                {<SortElement value={ element } />}
                            </div>;
                        })}
                    </div>
                    <div style={{height: '8px', position:'relative', width:'100%', backgroundColor:"var(--secondary-color)"}} />
                </div>
            </div>
        );
    }
}
