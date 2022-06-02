import React from 'react';
import ReactDOM from 'react-dom';
import { motion } from "framer-motion";
import { BrowserRouter, Link, Route, Routes, Outlet } from "react-router-dom";

import './life.css';
import '../index.css';
import '../Sorting/Sorting.css';

function Square(props) {
    return (
    <div className='gameelementchild' style={(props.value ? {backgroundColor: 'var(--main-color)'} : {backgroundColor: 'var(--secondary-color)'})}>
    </div>
    );
}


export default class GameOfLife extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squaresArray: [...Array(58)].map(e => Array(21).fill(1)),
        };
    }

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

                <div id='sorttypesbuttonbar'>
                    <div/>
                    <button className='sorttypebutton' 
                        style={(this.state.sort == 'bubble') ? {backgroundColor: 'var(--main-color)', color:'var(--secondary-color)'} : {}}
                    >Clear</button>
                    <div/>
                    <button className='sorttypebutton' 
                        style={(this.state.sort == 'insertion') ? {backgroundColor: 'var(--main-color)', color:'var(--secondary-color)'} : {}}
                    >Reset</button>
                    <div/>
                    <button className='sorttypebutton' 
                        style={(this.state.sort == 'test') ? {backgroundColor: 'var(--main-color)', color:'var(--secondary-color)'} : {}}
                    >Start</button>
                    <div/>
                </div>


                <div style={{height: '8px', position:'relative', width:'100%', backgroundColor:"var(--secondary-color)", zIndex:"1"}} />
                <div id='gameContainer'>
                    {this.state.squaresArray.map((element, index) => {
                        return <div>
                            { element.map((gameSquare, column) => {
                                return <div key={(column + index*element.length)}
                                className='gameelementparent' >
                                    <Square value={gameSquare} />
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