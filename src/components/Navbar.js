import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css';
import {Button} from './Button';

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    const handleClick = () => setClick(!click);
    const closeMobileMenu =() => setClick(false);

    const showButton = () => { 
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    window.addEventListener('resize', showButton);

  return (
    <>
        <nav classname = "navbar">
            <div classNamev = "navbar-container">
             <Link to ="/" className = "navbar-logo">
                HandScript <i className='fab fa-typo3'/>
             </Link>
             <div className = 'menu-icon' onClick={handleClick}>
                <i className = {click ? 'fas fa-times' : 'fas fa-bars'} />
             </div>
             <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                <li className = 'nav-item'>
                    <Link to='/home' className = 'nav-links' onClick={closeMobileMenu}>
                        Home
                    </Link>
                </li>
                <li className = 'nav-item'>
                    <Link to='/contactUs' className = 'nav-links' onClick={closeMobileMenu}>
                        Help
                    </Link>
                </li>
                <li className = 'nav-item'>
                    <Link to='/about' className = 'nav-links' onClick={closeMobileMenu}>
                        About
                    </Link>
                </li>
             </ul>
             {button && <Button buttonStyle = 'btn--outline'> SIGN UP</Button>}
            </div>
        </nav>
    </>
  )
}

export default Navbar