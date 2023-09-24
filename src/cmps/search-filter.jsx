import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

export function SearchFilter({ onChangeFilter }) {
    const navigate = useNavigate();

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
    });

    useEffect(() => {
        onChangeFilter(filters);
    }, [filters, onChangeFilter]);

    function handleInputChange(event) {
        const { name, value, type, checked } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: type === 'checkbox' ? checked : value,
        }));
    }

    function handleRangeChange(event, rangeType) {
        const { value } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            priceRange: {
                ...prevFilters.priceRange,
                [rangeType]: parseInt(value, 10),
            },
        }));
    }

    function handleResetFilters() {
        setFilters({
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
        });
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
                    name="Yard"
                    checked={filters.Yard}
                    onChange={handleInputChange}
                />
                Yard
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
        </section>
    );
}
