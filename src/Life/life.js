import React from 'react';
import ReactDOM from 'react-dom';
import { motion } from "framer-motion";
import { BrowserRouter, Link, Route, Routes, Outlet } from "react-router-dom";

import './life.css';
import '../index.css';
import '../Sorting/Sorting.css';

class Square extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    
    render() {
        return (
        <div className='gameelementchild' style={(this.props.value[0] ? {opacity: '100%'} : {})}>
        </div>
        );
    }
}


export default class GameOfLife extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squaresArray: [...Array(58)].map(e => Array(21).fill(0)),
            resetArray: 0,
            currentlyPlaying: false,
        };
    }

    // ---------- FUNCTION DEF START ----------

    HandleSquareClick(position) {
        let arr = this.state.squaresArray;
        let row = position[0], column = position[1];

        arr[row][column] = (arr[row][column] == 1) ? 0 : 1;

        this.setState({ squaresArray: arr, resetArray: arr });
    }

    HandleStart() {
        if (!this.state.currentlyPlaying) {
            this.GameHandler();
        } else {
            this.setState({ currentlyPlaying: false });
        }
    }

    HandleClear() {
        const newBoard = [...Array(58)].map(e => Array(21).fill(0));

        console.log('cleared');
        this.setState({ squaresArray: newBoard });
    }

    HandleReset() {
        if (!this.state.resetArray) return;

        this.setState({ squaresArray: this.state.resetArray });
    }

    HandleNext() {
        let squareCheckArray = [...Array(58)].map(e => Array(21).fill(0));
        let newBoard = [...Array(58)].map(e => Array(21).fill(0));

        for (let i = 0; i < 58; i++) {
            for (let j = 0; j < 21; j++) {
                if (!this.state.squaresArray[i][j]) continue;
                if (i > 0) {
                    if (j > 0) squareCheckArray[i - 1][j - 1]++;
                    squareCheckArray[i - 1][j]++;
                    if (j < 20) squareCheckArray[i - 1][j + 1]++;
                }

                if (j > 0) squareCheckArray[i][j - 1]++;
                if (j < 20) squareCheckArray[i][j + 1]++;

                if (i < 57) {
                    if (j > 0) squareCheckArray[i + 1][j - 1]++;
                    squareCheckArray[i + 1][j]++;
                    if (j < 20) squareCheckArray[i + 1][j + 1]++;
                }
            }
        }

        for (let i = 0; i < 58; i++) {
            for (let j = 0; j < 21; j++) {
                if (this.state.squaresArray[i][j] && (squareCheckArray[i][j] == 2 || squareCheckArray[i][j] == 3))
                    newBoard[i][j] = 1;
                else if (squareCheckArray[i][j] == 3) newBoard[i][j] = 1;
            }
        }

        this.setState({ squaresArray: newBoard });
    }

    GameHandler() {
        this.setState({ currentlyPlaying: true });

        const gameNextTurn =  setInterval(() => {
            if (!this.state.currentlyPlaying) {
                clearInterval(gameNextTurn);
                console.log('cleared interval');
            }

            console.log('started turn');

            let squareCheckArray = [...Array(58)].map(e => Array(21).fill(0));
            let newBoard = [...Array(58)].map(e => Array(21).fill(0));

            for (let i = 0; i < 58; i++) {
                for (let j = 0; j < 21; j++) {
                    if (!this.state.squaresArray[i][j]) continue;
                    if (i > 0) {
                        if (j > 0) squareCheckArray[i - 1][j - 1]++;
                        squareCheckArray[i - 1][j]++;
                        if (j < 20) squareCheckArray[i - 1][j + 1]++;
                    }

                    if (j > 0) squareCheckArray[i][j - 1]++;
                    if (j < 20) squareCheckArray[i][j + 1]++;

                    if (i < 57) {
                        if (j > 0) squareCheckArray[i + 1][j - 1]++;
                        squareCheckArray[i + 1][j]++;
                        if (j < 20) squareCheckArray[i + 1][j + 1]++;
                    }
                }
            }

            for (let i = 0; i < 58; i++) {
                for (let j = 0; j < 21; j++) {
                    if (this.state.squaresArray[i][j] && (squareCheckArray[i][j] == 2 || squareCheckArray[i][j] == 3))
                        newBoard[i][j] = 1;
                    else if (squareCheckArray[i][j] == 3) newBoard[i][j] = 1;
                }
            }

            console.log('ended turn');

            this.setState({ squaresArray: newBoard });

        }, 250);
    }

    // ---------- FUNCTION DEF END ----------

    render() {
        return (
            <div style={{position: 'relative', width: 'auto', height: 'auto'}}>
                <div style={{position: 'relative', height: 'auto', width: '100%', marginTop: '10vh', textAlign: 'center'}}>
                    <Link to="/Projects">
                        <div className="gg-chevron-down" style={{zIndex:'1' , transform:'rotate(90deg) scale(2)', position:'absolute', left:'30vh', top:'1.9vh'}}></div>
                    </Link>
                    <a style={{position: 'relative', fontSize: '2em', color: 'white', cursor: 'default'}}>
                        Game Of Life
                    </a>
                </div>

                <div id='gameOfLifeButtonsBar'>
                    <div/>
                    <button className='sorttypebutton' 
                        style={(this.state.sort == 'bubble') ? {backgroundColor: 'var(--main-color)', color:'var(--secondary-color)'} : {}}
                        onClick={this.HandleClear.bind(this)}
                    >Clear</button>
                    <div/>
                    <button className='sorttypebutton' 
                        style={(this.state.sort == 'insertion') ? {backgroundColor: 'var(--main-color)', color:'var(--secondary-color)'} : {}}
                        onClick={this.HandleReset.bind(this)}
                    >Reset</button>
                    <div/>
                    <button className='sorttypebutton' 
                        style={(this.state.sort == 'insertion') ? {backgroundColor: 'var(--main-color)', color:'var(--secondary-color)'} : {}}
                        onClick={this.HandleNext.bind(this)}
                    >Next</button>
                    <div/>
                    <button className='sorttypebutton' 
                        style={ (this.state.currentlyPlaying) ? {backgroundColor: 'var(--main-color)', color: 'var(--secondary-color)'} : {} }
                        onClick={this.HandleStart.bind(this)}
                    >{ (this.state.currentlyPlaying) ? 'Stop' : 'Start' }</button>
                    <div/>
                </div>


                <div style={{height: '8px', position:'relative', width:'100%', backgroundColor:"var(--secondary-color)", zIndex:"1"}} />
                <div id='gameContainer'>
                    {this.state.squaresArray.map((element, index) => {
                        return <div>
                            { element.map((gameSquare, column) => {
                                return <div key={(column + index*element.length)}
                                className='gameelementparent' 
                                onClick={this.HandleSquareClick.bind(this, [index, column])}
                                >
                                    <Square value={[gameSquare]} />
                                </div>;
                            })}
                        </div>;
                    })}
                </div>
                <div style={{height: '8px', position:'relative', width:'100%', backgroundColor:"var(--secondary-color)"}} />
            </div>
        )
    }
}