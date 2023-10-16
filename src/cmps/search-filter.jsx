import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { setFilterBy, resetFilters } from '../store/actions/plant.actions';
import { useDispatch } from 'react-redux';

export function SearchFilter() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const [filters, setFilters] = useState({
        Home: false,
        Office: false,
        Balcony: false,
        Garden: false,
        difficulty: false,
        lightning: false,
        watering: false,
        name: false,
        priceRange: {
            min: 0,
            max: 1000,
        },
    })

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        const parsedFilters = {}
        const filterNames = [
            'name',
            'Home',
            'Office',
            'Balcony',
            'Garden',
            'difficulty',
            'lightning',
            'watering',
            'priceRange'
        ]
    
        filterNames.forEach(filterName => {
            const value = queryParams.get(filterName)
            if (filterName === 'priceRange') {
                const min = parseInt(queryParams.get('priceRange.min'), 10)
                const max = parseInt(queryParams.get('priceRange.max'), 10)
                if (!isNaN(min) || !isNaN(max)) {
                    parsedFilters[filterName] = {
                        min: isNaN(min) ? 0 : min,
                        max: isNaN(max) ? 1000 : max,
                    }
                } else {
                    parsedFilters[filterName] = {
                        min: 0,
                        max: 1000,
                    }
                }
            } else if (value !== null) {
                parsedFilters[filterName] = value === 'true' || value === 'false' ? value === 'true' : value
            } else {
                parsedFilters[filterName] = false;
            }
        })

        setFilters(parsedFilters)
    }, [location.search, dispatch])


    function onSubmitFilters() {
        dispatch(setFilterBy(filters))
    }

    function handleInputChange(event) {
        const { name, value, type, checked } = event.target
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    function handleRangeChange(event, rangeType) {
        const { value } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            priceRange: {
                ...prevFilters.priceRange,
                [rangeType]: parseInt(value, 10),
            },
        }))
    }

    function handleResetFilters() {
        setFilters({
            Home: false,
            Office: false,
            Balcony: false,
            Garden: false,
            difficulty: false,
            lightning: false,
            watering: false,
            name: false,
            priceRange: {
                min: 0,
                max: 1000,
            }
        })
        dispatch(resetFilters())
        navigate('/shop')
    }

    return (
        <section className='filter-container'>
            <h2>Location</h2>
            <label>
                <input
                    type='checkbox'
                    name='Home'
                    checked={filters.Home}
                    onChange={handleInputChange}
                />
                Home
            </label>
            <label>
                <input
                    type='checkbox'
                    name='Office'
                    checked={filters.Office}
                    onChange={handleInputChange}
                />
                Office
            </label>
            <label>
                <input
                    type="checkbox"
                    name="Balcony"
                    checked={filters.Balcony}
                    onChange={handleInputChange}
                />
                Balcony
            </label>
            <label>
                <input
                    type="checkbox"
                    name="Garden"
                    checked={filters.Garden}
                    onChange={handleInputChange}
                />
                Garden
            </label>

            <h2>Difficulty</h2>
            <select
                name="difficulty"
                value={filters.difficulty}
                onChange={handleInputChange}
            >
                <option value={false}>Select Difficulty</option>
                <option value="Survivor">Survivor</option>
                <option value="Amateur">Amateur</option>
                <option value="Pro">Pro</option>
            </select>

            <h2>Lightning</h2>
            <select
                name="lightning"
                value={filters.lightning}
                onChange={handleInputChange}
            >
                <option value={false}>Select Lightning</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>

            <h2>Watering</h2>
            <select
                name="watering"
                value={filters.watering}
                onChange={handleInputChange}
            >
                <option value={false}>Select Watering</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>

            <h2>Price Range</h2>
            <div className="price-container">
                <div className="price-input">
                    <input
                        type="number"
                        min="0"
                        max="1000"
                        value={filters.priceRange.min}
                        onChange={(e) => handleRangeChange(e, 'min')}
                    />
                    <div className='separator'>-</div>
                    <input
                        type="number"
                        min="0"
                        max="1000"
                        value={filters.priceRange.max}
                        onChange={(e) => handleRangeChange(e, 'max')}
                    />
                </div>
            </div>
            <button type="reset" onClick={handleResetFilters}>Reset</button>
            <button type="search" onClick={onSubmitFilters}>Search</button>
        </section>
    );
}
