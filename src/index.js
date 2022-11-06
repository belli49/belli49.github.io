import React from 'react';
import { useEffect, useState  } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { motion } from "framer-motion"
import { BrowserRouter, Link, Route, Routes, Outlet } from "react-router-dom";

import Sorts from './Sorting/Sorting.js';
import ScrollToTop from './helperFunctions/scrollToTop.js';
import GameOfLife from './Life/life.js';

import './index.css';

const axios = require('axios');
var config = {
    method: 'get',
    url: 'https://pf-server-test.herokuapp.com/',
    headers: { }
}

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            section: ""
        };
    }

    componentDidMount() {
        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            })
    }

    handleClick(val) {
        console.log('section changed to ' + val);
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
                <div id='bottomSection'>
                    <div className='grid-container'>
                        <div className='grid-item'></div>
                        <div className='grid-item'>Linked In</div>
                        <div className='grid-item'>GitHub</div>
                        <div className='grid-item'>Contact me!</div>
                        <div className='grid-item'></div>
                        <div className='grid-item'></div>
                        <div className='grid-item'>https://www.linkedin.com/in/pedro-belli-komessu-033092238/</div>
                        <div className='grid-item'>https://github.com/belli49</div>
                        <div className='grid-item'>pedrokomessu(at)gmail.com</div>
                        <div className='grid-item'></div>
                    </div>
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
                    <div className="divider"></div>
                    <TopBarButton onClick={() => {this.props.onClick("ColorPalette")}} value={"ColorPalette"} />
                </div>
            </div>
        )
    };
}

class AboutSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            languages: 1,
            tools: 1,
            education: 1,
            sectionElements: ["Hello!", "About2", "About3"],
            sectionNumber: 0,
        }
    }

    render() {
        return(
            <div className='sectionWrapper'>
                <div id="aboutSection">
                    <div id="aboutDivider">
                        <div className="title"><a className="titleText">{this.state.sectionElements[this.state.sectionNumber]}</a></div>
                        <div id="about">
                            <p id="aboutText">Hello! I'm Pedro. Welcome to my website! Scroll down to learn a bit about me. You can check some projects I made at the {'<Projects>'} section. You can also change this website's colour palette by clicking {'<ColorPalette>'} in the navigation bar!</p>
                        </div>
                    </div>
                    <div style={{position:'relative', height:'auto', width:'auto'}}>
                        <div className="gg-chevron-down"></div>
                    </div>
                </div>
                <div id="curriculumSection">
                    <div className='curriculumBubble'>
                        <div className='curriculumTitle'>
                        <button className='aboutButton' onClick={() => { this.setState({ education: !this.state.education }) }}>Education</button>
                    </div>
                    {this.state.education == 1 &&
                        <div className='curriculumList'>
                            <ul>
                                <li>Tohoku University: Bachelor in Computer Engineering. Overall GPA: 3.48/4, Major GPA 3.64/4 (as of beginning of 6th semester, 2022).</li>
                                <li>MEXT (Japan's Ministry of Education, Culture, Sports, Science and Technology) Scholarship grantee.</li>
                                <li>Osaka University CJLC intensive Japanese language and culture course.</li>
                                <li>Native Portuguese, advanced English and Japanese, intermediade Spanish.</li>
                            </ul>
                        </div>
                    }
                    </div>
                    <div className='curriculumBubble'>
                        <div className='curriculumTitle'>
                            <button className='aboutButton' onClick={() => { this.setState({ languages: !this.state.languages }) }}>Languages</button>
                        </div>
                        {this.state.languages == 1 &&
                            <div className='curriculumList'>
                                <ul>
                                    <li>C++: Used mainly for solving algorithmic problems.</li>
                                    <li>JavaScript: Used for website/nodejs projects. For websites, I like to use ReactJS.</li>
                                    <li>C#: Used mainly with Unity for making games. I also used it a bit for making small, desktop apps.</li>
                                    <li>Python: One of the first languages I learned. I plan on using it for ML/AI related projects.</li>
                                </ul>
                            </div>
                        }
                    </div>
                    <div className='curriculumBubble'>
                        <div className='curriculumTitle' style={{zIndex:'10'}}>
                            <button className='aboutButton' onClick={() => { this.setState({ tools: !this.state.tools }) }}>Tools</button>
                        </div>
                        {this.state.tools == 1 &&
                            <div className='curriculumList'>
                                <ul>
                                    <li>VSCode: My main text editor. What I use for almost everything.</li>
                                    <li>Vim: Normally I just use the VIM extension for VSCode, but for quick alterations or algorithmic problems I use the terminal version of VIM.</li>
                                    <li>Ubuntu Terminal: I use wsl2 + Ubuntu for a better, more dynamic workflow, as I prefer its terminal to the Widnwos cmd/PowerShell.</li>
                                    <li>Intermediate Excel: I had Excel classes from Middle School through High School. Although I don't use it for projects, I am quite comfortable with it.</li>
                                </ul>
                            </div>
                        }   
                    </div>
                </div>
                <div style={{position:'relative', width:'100%', height:'400px'}} />
            </div>
        );
    }
}

class ColorPalette extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mainColor: '#181818',
            submainColor: '#282828',
            secondaryColor: '#ffffff',
            subsecondaryColor: '#ededed',

            mainWrong: false,
            secondaryWrong: false,
            submainWrong: false,
            subsecondaryWrong: false,
        }
    }

    CheckHexcode (hexcode) {
        if (hexcode.length != 7) return false;
        if (hexcode.charAt(0) != '#') return false;

        for (let i = 1; i < 7; i++) {
            let charCode = hexcode.charCodeAt(i);
            if (charCode < 48 || charCode > 102 || (charCode > 57 && charCode < 97)) return false;
        }

        return true;
    }

    HandleChangeMainColorInput (event) {
        let hexcode = event.target.value;
        this.setState({ mainColor: hexcode });
    }
    
    HandleChangeSecondaryColorInput (event) {
        let hexcode = event.target.value;
        this.setState({ secondaryColor: hexcode });
    }
    
    HandleChangeSubMainColorInput (event) {
        let hexcode = event.target.value;
        this.setState({ submainColor: hexcode });
    }
    
    HandleChangeSubSecondaryColorInput (event) {
        let hexcode = event.target.value;
        this.setState({ subsecondaryColor: hexcode });
    }

    HandleChangeColor (colorVar) {
        console.log(this.state);

        switch (colorVar) {
            case 'main':
                if (this.CheckHexcode(this.state.mainColor)) {
                    document.documentElement.style.setProperty('--main-color', this.state.mainColor);
                    this.setState({ mainWrong: false });
                } else this.setState({ mainWrong: true });
                break;

            case 'secondary':
                if (this.CheckHexcode(this.state.secondaryColor)) {
                    document.documentElement.style.setProperty('--secondary-color', this.state.secondaryColor);
                    this.setState({ secondaryWrong: false });
                } else this.setState({ secondaryWrong: true });
                break;

            case 'submain':
                if (this.CheckHexcode(this.state.submainColor)) {
                    document.documentElement.style.setProperty('--submain-color', this.state.submainColor);
                    this.setState({ submainWrong: false });
                } else this.setState({ submain: true });
                break;

            case 'subsecondary':
                if (this.CheckHexcode(this.state.subsecondaryColor)) {
                    document.documentElement.style.setProperty('--subsecondary-color', this.state.subsecondaryColor);
                    this.setState({ subsecondaryWrong: false });
                } else this.setState({ subsecondaryWrong: true });
                break;
            
            default:
                break;
        }

        return;
    }

    render () {
        return (
            <div style={{position: 'relative', width: 'auto', height: 'auto'}}>
                <div style={{position: 'relative', height: 'auto', width: '100%', marginTop: '10vh', textAlign: 'center'}}>
                    <Link to="/Projects">
                        <div className="gg-chevron-down" style={{zIndex:'1' , transform:'rotate(90deg) scale(2)', position:'absolute', left:'30vh', top:'1.9vh'}}></div>
                    </Link>
                    <a style={{position: 'relative', fontSize: '2em', color: 'white', cursor: 'default'}}>
                        Change this website's colors!
                    </a>
                </div>

                <div id='colorpalettebar'>
                    <div/>
                    <div className='palette-div'>
                        <a className='paletteText'>Main Color</a>
                        <input className='color-palette-input' onChange={this.HandleChangeMainColorInput.bind(this)}
                        type={"text"} min={"1"} max={"100"} tabIndex={'0'}
                        placeholder={'#181818'} style={(this.state.mainWrong) ? {background: '#ff5047'} : {}}
                        ></input>
                        <button className='paletteButton' onClick={this.HandleChangeColor.bind(this, 'main')}>Change</button>
                    </div>
                    <div/>
                    <div className='palette-div'>
                        <a className='paletteText'>Secondary Color</a>
                        <input className='color-palette-input' onChange={this.HandleChangeSecondaryColorInput.bind(this)}
                        type={"text"} min={"1"} max={"100"} tabIndex={'0'}
                        placeholder={'#ffffff'} style={(this.state.secondaryWrong) ? {background: 'ff5047'} : {}}
                        ></input>
                        <button className='paletteButton' onClick={this.HandleChangeColor.bind(this, 'secondary')}>Change</button>
                    </div>
                    <div/>
                    <div/>
                    <div className='palette-div'>
                        <a className='paletteText'>Sub-main Color</a>
                        <input className='color-palette-input' onChange={this.HandleChangeSubMainColorInput.bind(this)}
                        type={"text"} min={"1"} max={"100"} tabIndex={'0'}
                        placeholder={'#282828'} style={(this.state.submainWrong) ? {background: 'ff5047'} : {}}
                        ></input>
                        <button className='paletteButton' onClick={this.HandleChangeColor.bind(this, 'submain')}>Change</button>
                    </div>
                    <div/>
                    <div className='palette-div'>
                        <a className='paletteText'>Sub-secondary Color</a>
                        <input className='color-palette-input' onChange={this.HandleChangeSubSecondaryColorInput.bind(this)}
                        type={"text"} min={"1"} max={"100"} tabIndex={'0'}
                        placeholder={'#ededed'} style={(this.state.subsecondaryWrong) ? {background: 'ff5047'} : {}}
                        ></input>
                        <button className='paletteButton'  onClick={this.HandleChangeColor.bind(this, 'subsecondary')}>Change</button>
                    </div>
                    <div/>
                </div>
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
            <div style={{position: 'relative', width: 'auto', height: 'auto'}}>
                <div style={{position: 'relative', height: 'auto', width: '100%', top: '10vh', textAlign: 'center'}}>
                    <a style={{position: 'relative', fontSize: '2em', color: 'white', cursor: 'default'}}>Projects (Click to view)</a>
                </div>
                <div className='project-grid'>
                    <div></div>
                    <Link to="/">
                        <div className='project-grid-item'>
                            <a style={{position: 'relative', top: '8px'}}>This website!</a>
                            <img
                                src={ require('./img/site_proj_thumb.png') }
                                draggable={'false'}
                                style={{width:'100%', position: 'relative', top: '20px'}}
                            />
                        </div>
                    </Link>
                    <div></div>
                    <Link to="/Projects/Sorting">
                        <div className='project-grid-item'>
                            <a style={{position: 'relative', top: '8px'}}>Sort Visualiser</a>
                            <img
                                src={ require('./img/sort_proj_thumb.png') }
                                draggable={'false'}
                                style={{width:'70%', position: 'relative', top: '20px'}}
                            />
                        </div>
                    </Link>
                    <div></div>
                    <div></div>
                    <Link to="/Projects/GameOfLife">
                        <div className='project-grid-item'>
                            <a style={{position: 'relative', top: '8px'}}>Game of Life</a>
                            <img
                                src={ require('./img/life_proj_thumb.png') }
                                draggable={'false'}
                                style={{width:'80%', position: 'relative', top: '20px'}}
                            />
                        </div>
                    </Link>
                    <div></div>
                    <div className='project-grid-item'>
                        <a style={{position: 'relative', top: '8px'}}
                        href='https://github.com/belli49'>Restaurant Congestion Viewer</a>
                        <img
                            src={ require('./img/restaurant1_proj_thumb.png') }
                            draggable={'false'}
                            style={{width:'100%', position: 'relative', top: '20px'}}
                        />
                    </div>
                    <div></div>
                    <div></div>
                    <div className='project-grid-item'>
                        <a style={{position: 'relative', top: '8px'}}
                        href='https://github.com/belli49/paint_clone'>Paint Clone</a>
                        <img
                            src={ require('./img/paint_proj_thumb.png') }
                            draggable={'false'}
                            style={{width:'80%', position: 'relative', top: '20px'}}
                        />
                    </div>
                    <div></div>
                    <div className='project-grid-item'>
                        <a style={{position: 'relative', top: '8px'}}>Unity Games</a>
                        <img
                            src={ require('./img/unity_proj_thumb.png') }
                            draggable={'false'}
                            style={{width:'100%', position: 'relative', top: '20px'}}
                        />
                    </div>
                    <div></div>
                </div>
                <div style={{position:'relative', width:'100%', height:'200px'}} />
            </div>
        );
    }
}

class ContactSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return(
            <div></div>
        );
    }
}

ReactDOM.render(
    <BrowserRouter>
        <ScrollToTop />
            <Routes>
                <Route path="/" element={<HomePage/>}>
                    <Route path="" element={<AboutSection/>} />
                    <Route path="About" element={<AboutSection/>} />

                    <Route path="Projects" element={<ProjectSection/>} />
                    <Route path="Projects/Sorting" element={<Sorts/>} />
                    <Route path="Projects/GameOfLife" element={<GameOfLife/>} />

                    <Route path="Contact" element={<ContactSection/>} />

                    <Route path="ColorPalette" element={<ColorPalette/>}/>
                </Route>
            </Routes>
    </BrowserRouter>,
    document.getElementById("loader")
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
