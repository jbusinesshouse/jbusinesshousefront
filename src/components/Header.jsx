import React, { useContext, useEffect, useState } from 'react'
import '../assets/styles/header.css'
import logo from '../assets/images/logo-new.png'
import search from '../assets/images/search-icon.png'
import user from '../assets/images/user.png'
import bellIcon from '../assets/images/bell.png'
import cart from '../assets/images/shopping-cart.png'
import menuIcon from '../assets/images/menu.png'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [overTog, setOverTog] = useState(false)
    const { userVal, isAuthenticated } = useContext(AuthContext)

    useEffect(() => {
        setIsLoggedIn(isAuthenticated)
    }, [isAuthenticated])
    return (
        <header>
            <div className="container">
                <div className="headerLeft">
                    <Link to={"/"}>
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <div className="headerRight">
                    <ul className={overTog ? "active" : ""}>
                        <li>
                            <Link to={'/'}>Home</Link>
                        </li>
                        <li>
                            <Link to={'/shop'}>Shop</Link>
                        </li>
                    </ul>
                    <div className="headerBtns">
                        <button>
                            <img src={search} alt="" />
                        </button>
                        {
                            isLoggedIn ?
                                <>
                                    <Link to={'/profile'}>
                                        <button>
                                            <img src={user} alt="" />
                                        </button>
                                    </Link>
                                    <Link to={`/orders/${userVal._id}`}>
                                        <button className='orderSeeBtn'>View All Orders</button>
                                    </Link>
                                    <img src={menuIcon} alt="" className='menuIcon' onClick={() => setOverTog(true)} />
                                </>
                                :
                                <>
                                    <Link to={"/login"}>Login</Link>
                                    <Link to={"/signup"}>Signup</Link>
                                </>
                        }
                        {/* <button>
                            <img src={cart} alt="" />
                        </button> */}
                    </div>
                </div>
            </div>
            <div className={overTog ? "overlay active" : "overlay"} onClick={() => setOverTog(false)}></div>
        </header>
    )
}

export default Header