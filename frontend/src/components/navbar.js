import React from 'react';
import { Link, useNavigate } from "react-router-dom";

const NavBar=()=>{
    return (
        <nav>
        <div class="nav-wrapper " style={{backgroundColor:"#021636"}}>
          <a href="" class="brand-logo" style={{marginLeft:10}}>Interview Creation Portal</a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/create">Schedule an Interview</Link></li>
            
          </ul>
        </div>
      </nav>
    )
}

export default NavBar;