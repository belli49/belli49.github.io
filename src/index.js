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
                            <p id="aboutText">Hello! I'm Pedro. Welcome to my website! Scroll down to learn a bit about me!</p>
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
                                <li>Tohoku University: Bachelor in Computer Engineering. Overall GPA: 3.42/4, Major GPA 3.55/4 (as of beginning of 5th semester, 2022).</li>
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
                                    <li>VSCode: My main text editor. What I use for almost every project.</li>
                                    <li>Vim: Normally I just use the VIM extension for VSCode, but for quick alterations or algorithmic problems I like to use the terminal version of VIM.</li>
                                    <li>wsl2: I like to use Ubuntu + Windows Terminal for a better, more dynamic workflow.</li>
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
                    <a style={{position: 'relative', fontSize: '2em', color: 'white', cursor: 'default'}}>Projects</a>
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
                                src={ require('./img/site_proj_thumb.png') }
                                draggable={'false'}
                                style={{width:'100%', position: 'relative', top: '20px'}}
                            />
                        </div>
                    </Link>
                    <div></div>
                    <div></div>
                    <Link to="/">
                        <div className='project-grid-item'>
                            <a style={{position: 'relative', top: '8px'}}>Game of Life</a>
                            <img
                                src={ require('./img/site_proj_thumb.png') }
                                draggable={'false'}
                                style={{width:'100%', position: 'relative', top: '20px'}}
                            />
                        </div>
                    </Link>
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
        <Routes>
            <Route path="/" element={<HomePage/>}>
                <Route path="" element={<AboutSection/>} />
                <Route path="About" element={<AboutSection/>} />
                <Route path="Projects" element={<ProjectSection/>} />
                <Route path="Contact" element={<ContactSection/>} />
                <Route path="Projects/Sorting" element={<Sorts/>}>

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
