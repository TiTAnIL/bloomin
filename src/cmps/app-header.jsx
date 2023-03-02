import { NavLink, useNavigate } from "react-router-dom"
// import debounce from 'lodash/debounce'
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { loadPlants } from "../store/actions/plant.actions"
import { eventBusService } from '../services/event-bus.service'

import logo from '../assets/imgs/logo.png'
import searchIcon from '../assets/imgs/ic-actions-search.png'
import cart from '../assets/imgs/cart.png'


export function AppHeader() {

    const [name, setname] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const filterDelay = 1000

    const onChangeFilter = (filterBy) => {
        dispatch(loadPlants())
    }

    useEffect(() => {
        onChangeFilter({
            name: name
        })
    }, [name])

    function handleNameChange(event) {
        setname(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()
        event.stopPropagation()
        const filterBy = { name: name }
        // navigate(`/shop?${'name', encodeURIComponent(JSON.stringify(filterBy))}`)
        eventBusService.emit("nameChange", filterBy)
    }

    return (
        <header className='app-header'>
            <section className='header-container'>
                <nav className="header-navigators">
                    <NavLink className="header-logo" to='/'><img src={logo} alt="logo" /></NavLink>
                    <ul className="navigators-container">
                        <li><NavLink className="navigators assistant-reg-20pt" to='/shop'>shop</NavLink></li>
                        <li><NavLink className="navigators assistant-reg-20pt" to='/match'>mix&match</NavLink></li>
                        <li><NavLink className="navigators assistant-reg-20pt" to='/contact'>contact us</NavLink></li>
                        <li><NavLink className="navigators assistant-reg-20pt" to='/about'>info</NavLink></li>
                    </ul>
                    <ul className="header-opt">
                        <li>
                            <form onSubmit={handleSubmit}
                                role="search">
                                <label
                                    className="search-icon"
                                    htmlFor="search"><img src={searchIcon}
                                        alt="cart"></img>

                                </label>
                                <input id="search"
                                    className="search-input"
                                    type="search"
                                    placeholder="Search"
                                    onChange={handleNameChange}
                                    value={name}
                                    autoFocus
                                />
                            </form>
                        </li>
                        <li>
                            <NavLink className="cart-icon"
                                to='/cart'><img src={cart}
                                    alt="cart" />
                            </NavLink>
                        </li>
                        <li>
                            <select className="background-color4">
                                <option value="english">🇺🇸 English</option>
                                <option value="hebrew">🇮🇱 עברית</option>
                            </select>
                        </li>
                    </ul>
                </nav>
            </section>
        </header >
    )
}
