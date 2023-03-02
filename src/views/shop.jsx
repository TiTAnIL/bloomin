import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { loadPlants, setFilterBy } from '../store/actions/plant.actions.js'

import queryString from 'query-string'

import { PlantList } from '../cmps/plants-list'
import { SearchFilter } from '../cmps/search-filter'
import LoadingScreen from "react-loading-screen"

export function Shop(props) {

    const { plants, isLoading } = useSelector(state => state.plantModule)
    const [currentPage, setCurrentPage] = useState(1)
    const [plantsPerPage, setPlantsPerPage] = useState(9)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()


    function onChangeFilter (filterBy) {
        const params = new URLSearchParams()
        if (filterBy.locations) {
            params.set('locations', encodeURIComponent(JSON.stringify(filterBy.locations)))
        }
        if (filterBy.difficulty) {
            params.set('difficulty', encodeURIComponent(JSON.stringify(filterBy.difficulty)))
        }
        if (filterBy.lightning) {
            params.set('lightning', encodeURIComponent(JSON.stringify(filterBy.lightning)))
        }
        if (filterBy.watering) {
            params.set('watering', encodeURIComponent(JSON.stringify(filterBy.watering)))
        }
        if (filterBy.priceRange) {
            params.set('priceRange', encodeURIComponent(JSON.stringify(filterBy.priceRange)))
        }
        if (filterBy.name) {
            params.set('name', encodeURIComponent(JSON.stringify(filterBy.name)))
        }
        const queryStringParams = params.toString()
        navigate(`/shop?${queryStringParams}`)
        dispatch(setFilterBy(filterBy))
        dispatch(loadPlants())
    }

    const idxLastPlant = currentPage * plantsPerPage
    const idxFirstPlant = idxLastPlant - plantsPerPage
    const currentPlants = plants ? plants.slice(idxFirstPlant, idxLastPlant) : [];

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(plants.length / plantsPerPage); i++) {
        pageNumbers.push(i)
    }

    const renderPageNums = pageNumbers.map(num => {
        return (
            <li
                key={num}
                id={num}
                onClick={() => setCurrentPage(num)}
                className={currentPage === num ? 'cur-page' : null}
            >
                {num}
            </li>
        )
    })

    const handleDropdown = (event) => {
        setPlantsPerPage(event.target.value)
    }


    if (isLoading)
        return <LoadingScreen
            loading={true}
            bgColor="rgba(255,255,255,0.5)"
            spinnerColor="#4850b9"
            textColor="#676767"
            logoSrc="../logo.png"
            text="Loading"
        >
            {" "}
        </LoadingScreen>

    return (
        <main>
            <Link to='/plant/edit/'>
                <button>Add Plant</button>
            </Link>
            <div className='shop-container'>
                <SearchFilter onChangeFilter={onChangeFilter} />
                <PlantList plants={currentPlants} />
            </div>
            <ul id="page-numbers" className='pagination'>Page: {renderPageNums}
            </ul>
            <label htmlFor="ipp">Item per page:
                <select onChange={handleDropdown}>
                    <option value="9">9</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                </select>
            </label>
        </main>
    )

}

