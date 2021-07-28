import React from 'react';

const NavBar=()=>{
    return (
        <nav>
        <div class="nav-wrapper " style={{backgroundColor:"#021636"}}>
          <a href="" class="brand-logo" style={{marginLeft:10}}>Interview Creation</a>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li><a href="/">Home</a></li>
            <li><a href="/create">Schedule an Interview</a></li>
            
          </ul>
        </div>
      </nav>
    )
}

export default NavBar;