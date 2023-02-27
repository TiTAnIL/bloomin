// import { connect, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import debounce from 'lodash/debounce'
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadPlants, setFilterBy } from "../store/actions/plant.actions";

import logo from '../assets/imgs/logo.png';
import searchIcon from '../assets/imgs/ic-actions-search.png';
import cart from '../assets/imgs/cart.png'

export function AppHeader() {

    const [nameFilter, setNameFilter] = useState(null)
    const dispatch = useDispatch()
    const filterDelay = 1000

    const onChangeFilter = (filterBy) => {
        console.log('filterby', filterBy)
        dispatch(setFilterBy(filterBy))
        dispatch(loadPlants())
    }

    const filterData = debounce(() => {
        onChangeFilter({
            name: nameFilter
        })
    }, filterDelay)

    useEffect(() => {
        filterData()
    }, [nameFilter])

    function handleNameFilterChange(event) {
        event.preventDefault()
        event.stopPropagation()
        setNameFilter(event.target.value)
    }

    function onSubmit(event) {
        event.preventDefault()
        event.stopPropagation()
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
                            <form onSubmit={onSubmit}
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
                                    onChange={handleNameFilterChange}
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
