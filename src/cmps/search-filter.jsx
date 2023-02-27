import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
// import { useFormRegister } from '../hooks/useFormRegister'
import debounce from 'lodash/debounce'
import ReactSlider from 'react-slider'

export function SearchFilter(props) {
    const [locationFilters, setLocationFilters] = useState({
        Home: false,
        Office: false,
        Balcony: false,
        Yard: false,
    })
    const [difficultyFilter, setDifficultyFilter] = useState(null)
    const [lightningFilter, setLightningFilter] = useState(null)
    const [wateringFilter, setWateringFilter] = useState(null)
    const [priceRangeFilter, setPriceRangeFilter] = useState({
        min: 0,
        max: 1000,
    })

    const navigate = useNavigate();

    function handleSearch(filters) {
      navigate(`/search?q=${filters.term}&category=${filters.category}&sort=${filters.sort}`);
    }


    const filterDelay = 2500
    const filterData = debounce(() => {
        props.onChangeFilter({
            locations: locationFilters,
            difficulty: difficultyFilter,
            lightning: lightningFilter,
            watering: wateringFilter,
            priceRange: priceRangeFilter,
        })
    }, filterDelay)

    useEffect(() => {
        filterData()
    }, [locationFilters, difficultyFilter, lightningFilter, wateringFilter, priceRangeFilter])

    function handleLocationFilterChange(event) {
        const { name, checked } = event.target
        setLocationFilters({ ...locationFilters, [name]: checked })
    }

    function handleDifficultyFilterChange(event) {
        setDifficultyFilter(event.target.value)
    }

    function handleLightningFilterChange(event) {
        setLightningFilter(event.target.value)
    }

    function handleWateringFilterChange(event) {
        setWateringFilter(event.target.value)
    }

    const handleRangeChange = (values) => {
        setPriceRangeFilter({
            min: values[0],
            max: values[1]
        })
    }

    const handleMinPriceChange = (e) => {
        const newMinPrice = parseInt(e.target.value)
        setPriceRangeFilter(prevState => {
            const max = Math.max(newMinPrice, prevState.max)
            return {
                ...prevState,
                min: newMinPrice,
            }
        })
    }

    const handleMaxPriceChange = (e) => {
        const newMaxPrice = parseInt(e.target.value)
        setPriceRangeFilter(prevState => {
            return {
                ...prevState,
                max: newMaxPrice,
            }
        })
    }

    function handleResetFilters() {
        setLocationFilters({
            Home: false,
            Office: false,
            Balcony: false,
            Yard: false,
        })
        setDifficultyFilter(null)
        setLightningFilter(null)
        setWateringFilter(null)
        setPriceRangeFilter({ min: 0, max: 1000 })
    }


    return (
        <section className='filter-container'>
            <h2>Location</h2>
            <label>
                <input
                    type='checkbox'
                    name='Home'
                    checked={locationFilters.Home}
                    onChange={handleLocationFilterChange}
                />
                Home
            </label>
            <label>
                <input
                    type='checkbox'
                    name='Office'
                    checked={locationFilters.Office}
                    onChange={handleLocationFilterChange}
                />
                Office
            </label>
            <label>
                <input type="checkbox"
                    name="Balcony"
                    checked={locationFilters.Balcony}
                    onChange={handleLocationFilterChange}
                />
                Balcony
            </label>
            <label>
                <input type="checkbox"
                    name="Yard"
                    checked={locationFilters.Yard}
                    onChange={handleLocationFilterChange}
                />
                Yard
            </label>

            <h2>Difficulty</h2>
            <label>
                <input
                    type="radio"
                    name="difficulty"
                    value="Survivor"
                    checked={difficultyFilter === "Survivor"}
                    onChange={handleDifficultyFilterChange}
                />
                Survivor
            </label>
            <label>
                <input
                    type="radio"
                    name="difficulty"
                    value="Amateur"
                    checked={difficultyFilter === "Amateur"}
                    onChange={handleDifficultyFilterChange}
                />
                Amateur
            </label>
            <label>
                <input
                    type="radio"
                    name="difficulty"
                    value="Pro"
                    checked={difficultyFilter === "Pro"}
                    onChange={handleDifficultyFilterChange}
                />
                Pro
            </label>

            <h2>Lightning</h2>
            <label>
                <input
                    type="radio"
                    name="lightning"
                    value="Low"
                    checked={lightningFilter === "Low"}
                    onChange={handleLightningFilterChange}
                />
                Low
            </label>
            <label>
                <input
                    type="radio"
                    name="lightning"
                    value="Medium"
                    checked={lightningFilter === "Medium"}
                    onChange={handleLightningFilterChange}
                />
                Medium
            </label>
            <label>
                <input
                    type="radio"
                    name="lightning"
                    value="High"
                    checked={lightningFilter === "High"}
                    onChange={handleLightningFilterChange}
                />
                High
            </label>

            <h2>Watering</h2>
            <label>
                <input
                    type="radio"
                    name="watering"
                    value="Low"
                    checked={wateringFilter === "Low"}
                    onChange={handleWateringFilterChange} />
                Low
            </label>
            <label>
                <input type="radio"
                    name="watering"
                    value="Medium"
                    checked={wateringFilter === "Medium"}
                    onChange={handleWateringFilterChange} />
                Medium
            </label>
            <label>
                <input type="radio"
                    name="watering"
                    value="High"
                    checked={wateringFilter === "High"}
                    onChange={handleWateringFilterChange} />
                High
            </label>

            <h2>Price Range</h2>
            <div className="price-container">
                <div className="price-input">
                    <input
                        type="number"
                        min="0"
                        max="1000"
                        value={priceRangeFilter.min}
                        onChange={handleMinPriceChange}
                    />
                    <div className='separator'>-</div>
                    <input
                        type="number"
                        min="0"
                        max="1000"
                        value={priceRangeFilter.max}
                        onChange={handleMaxPriceChange}
                    />
                </div>
                <div className='slider-container'>
                    <ReactSlider
                        className="horizontal-slider"
                        thumbClassName="slider-thumb"
                        trackClassName="slider-track"
                        value={[priceRangeFilter.min, priceRangeFilter.max]}
                        ariaLabelledby={['first-slider-label', 'second-slider-label']}
                        renderTrack={(props, state) => (
                            <div
                                {...props}
                                className={`slider-track ${state.index === 1 ? "track-before" : "track-after"}`}
                            />
                        )}
                        onChange={handleRangeChange}
                        minDistance={50}
                        min={0}
                        max={1000}
                        pearling={true}
                    />
                </div>
            </div>
            <button type="reset" onClick={handleResetFilters}>Reset</button>
        </section>
    )
}
