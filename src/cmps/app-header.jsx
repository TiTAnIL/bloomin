import { NavLink, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { loadPlants } from "../store/actions/plant.actions"
import { eventBusService } from '../services/event-bus.service'

import logo from '../assets/imgs/logo.png'
import searchIcon from '../assets/imgs/ic-actions-search.png'
import Blogo from '../assets/imgs/Blogo.png'
import { CartTotal } from "./cartTotal"

export function AppHeader() {

    const dispatch = useDispatch()
    const searchInputRef = useRef(null)
    const sidenavRef = useRef(null)
    const [name, setName] = useState('')
    const [isNavOpen, setIsNavOpen] = useState(false)
    const [isSearch, setisSearch] = useState(false)
    const navigate = useNavigate()

    const onChangeFilter = () => {
        dispatch(loadPlants())
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
                closeSearch()
            }

            if (sidenavRef.current && !sidenavRef.current.contains(event.target)) {
                closeNav()
            }
        }

        document.addEventListener("click", handleClickOutside)

        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [])

    useEffect(() => {
        onChangeFilter({
            name: name
        })
    }, [name])

    function handleNameChange(event) {
        setName(event.target.value)
    }

    const openSearch = () => {
        setisSearch(true)
        searchInputRef.current.focus()
    }

    const closeSearch = () => {
        setisSearch(false)
        setName('')
    }

    const openNav = () => {
        setIsNavOpen(true)
    }

    const closeNav = () => {
        setIsNavOpen(false)
    }

    function handleSubmit(event) {
        console.log(event)
        event.preventDefault()
        event.stopPropagation()
        const filterBy = { name: name }
        eventBusService.emit("nameChange", filterBy)
        navigate(`/shop?name=${name}`)
        closeSearch()
    }

    const sidenavStyle = {
        width: isNavOpen ? '128px' : '0'
    }

    const searchInput = {
        display: isSearch ? 'inline-block' : 'none'
    }

    return (
        <header className='app-header'>
            <section className='header-container'>
                <nav className="header-navigators">
                    <div className="header-large">
                        <ul className="navigators-container">
                            <div className="logo-container">
                                <NavLink className="header-logo" to='/'><img src={logo} alt="logo" /></NavLink>
                            </div>
                            <li><NavLink className="navigators assistant-reg-20pt" to='/shop'>shop</NavLink></li>
                            <li><NavLink className="navigators assistant-reg-20pt" to='/match'>mix&match</NavLink></li>
                            <li><NavLink className="navigators assistant-reg-20pt" to='/contact'>contact</NavLink></li>
                            <li><NavLink className="navigators assistant-reg-20pt" to='/about'>info</NavLink></li>
                        </ul>
                    </div>

                    <div className="header-med" ref={sidenavRef}>
                        <div id="mySidenav" className="sidenav" style={sidenavStyle}>
                            <span className="closebtn" onClick={() => closeNav()}>&#9776;</span>
                            <NavLink className="char-style-2" to='/shop'>Shop</NavLink>
                            <NavLink className="char-style-2" to='/match'>Mix&Match</NavLink>
                            <NavLink className="char-style-2" to='/contact'>Contact</NavLink>
                            <NavLink className="char-style-2" to='/about'>Info</NavLink>
                            {/* <select className="lang-med">
                                    <option className="lang-opt" value="english">🇺🇸 English</option>
                                    <option value="hebrew">🇮🇱 עברית</option>
                                </select> */}
                            <NavLink to='/'><img className="nav-Blogo" src={Blogo} alt="logo" /></NavLink>
                        </div>
                        <span className="sidenav-openbtn" onClick={() => openNav()}>&#9776;</span>

                        <div className="med-logo-container">
                            <NavLink to='/'><img className="med-header-logo" src={logo} alt="logo" /></NavLink>
                        </div>

                        <ul className="header-opt-med">
                            <li>
                                <CartTotal />
                                <form
                                    onSubmit={handleSubmit}
                                    role="search">
                                    <label
                                        className="search-icon"
                                        htmlFor="search">
                                        <img
                                            style={{ display: isSearch ? 'none' : 'inline-block' }}
                                            src={searchIcon}
                                            alt="cart">
                                        </img>
                                    </label>
                                    <input
                                        id="search"
                                        className="search-input"
                                        style={searchInput}
                                        type="search"
                                        onClick={openSearch}
                                        placeholder={`       Search`}
                                        onChange={handleNameChange}
                                        value={name}
                                        ref={searchInputRef}
                                        aria-label="Search products"
                                    />
                                </form>
                            </li>
                        </ul>

                        <ul className="header-opt">
                            <li>
                                <form onSubmit={handleSubmit}
                                    role="search">
                                    <label
                                        className="search-icon"
                                        htmlFor="search">
                                        <img
                                            src={searchIcon}
                                            alt="cart">
                                        </img>
                                    </label>
                                    <input id="search"
                                        className="search-input"
                                        type="search"
                                        placeholder="       Search"
                                        onChange={handleNameChange}
                                        value={name}
                                        aria-label="Search products"
                                    />
                                </form>
                            </li>
                            <li>
                                <CartTotal />
                            </li>

                            {/* <li>
                                    <select className="lang background-color4">
                                        <option value="english">🇺🇸 English</option>
                                        <option value="hebrew">🇮🇱 עברית</option>
                                    </select>
                                </li> */}
                        </ul>
                    </div>
                </nav>
            </section>
        </header >
    )
}