import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { motion } from "framer-motion"
import { BrowserRouter, Link, Route, Routes, Outlet } from "react-router-dom";

import Sorts from './Sorting/Sorting.js';

import './index.css';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            section: ""
        };
    }

    handleClick(value) {
        
    }

    render() { 
        return (
            <div id="page">
                <div id="wrapper">
                    <div id="topbarPositioner">
                        <TopBar onClick={(val) => {this.handleClick(val)}}/>
                    </div>
        
                    <Outlet/>
                </div>
            </div>
        );
    }
}

class TopBarButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Link to={"/" + this.props.value}>
                <button className="topbarbutton" onClick={this.props.onClick}>{"<" + this.props.value + ">"}</button>
            </Link>
        );
    }
}

class TopBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <div className="topbar">
                <Link to="/">
                    <div className="logo"><a>Pedro Komessu</a></div>
                </Link>
                <div className="topbarMenus">
                    <TopBarButton onClick={() => {this.props.onClick("About")}} value={"About"}/>
                    <div className="divider"></div>
                    <TopBarButton onClick={() => {this.props.onClick("Projects")}} value={"Projects"} />
                    <div className="divider"></div>
                    <TopBarButton onClick={() => {this.props.onClick("Contact")}} value={"Contact"} />
                </div>
            </div>
        )
    };
}

class AboutSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sectionElements: ["Hello!", "About2", "About3"],
            sectionNumber: 0,
        }
    }

    render() {
        return(
            <div id="aboutSection">
                <div id="aboutDivider">
                    <div className="title"><a className="titleText">{this.state.sectionElements[this.state.sectionNumber]}</a></div>
                    <div id="about">
                        <p id="aboutText">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                    </div>
                </div>
                <div className="gg-chevron-down"></div>
            </div>
        );
    }
}

class ProjectSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return(
            <a></a>
        );
    }
}

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage/>}>
                <Route path="" element={<AboutSection/>} />
                <Route path="About" element={<AboutSection/>} />
                <Route path="Projects" element={<ProjectSection/>} />
                <Route path="Contact" element={<ProjectSection/>} />
                <Route path="Sorting" element={<Sorts/>}>

                </Route>
            </Route>
        </Routes>
    </BrowserRouter>,
    document.getElementById("loader")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
