import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import debounce from 'lodash/debounce'
import { useDispatch } from 'react-redux';
import ReactSlider from 'react-slider'
import { eventBusService } from '../services/event-bus.service'
import queryString from 'query-string'
import { set } from 'lodash';


export function SearchFilter() {

    const navigate = useNavigate()

    const [filters, setFilters] = useState({
        name: null,
        location: {
            Home: false,
            Office: false,
            Balcony: false,
            Yard: false,
        },
        difficulty: null,
        lightning: null,
        watering: null,
        priceRange: {
            min: 0,
            max: 1000,
        },
    })

    // create useEffect that will run on every change of the filters state
    // it will check if the filters have changed and if so, it will set the url query params with the new filters
    useEffect(() => {
        console.log('filters changed', filters)
        const queryParams = new URLSearchParams()
        for (const key in filters) {
            console.log('key', key)
            if (key === 'location') {
                for (const locationKey in filters.location) {
                    if (filters.location[locationKey]) {
                        queryParams.set(`location.${locationKey}`, filters.location[locationKey])
                    }
                }
            } else if (key === 'priceRange') {
                console.log('priceRange', filters.priceRange)
                queryParams.set(`priceRange.min`, filters.priceRange.min)
                queryParams.set(`priceRange.max`, filters.priceRange.max)
            } else {
                if (filters[key]) {
                    console.log('key2', key)
                    queryParams.set(key, filters[key])
                }
            }
        }
        const searchParams = queryParams.toString()
        const url = searchParams ? `/shop?${searchParams}` : '/shop'
        console.log('url', url)
        console.log('searchParams', searchParams)
        console.log(searchParams ? `/shop?${searchParams}` : '/shop')
        navigate(`/shop?${searchParams}`);
    }, [filters])

    function handleFilterChange(event, rangeType) {
        const { name, type, value, checked } = event.target;
        if (type === 'checkbox') {
            setFilters((prevFilters) => ({
                ...prevFilters,
                location: {
                    ...prevFilters.location,
                    [name]: checked,
                },
            }))
        } else if (type === 'radio') {
            setFilters((prevFilters) => ({
                ...prevFilters,
                [name]: value,
            }))
        } else if (type === 'number') {
            const { value } = event.target;
            if (rangeType === 'priceRange.min') {
                setFilters((prevFilters) => ({
                    ...prevFilters,
                    priceRange: {
                        ...prevFilters.priceRange,
                        min: Math.min(value, prevFilters.priceRange.max),
                    },
                }));
            } else if (rangeType === 'priceRange.max') {
                setFilters((prevFilters) => ({
                    ...prevFilters,
                    priceRange: {
                        ...prevFilters.priceRange,
                        max: Math.max(value, prevFilters.priceRange.min),
                    },
                }));
            }
        }
    }

    function handleResetFilters() {
        setFilters({
            name: null,
            location: {
                Home: false,
                Office: false,
                Balcony: false,
                Yard: false,
            },
            difficulty: null,
            lightning: null,
            watering: null,
            priceRange: {
                min: 0,
                max: 1000,
            },
        })
    }

    return (
        <section className='filter-container'>
            <h2>Location</h2>
            <label>
                <input
                    type='checkbox'
                    name='Home'
                    checked={filters.location.Home}
                    onChange={handleFilterChange}
                />
                Home
            </label>
            <label>
                <input
                    type='checkbox'
                    name='Office'
                    checked={filters.location.Office}
                    onChange={handleFilterChange}
                />
                Office
            </label>
            <label>
                <input type="checkbox"
                    name="Balcony"
                    checked={filters.location.Balcony}
                    onChange={handleFilterChange}
                />
                Balcony
            </label>
            <label>
                <input type="checkbox"
                    name="Yard"
                    checked={filters.location.Yard}
                    onChange={handleFilterChange}
                />
                Yard
            </label>

            <h2>Difficulty</h2>
            <label>
                <input
                    type="radio"
                    name="difficulty"
                    value="Survivor"
                    checked={filters.difficulty === "Survivor"}
                    onChange={handleFilterChange}
                />
                Survivor
            </label>
            <label>
                <input
                    type="radio"
                    name="difficulty"
                    value="Amateur"
                    checked={filters.difficulty === "Amateur"}
                    onChange={handleFilterChange}
                />
                Amateur
            </label>
            <label>
                <input
                    type="radio"
                    name="difficulty"
                    value="Pro"
                    checked={filters.difficulty === "Pro"}
                    onChange={handleFilterChange}
                />
                Pro
            </label>

            <h2>Lightning</h2>
            <label>
                <input
                    type="radio"
                    name="lightning"
                    value="Low"
                    checked={filters.lightning === "Low"}
                    onChange={handleFilterChange}
                />
                Low
            </label>
            <label>
                <input
                    type="radio"
                    name="lightning"
                    value="Medium"
                    checked={filters.lightning === "Medium"}
                    onChange={handleFilterChange}
                />
                Medium
            </label>
            <label>
                <input
                    type="radio"
                    name="lightning"
                    value="High"
                    checked={filters.lightning === "High"}
                    onChange={handleFilterChange}
                />
                High
            </label>

            <h2>Watering</h2>
            <label>
                <input
                    type="radio"
                    name="watering"
                    value="Low"
                    checked={filters.watering === "Low"}
                    onChange={handleFilterChange} />
                Low
            </label>
            <label>
                <input type="radio"
                    name="watering"
                    value="Medium"
                    checked={filters.watering === "Medium"}
                    onChange={handleFilterChange} />
                Medium
            </label>
            <label>
                <input type="radio"
                    name="watering"
                    value="High"
                    checked={filters.watering === "High"}
                    onChange={handleFilterChange} />
                High
            </label>

            <h2>Price Range</h2>
            <div className="price-container">
                <div className="price-input">
                    <input
                        type="number"
                        min="0"
                        max="1000"
                        value={filters.priceRange.min}
                        onChange={(e) => handleFilterChange(e, 'priceRange.min')} // Pass the field name
                    />
                    <div className='separator'>-</div>
                    <input
                        type="number"
                        min="0"
                        max="1000"
                        value={filters.priceRange.max}
                        onChange={(e) => handleFilterChange(e, 'priceRange.max')} // Pass the field name
                    />
                </div>
                {/* <div className='slider-container'>
                    <ReactSlider
                        className="horizontal-slider"
                        thumbClassName="slider-thumb"
                        trackClassName="slider-track"
                        value={[filters.priceRange.min, filters.priceRange.max]}
                        ariaLabelledby={['first-slider-label', 'second-slider-label']}
                        renderTrack={(props, state) => (
                            <div
                                {...props}
                                className={`slider-track ${state.index === 1 ? "track-before" : "track-after"}`}
                            />
                        )}
                        onChange={handleFilterChange}
                        minDistance={50}
                        min={0}
                        max={1000}
                        pearling={true}
                    />
                </div> */}
            </div>
            <button type="reset" onClick={handleResetFilters}>Reset</button>
        </section>
    )
}
