import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { loadPlants, setFilterBy } from '../store/actions/plant.actions.js'

import { PlantList } from '../cmps/plants-list'
import { SearchFilter } from '../cmps/search-filter'
import LoadingScreen from "react-loading-screen"

export function Shop() {

    const { plants, isLoading } = useSelector(state => state.plantModule)
    const [currentPage, setCurrentPage] = useState(1)
    const [plantsPerPage, setPlantsPerPage] = useState(9)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [isFiltersOpen, setIsFiltersOpen] = useState(true)
    // const filtersRef = useRef(null)
    const barRef = useRef(null)
    const [isFirstLoad, setIsFirstLoad] = useState(true)
    const [filters, setFilters] = useState({
        Home: false,
        Office: false,
        Balcony: false,
        Yard: false,
        difficulty: false,
        lightning: false,
        watering: false,
        priceRange: {
            min: 0,
            max: 1000,
        },
    })

    const onChangeFilter = (newFilters) => {
        setFilters(newFilters)
    }

    useEffect(() => {
        dispatch(setFilterBy(filters))
        const queryParams = generateFilterQuery(filters);
        const queryString = new URLSearchParams(queryParams).toString();
        navigate(`/shop${queryString ? '?' + queryString : ''}`);
    }, [filters])

    useEffect(() => {
        console.log('shop useEffect')
        if (isFirstLoad) {
            console.log('shop useEffect - first load')
            setIsFirstLoad(false)
            return
        }
        console.log('shop useEffect - not first load')
    }, [filters])

    useEffect(() => {
        console.log('plants useEffect')
        if (!plants || !plants.length) dispatch(loadPlants())
    }, [plants]);

    function generateFilterQuery(filters) {
        const queryParams = {};
        for (const key in filters) {
            if (key === 'priceRange') {
                if (
                    filters.priceRange.min !== 0 ||
                    filters.priceRange.max !== 1000
                ) {
                    queryParams['priceRange.min'] = filters.priceRange.min;
                    queryParams['priceRange.max'] = filters.priceRange.max;
                }
            } else if (
                filters[key] !== null &&
                filters[key] !== false &&
                filters[key] !== "false"
            ) {
                queryParams[key] = filters[key];
            }
        }
        return queryParams;
    }

    const idxLastPlant = currentPage * plantsPerPage
    const idxFirstPlant = idxLastPlant - plantsPerPage
    const currentPlants = plants ? plants.slice(idxFirstPlant, idxLastPlant) : []

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

    const handlePageChange = (event) => {
        if (event.target.value === 'next' && currentPage < Math.ceil(plants.length / plantsPerPage)) {
            setCurrentPage(currentPage + 1)
        } else if (event.target.value === 'prev' && currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleDropdown = (event) => {
        setPlantsPerPage(event.target.value)
        setCurrentPage(1)
    }
    const openFilters = () => {
        setIsFiltersOpen(true)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (barRef.current && !barRef.current.contains(event.target)
                && window.innerWidth <= 750 //
                && !event.target.classList.contains('sidenav-openbtn')) {
                setIsFiltersOpen(false);
            }
        }

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, [])

    const handleResize = () => {
        if (window.innerWidth > 750) {
            setIsFiltersOpen(true)
        } else {
            setIsFiltersOpen(false)
        }
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    })

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
        <section className='main-shop-layout'>
            <div>
                <h2>shop</h2>
            </div>
            <div className='buttons-wraper'>
                <button className="sidenav-openbtn" onClick={() => openFilters()}>Filters</button>
                <Link to='/shop/edit/'>
                    <button>Add Plant</button>
                </Link>
            </div>
            <div className='shop-container'>
                <div className='filter-display' style={{ display: isFiltersOpen ? 'block' : 'none' }} ref={barRef}>
                    <SearchFilter onChangeFilter={onChangeFilter} />
                </div>
                <PlantList plants={currentPlants} />
            </div>
            <div className='page-controls'>
                <ul id="page-numbers" className='pagination'>
                    <button value="prev" onClick={(ev) => handlePageChange(ev)}>⬅️ prev </button>
                    <span className='page-nums'> Page: {renderPageNums} </span>
                    <button value="next" onClick={(ev) => handlePageChange(ev)}> next ➡️ </button>
                </ul>
                <label htmlFor="ipp">Item per page:
                    <select onChange={handleDropdown}>
                        <option value="9">9</option>
                        <option value="30">30</option>
                        <option value="50">50</option>
                    </select>
                </label>
            </div>
        </section>
    )
}

