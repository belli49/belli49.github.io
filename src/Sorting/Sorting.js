import React from 'react';
import ReactDOM from 'react-dom';
import { motion } from "framer-motion"
import { BrowserRouter, Link, Route, Routes, Outlet } from "react-router-dom";

import './Sorting.css';

export default class Sorts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render () {
        return (
            <div style={{position: 'relative', width: 'auto', height: 'auto'}}>
                <div style={{position: 'relative', height: 'auto', width: '100%', top: '10vh', textAlign: 'center'}}>
                    <Link to="/Projects">
                        <div className="gg-chevron-down" style={{zIndex:'1' , transform:'rotate(90deg) scale(2)', position:'absolute', left:'30vh', top:'1.9vh'}}></div>
                    </Link>
                    <a style={{position: 'relative', fontSize: '2em', color: 'white', cursor: 'default'}}>
                        Sort Visualiser
                    </a>
                </div>
                
                <div style={{position:'relative', width:'100%', height:'200px'}} />
            </div>
        );
    }
}