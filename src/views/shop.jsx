import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loadPlants, setFilterBy } from '../store/actions/plant.actions.js'
import queryString from 'query-string'

import { PlantList } from '../cmps/plants-list'
import { SearchFilter } from '../cmps/search-filter'
import LoadingScreen from "react-loading-screen"

export function Shop() {

    const { plants, isLoading } = useSelector(state => state.plantModule)
    const [currentPage, setCurrentPage] = useState(1)
    const [plantsPerPage, setPlantsPerPage] = useState(9)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [filter, setFilter] = useState()
    // const handleFilterChange = (newFilter) => {
    //     setFilter(newFilter)
    // }

    useEffect(() => {
        console.log('use')
        const query = queryString.parse(window.location.search)
        const decodedFilterBy = {}
        if (query) {
            const filterParams = query
            if (filterParams.locations) {
                decodedFilterBy.locations = JSON.parse(decodeURIComponent(filterParams.locations))
                // console.log(decodedFilterBy.locations)
            }
            if (filterParams.difficulty) {
                // console.log(filterParams.difficulty)
                decodedFilterBy.difficulty = JSON.parse(decodeURIComponent(filterParams.difficulty))
                // console.log(decodedFilterBy.difficulty)

            }
            if (filterParams.lightning) {
                // console.log(filterParams.lightning)
                decodedFilterBy.lightning = JSON.parse(decodeURIComponent(filterParams.lightning))
                // console.log(decodedFilterBy.lightning)

            }
            if (filterParams.watering) {
                // console.log(filterParams.watering)
                decodedFilterBy.watering = JSON.parse(decodeURIComponent(filterParams.watering))
                // console.log(decodedFilterBy.watering)

            }
            if (filterParams.priceRange) {
                // console.log(filterParams.priceRange)
                decodedFilterBy.priceRange = JSON.parse(decodeURIComponent(filterParams.priceRange))
                // console.log(decodedFilterBy.priceRange)
            }
            console.log(decodedFilterBy);
        }
        console.log('dispatchin')
        dispatch(setFilterBy(decodedFilterBy))
    }, [dispatch])

    const memoizedLoadPlants = useCallback(() => {
        console.log('memoized')
        dispatch(loadPlants())
    }, [dispatch])

    // useEffect(() => {
    //     memoizedLoadPlants()
    // }, [memoizedLoadPlants])

    const onChangeFilter = (filterBy) => {
        const params = new URLSearchParams()
        console.log(params)
        console.log(filterBy)
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
        const queryStringParams = params.toString()
        navigate(`/shop?${queryStringParams}`)
        console.log('onChangeFilter changing filter', filterBy)
        dispatch(setFilterBy(filterBy))
        memoizedLoadPlants()
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
                <SearchFilter initialFilter={filter} onChangeFilter={onChangeFilter} />
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

