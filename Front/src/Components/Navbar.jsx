import React, {useEffect} from 'react'
import {Link} from 'react-scroll'

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem('profile')).result
    return (
        <div>
            <nav>
                <Link to='main' className='logo'>
                    Logout
                </Link>
                <input type="checkbox" className='menu-btn' id='menu-btn'/>
                <label htmlFor='menu-btn' className='menu-icon'>
                    <span className='nav-icon'/>
                </label>
                <ul className="menu">
                    <li><Link to='main' className='active' smooth={true} duration={1000}>Hello {user.name}</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar