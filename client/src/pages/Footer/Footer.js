import React from 'react';
import 'materialize-css';
import './Footer.css';

const Footer = () => {
    return (
        <div className="footer_container">
            <a classname="course_link" href="https://rs.school"><img className="course_logo" src="https://rs.school/images/rs_school_js.svg"></img></a>
            <div className="white-text year">2021</div>
            <div className="links">
                <a href="https://github.com/LexaMart"><img className='link' src="https://avatars.githubusercontent.com/u/56229270?s=460&v=4"></img></a>
                <a href="https://github.com/burik84"><img className='link' src="https://avatars.githubusercontent.com/u/32265200?s=460&v=4"></img></a>
                <a href="https://github.com/AnAtoliyAK"><img className='link' src='https://avatars.githubusercontent.com/u/58717777?s=460&u=7f8f28255c70e32abef722dbc8fed59da5d55482&v=4'></img></a>
                <a href="https://github.com/Nerbet"><img className='link' src='https://avatars.githubusercontent.com/u/60988912?s=400&v=4'></img></a>
            </div>
        </div>
    )
}

export default Footer;